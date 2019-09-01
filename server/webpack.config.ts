import "module-alias/register";
import Webpack from "webpack";
import { CLIENT, SHARED, ROOT, SERVER } from "@server/constants";
import Path from "path";
import WebpackNodeExternals from "webpack-node-externals";

const config: Webpack.Configuration = {
    entry: {
        server: Path.join(SERVER, "index.ts")
    },
    output: {
        path: Path.join(ROOT),
        chunkFilename: "[name].js"
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.client.json",
                    transpileOnly: true
                }
            }
        ]
    },
    externals: [
        WebpackNodeExternals(),
        function (context, request, callback) {
            if (request.startsWith("@client") || request.startsWith("@three")) {
                callback(null, "client");
            } else {
                callback(undefined, undefined);
            }
        }
    ],
    optimization: {
        splitChunks: false
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@components": Path.join(CLIENT, "components"),
            "@constants": Path.join(CLIENT, "constants"),
            "@client": CLIENT,
            "@server": SERVER,
            "@shared": SHARED,
            "@projects": Path.join(ROOT, "projects"),
            "@three": Path.join(ROOT, "node_modules/three/examples/jsm/")
        }
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