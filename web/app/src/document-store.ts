import { APIClientEvent } from "./api-client";
import { Broker } from "./broker";
import { Document } from "./document";

export class DocumentStore {
    constructor(
        public broker: Broker,
    ) {
        broker.subscribe(APIClientEvent.GetDocuments, this.handleGetDocuments)
    }

    private documents: Document[] = []

    public getAll = (): Document[] => {
        return this.documents
    }

    private handleGetDocuments = (documents: Document[]) => {
        this.documents = documents
    }
}
