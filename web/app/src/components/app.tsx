import * as React from "react";
import { apiBaseURL } from "../api-client";
import { MainContext } from "../context";
import "./app.scss";
import { DocumentGrid } from "./document-grid";

const uploadURL = `${apiBaseURL}/v1/documents`

export class App extends React.Component {
    public render = (): JSX.Element => {
        return (
            <MainContext.Consumer>
                {(context) => {
                    const { documentStore } = context
                    const accept = "image/png, image/jpeg"
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
                            <form
                                encType="multipart/form-data"
                                action={uploadURL}
                                method="post"
                            >
                                <input type="file" name="docfile" accept={accept} />
                                <input type="submit" value="upload file" />
                            </form>
                            <DocumentGrid documents={documentStore.getAll()} />
                        </div>
                    )
                }}
            </MainContext.Consumer>
        )
    }
}
