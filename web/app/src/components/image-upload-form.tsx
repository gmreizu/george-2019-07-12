import * as React from "react";
import { MainContext } from "../context";
import { AddDocumentAction } from "../document-store";
import "./image-upload-form.scss";

interface Props {
    readonly method?: string
    readonly accept?: string
    readonly onUploadEnd: () => void
}

const titleRE = "^[^<>]+$"

/** ImageUploadForm manages the document upload workflow. */
export class ImageUploadForm extends React.Component<Props> {
    static contextType = MainContext

    private titleInputRef = React.createRef<HTMLInputElement>()
    private fileInputRef = React.createRef<HTMLInputElement>()

    public render = (): JSX.Element => {
        const accept = this.props.accept || "image/png, image/jpeg"

        return (
            <form
                className="image-upload-form"
                encType="multipart/form-data"
                method="post"
                onSubmit={this.didSubmit}
            >
                <h2>Upload a document</h2>
                <p>
                    <label>Document Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        minLength={4}
                        maxLength={32}
                        pattern={titleRE}
                        autoFocus
                        ref={this.titleInputRef}
                    />
                </p>
                <p>
                    <label>Document File</label>
                    <input
                        type="file"
                        name="docfile"
                        accept={accept}
                        required
                        ref={this.fileInputRef}
                    />
                </p>
                <p className="image-upload-form__actions">
                    <button type="submit">Upload</button>
                </p>
            </form>
        )
    }

    private didSubmit = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()

        // @ts-ignore
        const title = this.titleInputRef.current!.value

        // @ts-ignore
        const docfile = this.fileInputRef.current!.files[0]

        // Both are validated using HTML5 features.
        // Additional validation is performed at the backend.

        formData.append("title", title)
        formData.append("docfile", docfile)

        const { broker, apiClient } = this.context

        const document = await apiClient.uploadDocument(formData)
        if (document) {
            broker.publish(AddDocumentAction, document)
        }

        this.props.onUploadEnd()
    }
}
