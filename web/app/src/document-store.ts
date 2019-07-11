import { APIClient, GetDocumentsEvent } from "./api-client";
import { Broker } from "./broker";
import { Document } from "./document";

export const DeleteDocumentAction = "documentStore/deleteDocument"

export class DocumentStore {
    constructor(
        public broker: Broker,
        public apiClient: APIClient,
    ) {
        broker.subscribe(DeleteDocumentAction, this.handleDeleteDocumentAction)
        broker.subscribe(GetDocumentsEvent, this.handleGetDocumentsEvent)
    }

    private documents: Document[] = []

    public getAll = (): Document[] => {
        return this.documents
    }

    private handleDeleteDocumentAction = (id: string) => {
        this.apiClient.deleteDocument(id)
    }

    private handleGetDocumentsEvent = (documents: Document[]) => {
        this.documents = documents
    }
}
