import React from "react";
import { Header } from "./header";
import { MainRouter } from "@shared/components/mainrouter";
import { renderToString } from "react-dom/server";

interface Props {
    title?: string;
    children?: React.ComponentElement<{}, React.Component> | string[];
    location?: string;
}

export function HTMLPage(props: Props = {}): React.ComponentElement<Props, React.Component> {
    return (
        <html lang="en">
            <head>
                <Header title={props.title}></Header>
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(<MainRouter location={props.location || "/"}></MainRouter>) }}></div>
            </body>
        </html>
    );
}