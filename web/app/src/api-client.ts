import { Document } from "./document";

export const backendBaseURL = "http://localhost:3000"
export const apiBaseURL = `${backendBaseURL}/api`

export const GetDocumentsEvent = "apiClient/getDocuments"

interface DocumentRecord {
    id: string
    title: string
    size: number
    path: string
    time: string
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

        return records.map(unmarshalDocument)
    }

    public uploadDocument = async (formData: FormData): Promise<Document | null> => {
        try {
            const res = await fetch(`${apiBaseURL}/v1/documents`, {
                method: "POST",
                body: formData,
            })

            if (res && res.ok) {
                const record = await res.json() as DocumentRecord
                return unmarshalDocument(record)
            }

            console.error(res)
        } catch (e) {
            console.error(e)
        }

        return null
    }

    public deleteDocument = async (id: string) => {
        await this.http<void>(
            "DELETE",
            `${apiBaseURL}/v1/documents?id=${id}`
        )
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

const unmarshalDocument = (record: DocumentRecord): Document => {
    return new Document(record.id, record.title, record.size, record.path, new Date(record.time))
}