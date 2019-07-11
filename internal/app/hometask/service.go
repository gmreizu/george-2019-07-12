package hometask

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"os"

	nanoid "github.com/matoous/go-nanoid"
)

// MaxUploadBytesNum is the maximum size of uploads in bytes.
const MaxUploadBytesNum = 10 << 20 // 10MiB

// Document represents a document store on the server.
type Document struct {
	ID    string `json:"id,omitempty"`
	Title string `json:"title,omitempty"`
	Size  int    `json:"size,omitempty"`
	// Time  time.Time `json:"time,omitempty"`
}

var db = newDatabase()

var (
	// ErrInvalidDoc denotes an invalid document that is exceeding the max bytes
	// or an unsupported image format.
	ErrInvalidDoc = errors.New("invalid document")
	// ErrUnsupportedDocFormat denotes that the document has an unsupported image format.
	ErrUnsupportedDocFormat = errors.New("unsupported document format")
)

// Service implements the document management logic.
type Service interface {
	UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (docURL string, err error)
}

type service struct {
}

func (s *service) UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (docURL string, err error) {
	defer file.Close()

	// fmt.Printf("Uploaded File: %+v\n", fh.Filename)
	// fmt.Printf("File Size: %+v\n", fh.Size)
	// fmt.Printf("MIME Header: %+v\n", fh.Header)

	// TODO: check file format.
	// TODO: keep a pseudo-database of documents.

	df, err := os.Create("web/uploads/" + fh.Filename)
	if err != nil {
		return "", nil
	}
	defer df.Close()

	b, err := ioutil.ReadAll(file)
	if err != nil {
		return "", nil
	}

	df.Write(b)

	id, err := nanoid.Nanoid()
	if err != nil {
		return "", fmt.Errorf("could not generate document id: %v", err)
	}
	fmt.Println("...", id)

	return "/uploads/" + fh.Filename, nil
}

func init() {
	db.seed(10)
}
