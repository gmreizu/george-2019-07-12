import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { Document } from "../document";
import { DocumentCard } from "./document-card";

describe("DocumentCard", () => {
    it("renders without crashing", () => {
        const document = new Document("1", "Doc 1", "/uploads/doc1.jpg", 123)
        const wrapper = shallow(<DocumentCard document={document} />)
        expect(wrapper.contains("Doc 1")).toEqual(true)
        expect(wrapper.contains(<div>123 Bytes</div>)).toEqual(true)
    })

    it("renders correctly", () => {
        const document = new Document("1", "Doc 1", "/uploads/doc1.jpg", 123)
        const tree = renderer
            .create(<DocumentCard document={document} />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})
