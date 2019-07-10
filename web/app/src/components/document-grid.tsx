import * as React from "react";
import { Document } from "../document";
import { DocumentCard } from "./document-card";
import "./document-grid.scss";

interface Props {
    readonly documents: Document[]
}

/** DocumentGrid presents a collection of Documents in a grid layout. */
export class DocumentGrid extends React.Component<Props> {
    public render = (): JSX.Element => {
        const { documents } = this.props

        return (
            <div className="document-grid">
                {documents.map((document, i) => {
                    return (
                        <DocumentCard
                            key={i}
                            document={document}
                        />
                    )
                })}
            </div>
        )
    }
}