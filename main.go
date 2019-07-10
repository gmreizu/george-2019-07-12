package main

import (
	"encoding/json"
	"log"
	"net/http"

	"go.reizu.org/servemux"
)

// Document represents a document store on the server.
type Document struct {
	Name string `json:"name,omitempty"`
	Size int    `json:"size,omitempty"`
}

type handler struct {
}

func (h *handler) getDocuments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	docs := []Document{
		Document{"Doc1", 100},
		Document{"Doc2", 200},
		Document{"Doc3", 321},
	}
	b, _ := json.Marshal(docs)
	w.Write(b)
}

func (h *handler) postDocument(w http.ResponseWriter, r *http.Request) {
}

func (h *handler) deleteDocument(w http.ResponseWriter, r *http.Request) {
}

func main() {
	h := &handler{}
	mux := servemux.New()

	mux.Handle("/app/*", http.StripPrefix("/app/", http.FileServer(http.Dir("./web/app/build"))))
	mux.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/app/build/static"))))

	mux.HandleFunc("/api/v1/documents", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.getDocuments(w, r)
		case http.MethodDelete:
			h.deleteDocument(w, r)
		default:
			http.NotFound(w, r)
		}
	})

	// TODO: harden the http server!
	log.Fatal(http.ListenAndServe(":3000", mux))
}
