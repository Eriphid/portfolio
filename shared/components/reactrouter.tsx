import { ROUTER_TYPE } from "@constants";
import * as ReactRouterDOM from "react-router-dom";

type ReactRouterDOM = typeof ReactRouterDOM;
// type ReactRouter = typeof ReactRouterDOM.BrowserRouter & typeof ReactRouterDOM.StaticRouter;

type ReactRouter = ReactRouterDOM[typeof ROUTER_TYPE]["prototype"];
const ReactRouter = ReactRouterDOM[ROUTER_TYPE];
export { ReactRouter };