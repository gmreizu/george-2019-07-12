import React from "react";
import ReactDOM from "react-dom";
import { Document } from "../document";
import { DocumentsGrid } from "./documents-grid";

const testDocuments = [
    new Document("1", "Doc 1", "/uploads/doc1.jpg", 123),
    new Document("1", "Doc 1", "/uploads/doc1.jpg", 123),
]

it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<DocumentsGrid documents={testDocuments} />, div)
    ReactDOM.unmountComponentAtNode(div)
});

it("renders when no documents passed", () => {
    const div = document.createElement("div")
    ReactDOM.render(<DocumentsGrid documents={[]} />, div)
    ReactDOM.unmountComponentAtNode(div)
});
