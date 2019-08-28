import React from "react";

export function Body(props: { children?: JSX.Element | string[] } = {}): JSX.Element {
    return(
        <React.Fragment>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    )
}