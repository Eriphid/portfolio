import Express from "express";
// import Scripts from "./scripts";
import Path from "path";
import Styles from "./styles";
import { CLIENT } from "@server/constants";
import { renderToStaticNodeStream } from "react-dom/server";
import { HTMLPage } from "@server/components/htmlpage";

const router = Express.Router();

router.use(Express.static(Path.join(CLIENT, "assets")));
router.get("/favicon.ico", (req, res, _next) => res.sendFile(Path.join(CLIENT, "favicon.ico")));
router.get("/", (req, res, _next) => {
    res.write("<!DOCTYPE html>");
    renderToStaticNodeStream(HTMLPage()).pipe(res);
});
router.use("/scripts", Express.static(Path.join(CLIENT, "dist")));
// router.use(Scripts);
router.use("/styles", Styles);

export default router;