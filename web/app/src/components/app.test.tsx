import { shallow } from "enzyme";
import React from "react";
import { MainContext } from "../context";
import { makeContext } from "../index";
import { App } from "./app";

it("renders without crashing", () => {
    const context = makeContext()

    shallow(
        <MainContext.Provider value={context}>
            <App />
        </MainContext.Provider>
    )
});
