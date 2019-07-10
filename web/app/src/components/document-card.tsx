import * as React from "react";
import { Document } from "../document";
import "./document-card.scss";

interface Props {
    readonly document: Document
}

/** DocumentCard presents a document as a card. */
export class DocumentCard extends React.PureComponent<Props> {
    public render = (): JSX.Element => {
        const { document } = this.props

        return (
            <div className="document-card">
                <div>{document.name}</div>
                <div>{document.size}</div>
                <button>Delete</button>
            </div>
        )
    }
}