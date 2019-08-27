import React from "react";

export function Header(props: { title?: string } = {}): JSX.Element {
    return (
        <React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            {props.title && <title>{props.title}</title>}
            <link rel="stylesheet" href="/styles/main.css" />
            <script defer crossOrigin="true" src="https://unpkg.com/react@16/umd/react.development.js"></script>
            <script defer crossOrigin="true" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
            <script defer src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
            <script defer src="/scripts/main.js"></script>
            <script defer src="https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js"></script>
            <script defer src="/scripts/canvas/index.js" type="module"></script>
        </React.Fragment>
    );
}