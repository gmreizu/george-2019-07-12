import { shallow } from "enzyme";
import React from "react";
import { Modal } from "./modal";

it("renders without crashing", () => {
    const handleClose = () => { }
    shallow(<Modal open={true} onClose={handleClose} />)
});
