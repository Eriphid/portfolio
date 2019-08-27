import Express from "express";
import React from "react";
import { renderToStaticNodeStream } from "react-dom/server";
import Path from "path";
import { HTMLPage } from "@server/components/htmlpage";

function error(req: Express.Request): JSX.Element {
    return (
        <HTMLPage title="Error 404">
            Cannot {req.method} {req.protocol}://{Path.join(req.hostname, req.originalUrl).replace(/\\/g, "/")}
        </HTMLPage>
    );
}

export function Error404(req: Express.Request, res: Express.Response, _next: Express.NextFunction): void {
    res.status(404);
    res.write("<!DOCTYPE html>");
    renderToStaticNodeStream(error(req)).pipe(res);
}