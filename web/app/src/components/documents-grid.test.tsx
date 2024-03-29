import { shallow } from "enzyme";
import React from "react";
import { Document } from "../document";
import { DocumentCard } from "./document-card";
import { DocumentsGrid } from "./documents-grid";

const testDocuments = [
    new Document("1", "Doc 1", "/uploads/doc1.jpg", 123),
    new Document("2", "Doc 2", "/uploads/doc1.jpg", 234),
]

it("renders with documents", () => {
    const wrapper = shallow(<DocumentsGrid documents={testDocuments} />)
    expect(wrapper.contains(<DocumentCard document={testDocuments[0]} />)).toEqual(true)
    expect(wrapper.contains(<DocumentCard document={testDocuments[1]} />)).toEqual(true)
});

it("renders when no documents passed", () => {
    shallow(<DocumentsGrid documents={[]} />)
});
