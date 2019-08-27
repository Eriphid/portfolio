import React from "react";
import { Header } from "./header";
import { Router } from "@client/components/router";
import { renderToString } from "react-dom/server";

interface Props {
    title?: string;
    children?: JSX.Element | string[];
    location?: string;
}

export function HTMLPage(props: Props = {}): JSX.Element {
    return (
        <html lang="en">
            <head>
                <Header title={props.title}></Header>
            </head>
            <body dangerouslySetInnerHTML={{ __html: renderToString(<Router location={props.location || "/"}></Router>) }}>

            </body>
        </html>
    );
}