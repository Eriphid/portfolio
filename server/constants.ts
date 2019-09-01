import Path from "path";

export const ROUTER_TYPE: "StaticRouter" = "StaticRouter";
export const ROOT = Path.resolve(".");
export const SHARED = Path.join(ROOT, "shared");
export const CLIENT = Path.join(ROOT, "client");
export const SERVER = Path.join(ROOT, "server");