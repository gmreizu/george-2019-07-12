import * as React from "react";
import { apiBaseURL } from "../api-client";
import { MainContext } from "../context";
import "./app.scss";
import { DocumentsGrid } from "./documents-grid";
import { DocumentsStats } from "./documents-stats";
import { ImageUploadForm } from "./image-upload-form";
import { Modal } from "./modal";

const uploadURL = `${apiBaseURL}/v1/documents`

interface State {
    isUploadModalOpen?: boolean
}

export class App extends React.Component {
    public state = {
        isUploadModalOpen: false
    }

    public render = (): JSX.Element => {
        const { isUploadModalOpen } = this.state

        return (
            <MainContext.Consumer>
                {(context) => {
                    const { documentStore } = context
                    const accept = "image/png, image/jpeg"
                    const documents = documentStore.getAll()
                    return (
                        <div className="app">
                            <header className="app__header">
                                <input
                                    className="app__header__searchbox"
                                    type="text"
                                    placeholder="Search documents..."
                                />
                                <button onClick={this.openUploadModalDidClick}>Upload</button>
                            </header>
                            <Modal
                                open={isUploadModalOpen}
                                onClose={this.uploadModalDidClose}
                            >
                                <ImageUploadForm
                                    uploadURL={uploadURL}
                                    accept={accept}
                                    onUploadEnd={this.uploadDidEnd}
                                />
                            </Modal>
                            <DocumentsStats documents={documents} />
                            <DocumentsGrid documents={documents} />
                        </div>
                    )
                }}
            </MainContext.Consumer>
        )
    }

    private openUploadModalDidClick = () => {
        this.setState({
            isUploadModalOpen: true,
        })
    }

    private uploadModalDidClose = () => {
        this.setState({
            isUploadModalOpen: false,
        })
    }

    private uploadDidEnd = () => {
        this.setState({
            isUploadModalOpen: false,
        })
    }
}
