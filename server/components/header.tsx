import React from "react";

let libraries: string[];

if (process.env.NODE_ENV === "development") {
    libraries = [
        "https://unpkg.com/react@16/umd/react.development.js",
        "https://unpkg.com/react-dom@16/umd/react-dom.development.js",
        "https://unpkg.com/react-router-dom/umd/react-router-dom.min.js",
        "https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js"
    ];
} else {
    libraries = [
        "https://unpkg.com/react@16/umd/react.production.min.js",
        "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
        "https://unpkg.com/react-router-dom/umd/react-router-dom.min.js",
        "https://ajax.googleapis.com/ajax/libs/threejs/r84/three.min.js"
    ];
}

const scripts = libraries.map((src, i) => <script defer key={i} crossOrigin="true" src={src}></script>);
export function Header(props: { title?: string } = {}): JSX.Element {
    return (
        <React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            {props.title && <title>{props.title}</title>}
            <link rel="stylesheet" href="/styles/main.css" />
            {scripts}
            <script defer src="/scripts/main.js"></script>
        </React.Fragment>
    );
}