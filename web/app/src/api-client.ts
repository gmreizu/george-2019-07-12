import { Document } from "./document";

export const backendBaseURL = "http://localhost:3000"
export const apiBaseURL = `${backendBaseURL}/api`

export const GetDocumentsEvent = "apiClient/getDocuments"

/** DocumentRecord is the 'wire' representation of a Document. */
interface DocumentRecord {
    id: string
    title: string
    path: string
    size: number
    time: string
}

/** APIClient provides an interface to the service API. */
export class APIClient {
    public getDocuments = async (query: string = ""): Promise<Document[]> => {
        const records = await this.http<DocumentRecord[]>(
            "GET",
            `${apiBaseURL}/v1/documents${query === "" ? "" : `?q=${query}`}`
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

            if (!res) {
                return null
            }

            const record = await res.json()

            if (res.ok) {
                return unmarshalDocument(record as DocumentRecord)
            } else {
                console.error(record["error"])
            }
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

            if (!res) {
                return null
            }

            if (res.ok) {
                return res.json()
            } else {
                const record = await res.json()
                console.error(record["error"])
            }

            console.error(res)
        } catch (e) {
            console.error(e)
        }

        return null
    }
}

const unmarshalDocument = (record: DocumentRecord): Document => {
    return new Document(record.id, record.title, record.path, record.size, new Date(record.time))
}