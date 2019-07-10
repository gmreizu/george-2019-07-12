import * as React from "react";
import { DocumentStore } from "../document-store";
import "./app.scss";
import { DocumentGrid } from "./document-grid";
import { ImageUpload } from "./image-upload";

const uploadURL = "http://localhost:3000/api/v1/documents"

export class App extends React.Component {
    public render = (): JSX.Element => {
        const documentStore = new DocumentStore()

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
                <ImageUpload url={uploadURL} />
                <DocumentGrid documents={documentStore.getAll()} />
            </div>
        )
    }
}