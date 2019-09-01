import Express from "express";
// import Scripts from "./scripts";
import Path from "path";
import Styles from "./styles";
import { CLIENT } from "@server/constants";
import { renderToStaticNodeStream } from "react-dom/server";
import { HTMLPage } from "@server/components/htmlpage";
import { Routes } from "@shared/routes";
import Projects from "./projects";

const router = Express.Router();

router.use(Express.static(Path.join(CLIENT, "assets")));
router.get("/favicon.ico", (req, res, _next) => res.sendFile(Path.join(CLIENT, "favicon.ico")));
router.use("/scripts", Express.static(Path.join(CLIENT, "dist")));
// router.use(Scripts);
router.use("/styles", Styles);
router.use("/projects", Projects);

router.use((req, res, next) => {
    const route = Routes.find((route) => {
        const normalizedRoute = Path.normalize(route.path);
        const normalizedURL = Path.normalize(req.originalUrl);
        if (route.exact)
            return normalizedRoute === normalizedURL;
        else
            return normalizedURL.startsWith(normalizedRoute);
    });
    if (route) {
        res.write("<!DOCTYPE html>");
        renderToStaticNodeStream(HTMLPage({ title: route.title })).pipe(res);
    } else
        next();
});

export default router;