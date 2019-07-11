import { shallow } from "enzyme";
import React from "react";
import { Document } from "../document";
import { DocumentsStats } from "./documents-stats";

const testDocuments = [
    new Document("1", "Doc 1", "/uploads/doc1.jpg", 123),
    new Document("2", "Doc 2", "/uploads/doc1.jpg", 234),
]

it("renders with documents", () => {
    const wrapper = shallow(<DocumentsStats documents={testDocuments} />)
    expect(wrapper.contains(<div>Total size: 357 Bytes</div>)).toEqual(true)
});

it("renders when no documents passed", () => {
    shallow(<DocumentsStats documents={[]} />)
});
