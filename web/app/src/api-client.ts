import { Document } from "./document";

export enum APIClientEvent {
    GetDocuments = "apiClient/getDocuments"
}

/** APIClient provides an interface to the service API. */
export class APIClient {
    public baseURL = "http://localhost:3000/api/v1"

    public getDocuments = async (query: string = null): Promise<Document[]> => {
        // return this.http<Document[]>(
        //     "GET",
        //     `${this.baseURL}/documents`
        // )

        return [
            new Document("Doc1", 300),
            new Document("Doc2", 400),
        ]
    }

    public uploadDocument = (document: Document) => {
    }

    public deleteDocument = (name: string) => {
    }

    private http = async <T>(method: string, url: string, body?: unknown): Promise<T> => {
        let init: RequestInit

        if (body instanceof File) {
            init = {
                method: method.toUpperCase(),
                body: body,
                mode: "cors",
            }
            init.headers = {
                "content-type": body.type,
                "content-length": `${body.size}`,
            }
        } else {
            init = {
                method: method.toUpperCase(),
                body: JSON.stringify(body),
                mode: "cors",
            }
            init.headers = {}
        }

        const request = new Request(url, init)

        try {
            const res = await fetch(request)

            if (res && res.ok) {
                return res.json()
            }

            console.error(res)
        } catch (e) {
            console.error(e)
        }
    }
}
