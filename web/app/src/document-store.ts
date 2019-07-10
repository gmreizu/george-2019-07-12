import { Document } from "./document";

export class DocumentStore {
    private documents: Document[] = [
        new Document("Doc1", 300),
        new Document("Doc2", 400),
    ]

    public getAll = (): Document[] => {
        return this.documents
    }
}
