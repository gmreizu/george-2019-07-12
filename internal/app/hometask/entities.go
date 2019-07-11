package hometask

import "time"

// Document represents a document store on the server.
type Document struct {
	ID    string    `json:"id,omitempty"`
	Title string    `json:"title,omitempty"`
	Path  string    `json:"path,omitempty"`
	Size  int64     `json:"size,omitempty"`
	Time  time.Time `json:"time,omitempty"`
}

// NewDocument returns a new document.
func NewDocument(id, title, path string, size int64) *Document {
	return &Document{
		ID:    id,
		Title: title,
		Path:  path,
		Size:  size,
		Time:  time.Now(),
	}
}
