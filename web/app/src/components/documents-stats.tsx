import * as React from "react";
import { Document } from "../document";
import { formatBytes } from "../util";
import "./documents-stats.scss";

interface Props {
    readonly documents: Document[]
}

export const DocumentsStats: React.SFC<Props> = (props: Props): JSX.Element => {
    const { documents } = props

    const documentsCount = documents.length
    const totalSize = documents.reduce((sum, document) => sum + document.size, 0)

    return (
        <div className="documents-stats">
            <h2>{documentsCount} {documentsCount === 1 ? "document" : "documents"}</h2>
            <div>Total size: {formatBytes(totalSize)}</div>
        </div>
    )
}