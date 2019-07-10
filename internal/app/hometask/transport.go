package hometask

import (
	"encoding/json"
	"net/http"

	"playground/hometask/pkg/transportutil"
)

// Handler handles requests to the API endpoints.
type Handler struct {
	service Service
}

// NewHandler returns a new handler.
func NewHandler() *Handler {
	svc := &service{}
	return &Handler{svc}
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
	r.ParseMultipartForm(MaxUploadBytesNum)

	file, fh, err := r.FormFile("docfile")
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	ctx := r.Context()
	docURL, err := h.service.UploadDocument(ctx, file, fh)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, map[string]string{"documentURL": docURL}, http.StatusOK)
}

// DeleteDocument deletes a document from the server.
func (h *Handler) DeleteDocument(w http.ResponseWriter, r *http.Request) {
}

func codeFrom(err error) int {
	return http.StatusInternalServerError
}
