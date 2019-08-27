import Express from "express";
import Path from "path";
import { CLIENT } from "@server/constants";

const router = Express.Router();

const root = Path.join(CLIENT, "styles");
router.use(Express.static(root));
router.use((req, res, next) => {
   next(); 
});

export default router;