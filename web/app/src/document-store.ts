import { APIClient, GetDocumentsEvent } from "./api-client";
import { Broker } from "./broker";
import { Document } from "./document";

export const AddDocumentAction = "DocumentStore/AddDocumentAction"
export const DeleteDocumentAction = "DocumentStore/DeleteDocumentAction"
export const DocumentStoreUpdatedEvent = "DocumentStore/DocumentStoreUpdatedEvent"

export class DocumentStore {
    constructor(
        public broker: Broker,
        public apiClient: APIClient,
    ) {
        broker.subscribe(AddDocumentAction, this.handleAddDocumentAction)
        broker.subscribe(DeleteDocumentAction, this.handleDeleteDocumentAction)
        broker.subscribe(GetDocumentsEvent, this.handleGetDocumentsEvent)
    }

    private documents: Document[] = []

    private add = (document: Document) => {
        this.documents.push(document)
    }

    private remove = (id: string) => {
        this.documents = this.documents.filter(document => document.id !== id)
    }

    public getAll = (): Document[] => {
        return this.documents
    }

    private handleAddDocumentAction = (document: Document) => {
        this.add(document)
        this.broker.publish(DocumentStoreUpdatedEvent, this)
    }

    private handleDeleteDocumentAction = (id: string) => {
        this.apiClient.deleteDocument(id)
        this.remove(id)
        this.broker.publish(DocumentStoreUpdatedEvent, this)
    }

    private handleGetDocumentsEvent = (documents: Document[]) => {
        for (const document of documents) {
            this.add(document)
        }
        this.broker.publish(DocumentStoreUpdatedEvent, this)
    }
}
