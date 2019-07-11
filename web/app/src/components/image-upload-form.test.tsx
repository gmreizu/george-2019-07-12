import { shallow } from "enzyme";
import React from "react";
import { ImageUploadForm } from "./image-upload-form";

it("renders without crashing", () => {
    const handleUploadEnd = () => { }
    shallow(<ImageUploadForm onUploadEnd={handleUploadEnd} />)
});
