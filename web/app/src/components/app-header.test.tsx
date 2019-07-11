import React from "react";
import ReactDOM from "react-dom";
import { AppHeader } from "./app-header";

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<AppHeader />, div)
    ReactDOM.unmountComponentAtNode(div)
});
