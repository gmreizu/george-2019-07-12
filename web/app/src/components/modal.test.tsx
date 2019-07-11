import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "./modal";


it("renders without crashing", () => {
    const handleClose = () => { }
    const div = document.createElement("div")
    ReactDOM.render(<Modal open={true} onClose={handleClose} />, div)
    ReactDOM.unmountComponentAtNode(div)
});
