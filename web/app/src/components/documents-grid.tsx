import * as React from "react";
import { Document } from "../document";
import { DocumentCard } from "./document-card";
import "./documents-grid.scss";

interface Props {
    readonly documents: Document[]
}

/** DocumentGrid presents a collection of Documents in a grid layout. */
export const DocumentsGrid: React.SFC<Props> = (props: Props): JSX.Element => {
    const { documents } = props

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