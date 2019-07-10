import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
    input: "src/main.tsx",
    output: {
        file: pkg.main,
        format: "iife",
        name: "hometask",
        interop: false,
        preferConst: true,
    },
    // output: [
    //     {
    //         file: pkg.main,
    //         format: "es",
    //     },
    // ],
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        nodeResolve({
            mainFields: ["module", "main", "jsnext:main"],
            browser: true,
            dedupe: ["react", "react-dom"],
        }),
        commonjs({
            include: "node_modules/**",
            // explicitly specify unresolvable named exports
            namedExports: {
                react: [
                    "Children",
                    "cloneElement",
                    "Component",
                    "createContext",
                    "createElement",
                    "forwardRef",
                    "Fragment",
                    "isValidElement",
                    "PureComponent",
                    "useCallback",
                    "useContext",
                    "useDebugValue",
                    "useEffect",
                    "useImperativeHandle",
                    "useLayoutEffect",
                    "useMemo",
                    "useReducer",
                    "useRef",
                    "useState",
                ],
                "react-dom": ["createPortal", "findDOMNode", "render"],
                "react-is": ["isValidElementType"],
            },
        }),
        typescript({
            typescript: require("typescript"),
        }),
        terser(), // minifies generated bundles
    ],
}
