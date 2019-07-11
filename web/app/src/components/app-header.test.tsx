import { shallow } from "enzyme";
import React from "react";
import { AppHeader } from "./app-header";

it("renders without crashing", () => {
    const wrapper = shallow(<AppHeader />)
    expect(wrapper.contains("Upload")).toEqual(true)
});
