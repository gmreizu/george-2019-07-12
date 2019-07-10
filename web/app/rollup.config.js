import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/main.tsx",
    output: [
        {
            file: "public/index.js",
            format: "umd",
            sourcemap: "inline",
        },
    ],
    plugins: [
        // progress(),
        nodeResolve({
            browser: true,
        }),
        // json(),
        commonjs({
            include: [
                "node_modules/**",
            ],
            exclude: [
                "node_modules/process-es6/**",
            ],
            namedExports: {
                "node_modules/react/index.js": ["Children", "Component", "PropTypes", "createElement"],
                "node_modules/react-dom/index.js": ["render"],
            },
        }),
        babel({
            babelrc: false,
            presets: [["es2015", { modules: false }], "stage-1", "react"],
            plugins: ["external-helpers"],
        }),
        // visualizer(),
        // filesize(),
        // replace({
        //     "process.env.NODE_ENV": JSON.stringify("production"),
        // }),
        typescript({
            typescript: require("typescript"),
        }),
    ],
};
