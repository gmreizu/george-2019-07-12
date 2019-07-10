import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";
import "./main.scss";

async function main() {
    // if (process.env.NODE_ENV !== "production") {
    //     console.log("Running in development mode")
    // }

    ReactDOM.render(<App />, document.getElementById("app"))
}

main()
