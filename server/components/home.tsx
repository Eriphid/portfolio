import React from "react";
import { HTMLPage } from "./htmlpage";

export function Home(): JSX.Element{
    return (
        <HTMLPage title="Home">
            <div id="main-canvas"></div>
        </HTMLPage>
    );
}