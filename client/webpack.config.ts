import "module-alias/register";
import Webpack from "webpack";
import { CLIENT, SHARED, ROOT } from "@server/constants";
import Path from "path";

const config: Webpack.Configuration = {
    entry: {
        main: Path.join(CLIENT, "src/main.ts")
    },
    output: {
        path: Path.join(CLIENT, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader"
            },
            {
                test: /three/,
                use: "imports-loader?THREE=three"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@components": Path.join(CLIENT, "components"),
            "@constants": Path.join(CLIENT, "constants"),
            "@client": CLIENT,
            "@shared": SHARED,
            "@three/shaders": Path.join(ROOT, "node_modules/three/examples/jsm/shaders/"),
            "@three/postprocessing": Path.join(ROOT, "node_modules/three/examples/jsm/postprocessing/")
        }
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router-dom": "ReactRouterDOM",
        // "three": "THREE"
    }
};

switch (process.env.NODE_ENV as typeof config["mode"]) {

    case "development":
    case "production":
    case "none":
        config.mode = process.env.NODE_ENV as typeof config["mode"];
        break;
    default:
        config.mode = "production";
        break;
}

export default config;