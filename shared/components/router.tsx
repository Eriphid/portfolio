import React from "react";
import { ROUTER_TYPE } from "@constants";
import * as ReactRouterDOM from "react-router-dom";
import { Routes } from "@shared/routes";

const routes = Routes.map(route => (
    React.createElement(
        ReactRouterDOM.Route,
        {
            path: route.path,
            exact: route.exact,
            component: route.component,
            key: route.path
        }
    )
));

type ReactRouterDOM = typeof ReactRouterDOM;
type ReactRouter = typeof ReactRouterDOM.BrowserRouter & typeof ReactRouterDOM.StaticRouter;

const ReactRouter: ReactRouter = ReactRouterDOM[ROUTER_TYPE];

export function Router(props: { location?: string } = {}): React.ComponentElement<{}, ReactRouter["prototype"]> {
    return (
        <ReactRouter location={props.location}>
            {routes}
        </ReactRouter>
    );
}