package main

import (
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome!\n"))
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/v1/documents", handler)

	// TODO: harden the http server!
	log.Fatal(http.ListenAndServe(":3000", mux))
}
