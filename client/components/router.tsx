import React, { Attributes } from "react";
import ReactRouterDOM from "react-router-dom";
import { Body } from "./body";
import { ROUTER_TYPE } from "@constants";

const Home = (): JSX.Element => (
    <Body>
        <div id="main-canvas"></div>
    </Body>
);

const Routes = (): JSX.Element => (
    <React.Fragment>
        <Route exact path="/" component={Home}></Route>
    </React.Fragment>
);

type ReactRouterDOM = typeof ReactRouterDOM;
type ReactRouter = ReactRouterDOM[typeof ROUTER_TYPE]["prototype"];

const ReactRouter = ReactRouterDOM[ROUTER_TYPE];
const Route = ReactRouterDOM.Route;

export function Router(props: { location?: string } = {}): React.ComponentElement<{}, ReactRouter> {
    return React.createElement(ReactRouter, props as Attributes, Routes());
}