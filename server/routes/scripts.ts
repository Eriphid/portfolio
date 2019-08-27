import Express from "express";
import Path from "path";
import { CompilerOptions, transpile, ModuleKind, ScriptTarget, JsxEmit } from "typescript";
import FS from "fs";
import { Error404 } from "./404";

import { CLIENT, ROOT } from "@server/constants";

const tsconfig: {
    compilerOptions: CompilerOptions;
} = new Function("return " + FS.readFileSync(Path.join(ROOT, "tsconfig.client.json"), "utf8"))();
Object.assign(tsconfig.compilerOptions, {
    module: ModuleKind.ESNext,
    target: ScriptTarget.ESNext,
    jsx: JsxEmit.React
} as CompilerOptions);

const router = Express.Router();

// const cache = new Map<string, string>();

function getScriptPath(path: string): string | null {
    const ext = Path.extname(path);

    if (ext)
        path = Path.join(Path.dirname(path), Path.basename(path, ext));

    function checkExt(ext: string): string | null {
        const tmp: string = path + ext;
        if (FS.existsSync(tmp))
            return tmp;
        return null;
    }

    return checkExt(".ts") || checkExt(".js") || checkExt(".tsx") || checkExt(".jsx") || null;
}

function getScript(req: Express.Request, path: string): string | undefined | null {
    const isSourceTypescript = /\.tsx?$/.test(path);
    const isRequestTypescript = /\.tsx?$/.test(req.path);
    if (!isRequestTypescript && isSourceTypescript) {
        // if (cache.has(path))
        //     return cache.get(path);
        const data = FS.readFileSync(path, "utf8");
        const js = transpile(data, tsconfig.compilerOptions);
        // cache.set(path, js);
        return js;
    } else {
        return FS.readFileSync(path, "utf8");
    }
}

router.use(["/scripts", "/components"], (req, res, next) => {
    const path = getScriptPath(Path.join(CLIENT, req.originalUrl));
    if (path) {
        if (FS.statSync(path).isFile()) {
            const script = getScript(req, path);
            if (script) {
                res.contentType("text/javascript");
                res.end(script);
            }
        } else {
            res.status(403);
            res.end("Forbidden");
        }
    } else {
        Error404(req, res, next);
    }
});

export default router;