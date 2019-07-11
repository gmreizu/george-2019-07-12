package hometask

import (
	"fmt"
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
	q := r.URL.Query().Get("q")

	ctx := r.Context()
	docs, err := h.service.GetDocuments(ctx, q)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, docs, http.StatusOK)
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

	transportutil.Respond(w, doc, http.StatusOK)
}

// DeleteDocument deletes a document from the server.
func (h *Handler) DeleteDocument(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()

	id := q.Get("id")
	if id == "" {
		err := fmt.Errorf("missing query parameter '%s'", "id")
		transportutil.Respond(w, err, codeFrom(err))
	}

	ctx := r.Context()
	h.service.DeleteDocument(ctx, id)

	transportutil.Respond(w, map[string]interface{}{}, http.StatusOK)
}

func codeFrom(err error) int {
	return http.StatusInternalServerError
}
