import * as React from "react";
import { GetDocumentsEvent } from "../api-client";
import { MainContext } from "../context";
import "./app-header.scss";
import { ImageUploadForm } from "./image-upload-form";
import { Modal } from "./modal";

interface State {
    isUploadModalOpen?: boolean
}

/** AppHeader presents the application header. */
export class AppHeader extends React.PureComponent<{}, State> {
    static contextType = MainContext

    public state = {
        isUploadModalOpen: false,
    }

    public render = (): JSX.Element => {
        const { isUploadModalOpen } = this.state

        const accept = "image/png, image/jpeg"

        return (
            <header className="app-header">
                <input
                    className="app-header__searchbox"
                    type="text"
                    placeholder="Search documents..."
                    autoFocus={true}
                    onChange={this.searchBoxDidChange}
                />
                <button className="app__upload-button" onClick={this.openUploadModalDidClick}>Upload</button>
                <Modal
                    open={isUploadModalOpen}
                    onClose={this.uploadModalDidClose}
                >
                    <ImageUploadForm
                        accept={accept}
                        onUploadEnd={this.uploadDidEnd}
                    />
                </Modal>
            </header>
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

    private searchBoxDidChange = async (e: React.ChangeEvent) => {
        const el = e.target as HTMLInputElement
        const query = el.value
        const { broker, apiClient } = this.context
        const documents = await apiClient.getDocuments(query)
        broker.publish(GetDocumentsEvent, documents)
    }
}

