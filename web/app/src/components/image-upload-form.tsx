import * as React from "react";
import "./image-upload.scss";

interface Props {
    readonly method?: string
    readonly uploadURL: string
    readonly accept?: string
    readonly onUploadEnd: () => void
}

export class ImageUploadForm extends React.Component<Props> {
    private fileInputRef = React.createRef<HTMLInputElement>()

    public render = (): JSX.Element => {
        const { uploadURL } = this.props
        const accept = this.props.accept || "image/png, image/jpeg"

        return (
            <form
                encType="multipart/form-data"
                action={uploadURL}
                method="post"
                onSubmit={this.didSubmit}
            >
                <p>
                    <input type="file" name="docfile" accept={accept} ref={this.fileInputRef} />
                </p>
                <p>
                    <input type="submit" value="Upload" />
                </p>
            </form>
        )
    }

    private didSubmit = async (e: any) => {
        e.preventDefault()

        const { uploadURL } = this.props

        const formData = new FormData()
        const fileInput = this.fileInputRef.current!
        // @ts-ignore
        formData.append("docfile", fileInput.files[0])

        await fetch(uploadURL, {
            method: "POST",
            body: formData,
        })

        this.props.onUploadEnd()
    }
}
