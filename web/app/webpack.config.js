const path = require("path")

module.exports = {
    entry: path.resolve("src/main.tsx"),
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve("public"),
        port: 8090,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve("node_modules")],
                        },
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve("public")
    }
}
