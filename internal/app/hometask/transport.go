package hometask

import (
	"encoding/json"
	"net/http"
)

// Handler handles requests to the API endpoints.
type Handler struct {
}

// GetDocuments returns the documents stored on the server.
func (h *Handler) GetDocuments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	docs := []Document{
		Document{"Doc1", 100},
		Document{"Doc2", 200},
		Document{"Doc3", 321},
		Document{"Doc3", 321},
		Document{"Doc3", 321},
		Document{"Doc3", 321},
		Document{"Doc3", 321},
	}
	b, _ := json.Marshal(docs)
	w.Write(b)
}

// PostDocument uploads a new document to the server.
func (h *Handler) PostDocument(w http.ResponseWriter, r *http.Request) {
}

// DeleteDocument deletes a document from the server.
func (h *Handler) DeleteDocument(w http.ResponseWriter, r *http.Request) {
}
