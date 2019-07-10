import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";

async function main() {
    if (process.env.NODE_ENV !== "production") {
        console.log("Running in development mode")
    }

    // await initRegistry()
    // // DON'T DELETE
    // // initWidgets()
    // await initStores()

    ReactDOM.render(<App />, document.getElementById("app"))
}

main()
