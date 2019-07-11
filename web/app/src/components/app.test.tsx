import React from "react";
import ReactDOM from "react-dom";
import { MainContext } from "../context";
import { makeContext } from "../index";
import { App } from "./app";

it("renders without crashing", () => {
    const div = document.createElement("div")
    const context = makeContext()

    ReactDOM.render(
        <MainContext.Provider value={context}>
            <App />
        </MainContext.Provider>,
        div,
    )

    ReactDOM.unmountComponentAtNode(div)
});
