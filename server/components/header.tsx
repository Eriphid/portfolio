import React from "react";

interface Properties{
    title?: string
}

export function Header(props: Properties = {}): React.ComponentElement<Properties, React.Component> {
    return (
        <React.Fragment>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            {props.title && <title>{props.title}</title>}
            <link rel="stylesheet" href="/styles/main.css" />
            <script defer src="/scripts/vendors.js"></script>
            <script defer src="/scripts/main.js"></script>
        </React.Fragment>
    );
}