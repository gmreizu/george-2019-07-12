import * as React from "react";
import { MainContext } from "../context";
import { AddDocumentAction } from "../document-store";
import "./image-upload-form.scss";

interface Props {
    readonly method?: string
    readonly uploadURL: string
    readonly accept?: string
    readonly onUploadEnd: () => void
}

export class ImageUploadForm extends React.Component<Props> {
    static contextType = MainContext

    private titleInputRef = React.createRef<HTMLInputElement>()
    private fileInputRef = React.createRef<HTMLInputElement>()

    public render = (): JSX.Element => {
        const { uploadURL } = this.props
        const accept = this.props.accept || "image/png, image/jpeg"

        return (
            <form
                className="image-upload-form"
                encType="multipart/form-data"
                action={uploadURL}
                method="post"
                onSubmit={this.didSubmit}
            >
                <h1>Upload a document</h1>
                <p>
                    <label>Document Title</label>
                    <input type="text" name="title" ref={this.titleInputRef} autoFocus={true} />
                </p>
                <p>
                    <label>Document File</label>
                    <input type="file" name="docfile" accept={accept} ref={this.fileInputRef} />
                </p>
                <p className="image-upload-form__actions">
                    <button type="submit">Upload</button>
                </p>
            </form>
        )
    }

    private didSubmit = async (e: any) => {
        e.preventDefault()

        // const { uploadURL } = this.props

        const formData = new FormData()

        // @ts-ignore
        formData.append("title", this.titleInputRef.current!.value)

        // @ts-ignore
        formData.append("docfile", this.fileInputRef.current!.files[0])

        const { broker, apiClient } = this.context

        const document = await apiClient.uploadDocument(formData)
        broker.publish(AddDocumentAction, document)

        this.props.onUploadEnd()
    }
}
