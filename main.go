package main

import (
	"log"
	"net/http"

	"go.reizu.org/servemux"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome!\n"))
}

func main() {
	mux := servemux.New()

	mux.HandleFunc("/api/v1/documents", handler)
	mux.Handle("/app/*", http.StripPrefix("/app/", http.FileServer(http.Dir("./web/app/public"))))

	// TODO: harden the http server!
	log.Fatal(http.ListenAndServe(":3000", mux))
}
