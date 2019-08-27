import Webpack from "webpack";
import { CLIENT } from "./server/constants";
import Path from "path";

const config: Webpack.Configuration = {
    entry: {
        main: Path.join(CLIENT, "scripts/main.ts")
    },
    output: {
        path: Path.join(CLIENT, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@components": Path.join(CLIENT, "components"),
            "@constants": Path.join(CLIENT, "constants")
        }
    }
};

switch (process.env.NODE_ENV as typeof config["mode"]) {
    case "development":
    case "production":
    case "none":
        config.mode = process.env.NODE_ENV as typeof config["mode"];
    default:
        config.mode = "production";
}
export default config;