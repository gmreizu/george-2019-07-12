package hometask

import (
	"fmt"
	"net/http"

	"playground/hometask/pkg/transportutil"
)

// Transport handles requests to the API endpoints.
type Transport struct {
	service Service
}

func newTransport() *Transport {
	svc := &service{}
	return &Transport{svc}
}

// MakeHandler returns a new http.Handler that handles the API endpoints.
func MakeHandler() http.Handler {
	t := newTransport()

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			t.GetDocuments(w, r)
		case http.MethodPost:
			t.PostDocument(w, r)
		case http.MethodDelete:
			t.DeleteDocument(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// GetDocuments returns the documents stored on the server.
func (t *Transport) GetDocuments(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query().Get("q")

	ctx := r.Context()
	docs, err := t.service.GetDocuments(ctx, q)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, docs, http.StatusOK)
}

// PostDocument uploads a new document to the server.
func (t *Transport) PostDocument(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(MaxUploadBytesNum)

	title := r.FormValue("title")

	file, fh, err := r.FormFile("docfile")
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	ctx := r.Context()
	doc, err := t.service.UploadDocument(ctx, title, file, fh)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, doc, http.StatusOK)
}

// DeleteDocument deletes a document from the server.
func (t *Transport) DeleteDocument(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()

	id := q.Get("id")
	if id == "" {
		err := fmt.Errorf("missing query parameter '%s'", "id")
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	ctx := r.Context()
	err := t.service.DeleteDocument(ctx, id)
	if err != nil {
		transportutil.Respond(w, err, codeFrom(err))
		return
	}

	transportutil.Respond(w, map[string]interface{}{}, http.StatusOK)
}

func codeFrom(err error) int {
	switch err {
	case ErrNotFound:
		return http.StatusNotFound
	}
	return http.StatusInternalServerError
}
