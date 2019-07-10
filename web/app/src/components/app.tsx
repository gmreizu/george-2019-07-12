import * as React from "react";
import { MainContext } from "../context";
import "./app.scss";
import { DocumentGrid } from "./document-grid";

// const uploadURL = "http://localhost:3000/api/v1/documents"

export class App extends React.Component {
    public render = (): JSX.Element => {
        return (
            <MainContext.Consumer>
                {(context) => {
                    const { documentStore } = context
                    return (
                        <div className="app">
                            <header className="app__header">
                                <input
                                    className="app__header__searchbox"
                                    type="text"
                                    placeholder="Search documents..."
                                />
                                <button>Upload</button>
                            </header>
                            {/* <ImageUpload url={uploadURL} /> */}
                            <DocumentGrid documents={documentStore.getAll()} />
                        </div>
                    )
                }}
            </MainContext.Consumer>
        )
    }
}
