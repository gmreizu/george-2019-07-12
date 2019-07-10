import * as React from "react";
import "./image-upload.scss";

interface Props {
    readonly method?: string
    readonly url: string
    readonly accept?: string
    readonly onUpload?: (file: File) => void
}

interface State {
    file?: File
    previewURL?: string
}

/**
 * ImageUpload provides a UI for uploading images to a backend service.
 */
export class ImageUpload extends React.Component<Props, State> {
    public state: State = {
    }

    public render = (): JSX.Element => {
        const { previewURL } = this.state
        const accept = this.props.accept || "image/png, image/jpeg"

        return (
            <form className="image-upload" onSubmit={this.didSubmit}>
                {
                    previewURL &&
                    <img className="image-upload__preview" src={previewURL} alt="Upload preview" />
                }
                <input required type="file" onChange={this.fileDidChange} accept={accept} />
                <button type="submit">Upload</button>
            </form>
        )
    }

    private fileDidChange = (e: any) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                previewURL: reader.result as string,
            });
        }

        reader.readAsDataURL(file)
    }

    private didSubmit = async () => {
        const file = this.state.file as File

        if (this.props.onUpload) {
            this.props.onUpload(file)
            return
        }

        const { url } = this.props
        const method = this.props.method || "POST"

        await fetch(url, {
            method,
            headers: {
                "Content-Length": `${file.size}`,
                "Content-Type": file.type,
            },
            body: file
        })
    }
}
