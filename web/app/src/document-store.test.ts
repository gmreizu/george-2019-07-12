import { APIClient } from "./api-client";
import { Broker } from "./broker";
import { Document } from "./document";
import { AddDocumentAction, DeleteDocumentAction, DocumentStore } from "./document-store";

test("can add and remove documents", () => {
    const broker = new Broker()
    const apiClient = new APIClient()
    const documentStore = new DocumentStore(broker, apiClient)

    const testDocuments = [
        new Document("1", "Doc 1", "/uploads/doc1.jpg", 123),
        new Document("2", "Doc 2", "/uploads/doc1.jpg", 234),
    ]

    for (const document of testDocuments) {
        broker.publish(AddDocumentAction, document)
    }

    expect(documentStore.getAll().length).toBe(2)

    broker.publish(DeleteDocumentAction, "1")
    expect(documentStore.getAll().length).toBe(1)
})