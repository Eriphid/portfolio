import { Clone, Repository, Reset } from "nodegit";
// import Projects from "@projects/projects.json";
import { readFileSync, writeFileSync, existsSync, unlinkSync } from "fs";
import Path from "path";
import Express from "express";
import { ROOT } from "@server/constants";
import { applyPatches } from "diff";

type ProjectsJSON = typeof import("@projects/projects.json");
type Project = ProjectsJSON["list"][0];
const JSONPath = require.resolve("@projects/projects.json");

interface Projects extends ProjectsJSON {
    list: (Project & {
        repo?: string;
        patches?: string[];
    })[];
}

const Projects: Projects = JSON.parse(readFileSync(JSONPath, "utf-8"));
const router = Express.Router();

const promises = Projects.list.map(async (project) => {
    let repo: Repository;
    if (!project.repo || !existsSync(project.repo)) {
        const repoPath = Path.join(ROOT, "projects", project.name.toLowerCase());
        repo = await Clone.clone(project.git, repoPath);
        project.repo = Path.relative(ROOT, repo.path());
    } else {
        repo = await Repository.open(project.repo);
    }
    const root = Path.dirname(repo.path());
    await repo.fetchAll();
    const master = await repo.getBranchCommit("origin/master");
    await Reset.reset(repo, master, Reset.TYPE.HARD, {});
    await repo.mergeBranches("master", "origin/master");
    if (project.patches) {
        function readRepositoryFile(path: string): string {
            const data = readFileSync(Path.join(root, path), "utf8");
            return data;
        }
        function writeRepositoryFile(path: string, content): void {
            writeFileSync(Path.join(root, path), content);
        }

        if ("length" in project.patches) {
            (Array.prototype as Array<string>).forEach.call(project.patches, async (patch) => {
                return new Promise(async (resolve, reject): Promise<void> => {
                    applyPatches(readFileSync(patch, "utf8"), {
                        loadFile: (index, callback) => {
                            if (index.oldFileName) {
                                const data = readRepositoryFile(index.oldFileName);
                                callback(null, data);
                            }
                            else {
                                callback(null, "");
                            }
                        },
                        patched: (index, content, callback) => {
                            if (index.oldFileName && index.oldFileName !== index.newFileName)
                                unlinkSync(index.oldFileName);
                            if (index.newFileName) {
                                writeRepositoryFile(index.newFileName, content);
                            }
                            callback(null);
                        },
                        complete: err => {
                            if (err)
                                reject(err);
                            else
                                resolve();
                        }
                    });
                });
            });
        }
    }

    const name = project.name.toLowerCase();

    const projectRouter = Express.Router();

    switch (project.start.type) {
        case "HTML":
            projectRouter.get("/", (res, req, _next) => req.sendFile(Path.join(root, project.start.filepath)));
            break;
    }

    if(project.routes) {
        for(const key in project.routes){
            const folder = Path.join(root, project.routes[key]);
            projectRouter.use(key, Express.static(folder));
        }
    }

    router.use("/" + name, projectRouter);
});

Promise.all(promises).then(() => writeFileSync(JSONPath, JSON.stringify(Projects, null, 4)));


// router.use((req, res, next) => {
//     next();
// });

export default router;