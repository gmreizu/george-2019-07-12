import * as React from "react";
import { MainContext } from "../context";
import { Document } from "../document";
import { DeleteDocumentAction } from "../document-store";
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
                <h3>{document.name}</h3>
                <div>{document.size}</div>
                <button className="document-card__delete" onClick={this.deleteDidClick}>Delete</button>
            </div>
        )
    }

    private deleteDidClick = () => {
        const { broker } = this.context
        if (window.confirm("Are you sure you want to delete this Document?")) {
            broker.publish(DeleteDocumentAction, "name")
        }
    }
}