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
                <h3>{document.name}</h3>
                <div>{document.size}</div>
                <button className="document-card__delete" onClick={this.deleteDidClick}>Delete</button>
            </div>
        )
    }

    private deleteDidClick = () => {
        if (window.confirm("Are you sure you want to delete this Document?")) {
            console.log("DELETE")
        }
    }
}