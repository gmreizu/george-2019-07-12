import * as React from "react";
import { MainContext } from "../context";
import { Document } from "../document";
import { DocumentStore, DocumentStoreUpdatedEvent } from "../document-store";
import { AppHeader } from "./app-header";
import "./app.scss";
import { DocumentsGrid } from "./documents-grid";
import { DocumentsStats } from "./documents-stats";

interface State {
    documents?: Document[]
}

export class App extends React.Component<{}, State> {
    static contextType = MainContext

    public state = {
        documents: this.context.documentStore.getAll(),
    }

    public componentDidMount = () => {
        const { broker } = this.context
        broker.subscribe(DocumentStoreUpdatedEvent, this.handleDocumentStoreUpdatedEvent)
    }

    public componentWillUnmount = () => {
        const { broker } = this.context
        broker.unsubscribe(DocumentStoreUpdatedEvent, this.handleDocumentStoreUpdatedEvent)
    }

    public render = (): JSX.Element => {
        const { documents } = this.state

        return (
            <div className="app">
                <AppHeader />
                <DocumentsStats documents={documents} />
                <DocumentsGrid documents={documents} />
            </div>
        )
    }

    private handleDocumentStoreUpdatedEvent = (documentStore: DocumentStore) => {
        this.setState({
            documents: documentStore.getAll()
        })
    }
}
