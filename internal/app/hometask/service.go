package hometask

// Document represents a document store on the server.
type Document struct {
	Name string `json:"name,omitempty"`
	Size int    `json:"size,omitempty"`
}
