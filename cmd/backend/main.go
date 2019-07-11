package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"playground/hometask/internal/app/hometask"
	"playground/hometask/pkg/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./web/uploads"))))

	corsMiddleware := cors.New("http://localhost:3001/")

	mux.Handle("/api/v1/documents", corsMiddleware(hometask.MakeHandler()))

	port := "3000"

	s := &http.Server{
		Addr:           ":" + port,
		Handler:        mux,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		IdleTimeout:    120 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println("Listening at :" + port)

	log.Fatal(s.ListenAndServe())
}
