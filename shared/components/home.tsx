import React from "react";
import { Body } from "./body";

export class Home extends React.Component {
    ref = React.createRef<HTMLElement>();

    componentDidMount(): void {
        import("@client/src/canvas").then(module => {
            module.initialize(this.ref.current || undefined);
        });
    }

    render(): JSX.Element {
        return (
            <Body>
                <div id="main-canvas"></div>
            </Body>
        );
    }
}