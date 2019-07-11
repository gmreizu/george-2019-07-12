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
	b, _ := json.Marshal(db.all())
	w.Write(b)
}

// PostDocument uploads a new document to the server.
func (h *Handler) PostDocument(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(MaxUploadBytesNum)

	title := r.FormValue("title")

	file, fh, err := r.FormFile("docfile")
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	ctx := r.Context()
	doc, err := h.service.UploadDocument(ctx, title, file, fh)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, map[string]interface{}{"document": doc}, http.StatusOK)
}

// DeleteDocument deletes a document from the server.
func (h *Handler) DeleteDocument(w http.ResponseWriter, r *http.Request) {
}

func codeFrom(err error) int {
	return http.StatusInternalServerError
}
