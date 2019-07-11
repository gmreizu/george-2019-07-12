import * as React from "react";
import { backendBaseURL } from "../api-client";
import { MainContext } from "../context";
import { Document } from "../document";
import { DeleteDocumentAction } from "../document-store";
import { formatBytes } from "../util";
import "./document-card.scss";

interface Props {
    readonly document: Document
}


/** DocumentCard presents a document as a card. */
export class DocumentCard extends React.PureComponent<Props> {
    static contextType = MainContext

    public render = (): JSX.Element => {
        const { document } = this.props

        return (
            <div className="document-card">
                <h3><a href={`${backendBaseURL}${document.path}`} target="_blank" title={document.title}>{document.title}</a></h3>
                <div>{formatBytes(document.size)}</div>
                <button className="document-card__delete" onClick={this.deleteDidClick}>Delete</button>
            </div>
        )
    }

    private deleteDidClick = () => {
        const { broker } = this.context
        const { document } = this.props
        if (window.confirm("Are you sure you want to delete this Document?")) {
            broker.publish(DeleteDocumentAction, document.id)
        }
    }
}