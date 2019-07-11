import React from "react";
import ReactDOM from "react-dom";
import { ImageUploadForm } from "./image-upload-form";

it("renders without crashing", () => {
    const handleUploadEnd = () => { }
    const div = document.createElement("div")
    ReactDOM.render(<ImageUploadForm onUploadEnd={handleUploadEnd} />, div)
    ReactDOM.unmountComponentAtNode(div)
});
