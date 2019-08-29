import React from "react";
import { Body } from "./body";

export class Home extends React.Component {
    canvas?: HTMLCanvasElement;

    componentDidMount(): void {
        import("@client/src/canvas").then(module => {
            module.initialize(this.canvas);
        });
    }

    render(): JSX.Element {
        const setCanvasRef = (value: HTMLCanvasElement | null): void => {
            if (value)
                this.canvas = value;
        };
        return (
            <Body>
                <div className="canvas-wrapper">
                    <canvas ref={setCanvasRef}></canvas>
                </div>
            </Body>
        );
    }
}