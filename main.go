package main

import (
	"log"
	"net/http"

	"playground/hometask/internal/app/hometask"
	"playground/hometask/pkg/cors"
)

func main() {
	h := hometask.NewHandler()
	mux := http.NewServeMux()

	// mux.Handle("/app/*", http.StripPrefix("/app/", http.FileServer(http.Dir("./web/app/build"))))
	// mux.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("./web/app/build/static"))))
	// mux.Handle("/uploads/*", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./web/uploads"))))

	corsMiddleware := cors.New("http://localhost:3001/")

	mux.Handle("/api/v1/documents", corsMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			h.GetDocuments(w, r)
		case http.MethodPost:
			h.PostDocument(w, r)
		case http.MethodDelete:
			h.DeleteDocument(w, r)
		default:
			http.NotFound(w, r)
		}
	})))

	// TODO: harden the http server!
	log.Fatal(http.ListenAndServe(":3000", mux))
}
