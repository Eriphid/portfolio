import "module-alias/register";
import Webpack from "webpack";
import { CLIENT, SHARED, ROOT } from "@server/constants";
import Path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: Webpack.Configuration = {
    entry: {
        main: Path.join(CLIENT, "src/main.ts")
    },
    output: {
        publicPath: "/scripts/",
        path: Path.join(CLIENT, "dist"),
        chunkFilename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.client.json",
                    transpileOnly: true
                }
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
            "@three": Path.join(ROOT, "node_modules/three/examples/jsm/")
        }
    },
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
        // "react-router-dom": "ReactRouterDOM",
        // "three": "THREE"
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                three: {
                    reuseExistingChunk: true,
                    chunks: "async",
                    name: "three",
                    test: /three/,
                    priority: 10
                },
                vendors: {
                    reuseExistingChunk: true,
                    chunks: "initial",
                    name: "vendors",
                    test: /node_modules/,
                    priority: 0
                }
            },
            name: true
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