import { Document } from "./document";

export const apiBaseURL = "http://localhost:3000/api"

export const GetDocumentsEvent = "apiClient/getDocuments"

interface DocumentRecord {
    title: string
    size: number
}

/** APIClient provides an interface to the service API. */
export class APIClient {
    public getDocuments = async (query: string = ""): Promise<Document[]> => {
        const records = await this.http<DocumentRecord[]>(
            "GET",
            `${apiBaseURL}/v1/documents`
        )

        if (!records) {
            return []
        }

        return records.map(record => new Document(record.title, record.size))
    }

    public uploadDocument = (document: Document) => {
    }

    public deleteDocument = (name: string) => {
    }

    private http = async <T>(method: string, url: string, body?: unknown): Promise<T | null> => {
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

        return null
    }
}
