import { Home } from "@shared/components/home";

type Component = React.FunctionComponent | React.ComponentClass;

interface Route {
    title: string;
    path: string;
    exact?: boolean;
    component: Component;
}

export const Routes: Route[] = [
    {
        title: "Home",
        path: "/",
        component: Home
    }
]