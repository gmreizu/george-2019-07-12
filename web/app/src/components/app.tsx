import * as React from "react";
import { apiBaseURL } from "../api-client";
import { MainContext } from "../context";
import "./app.scss";
import { DocumentGrid } from "./document-grid";
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
                                onClose={this.uploadModalDidClose}>
                                <form
                                    encType="multipart/form-data"
                                    action={uploadURL}
                                    method="post"
                                >
                                    <p>
                                        <input type="file" name="docfile" accept={accept} />
                                    </p>
                                    <p>
                                        <input type="submit" value="Upload" />
                                    </p>
                                </form>
                            </Modal>
                            <DocumentGrid documents={documentStore.getAll()} />
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
}
