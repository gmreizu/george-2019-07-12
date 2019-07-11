import * as React from "react";
import { apiBaseURL } from "../api-client";
import { MainContext } from "../context";
import { Document } from "../document";
import { DocumentStore, DocumentStoreUpdatedEvent } from "../document-store";
import "./app.scss";
import { DocumentsGrid } from "./documents-grid";
import { DocumentsStats } from "./documents-stats";
import { ImageUploadForm } from "./image-upload-form";
import { Modal } from "./modal";

const uploadURL = `${apiBaseURL}/v1/documents`

interface State {
    isUploadModalOpen?: boolean
    documents?: Document[]
}

export class App extends React.PureComponent<{}, State> {
    static contextType = MainContext

    public state = {
        isUploadModalOpen: false,
        documents: this.context.documentStore.getAll(),
    }

    public componentDidMount = () => {
        const { broker } = this.context
        broker.subscribe(DocumentStoreUpdatedEvent, this.handleDocumentStoreUpdatedEvent)
    }

    public componentWillUnmount = () => {
        const { broker } = this.context
        broker.unsubscribe(DocumentStoreUpdatedEvent, this.handleDocumentStoreUpdatedEvent)
    }

    public render = (): JSX.Element => {
        const { isUploadModalOpen, documents } = this.state

        const accept = "image/png, image/jpeg"

        return (
            <div className="app">
                <header className="app__header">
                    <input
                        className="app__header__searchbox"
                        type="text"
                        placeholder="Search documents..."
                        autoFocus={true}
                    />
                    <button className="app__upload-button" onClick={this.openUploadModalDidClick}>Upload</button>
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

        const { broker } = this.context
        broker.publish()
    }

    private handleDocumentStoreUpdatedEvent = (documentStore: DocumentStore) => {
        this.setState({
            documents: documentStore.getAll()
        })
    }
}
