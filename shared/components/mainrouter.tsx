import React from "react";
import * as ReactRouterDOM from "react-router-dom";
import { Routes } from "@shared/routes";
import { ReactRouter } from "./reactrouter";

class Route extends ReactRouterDOM.Route<ReactRouterDOM.RouteProps & { title?: string }>{
    componentDidMount(): void {
        const parent = ReactRouterDOM.Route.prototype.componentDidMount;
        parent && parent.call(this);
        if ("title" in this.props)
            document.title = this.props.title as string;
        else
            document.title = window.location.href;
    }
}

const routes = Routes.map(route => (
    <Route title={route.title} path={route.path} exact={route.exact} key={route.path} component={route.component}></Route>
));

type Properties = ReactRouter["props"];
export function MainRouter(props: Properties = {}): JSX.Element {
    return (
        <ReactRouter location={props.location}>
            {routes}
        </ReactRouter>
    );
}