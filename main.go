package main

import (
	"log"
	"net/http"

	"playground/hometask/internal/app/hometask"
	"playground/hometask/internal/pkg/cors"

	"go.reizu.org/servemux"
)

func main() {
	h := &hometask.Handler{}
	mux := servemux.New()

	mux.Handle("/app/*", http.StripPrefix("/app/", http.FileServer(http.Dir("./web/app/build"))))
	mux.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/app/build/static"))))

	corsMiddleware := cors.New("http://localhost:3001/")

	mux.Handle("/api/v1/documents", corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.GetDocuments(w, r)
		case http.MethodDelete:
			h.DeleteDocument(w, r)
		default:
			http.NotFound(w, r)
		}
	})))

	// TODO: harden the http server!
	log.Fatal(http.ListenAndServe(":3000", mux))
}
