package hometask

import (
	"context"
	"errors"
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"io"
	"mime/multipart"
	"os"
	"time"

	nanoid "github.com/matoous/go-nanoid"
)

// MaxUploadBytesNum is the maximum size of uploads in bytes.
const MaxUploadBytesNum = 10 << 20 // 10MiB

// Document represents a document store on the server.
type Document struct {
	ID    string    `json:"id,omitempty"`
	Title string    `json:"title,omitempty"`
	Size  int64     `json:"size,omitempty"`
	Path  string    `json:"path,omitempty"`
	Time  time.Time `json:"time,omitempty"`
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
	UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (doc *Document, err error)
}

type service struct {
}

func (s *service) UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (*Document, error) {
	defer file.Close()

	// fmt.Printf("Uploaded File: %+v\n", fh.Filename)
	// fmt.Printf("File Size: %+v\n", fh.Size)
	// fmt.Printf("MIME Header: %+v\n", fh.Header)

	lr := io.LimitReader(file, MaxUploadBytesNum)
	img, format, err := image.Decode(lr)
	if _, ok := err.(jpeg.FormatError); ok {
		return nil, ErrInvalidDoc
	}
	if _, ok := err.(png.FormatError); ok {
		return nil, ErrInvalidDoc
	}
	if err == image.ErrFormat {
		return nil, ErrUnsupportedDocFormat
	}
	if err != nil {
		return nil, fmt.Errorf("could not read document: %v", err)
	}
	if format != "png" && format != "jpeg" {
		return nil, ErrUnsupportedDocFormat
	}

	id, err := nanoid.Nanoid()
	if err != nil {
		return nil, fmt.Errorf("could not generate document id: %v", err)
	}

	path := "/uploads/" + id

	if format == "png" {
		path += ".png"
	} else {
		path += ".jpg"
	}

	df, err := os.Create("web/" + path)
	if err != nil {
		return nil, nil
	}
	defer df.Close()

	if format == "png" {
		err = png.Encode(df, img)
	} else {
		err = jpeg.Encode(df, img, &jpeg.Options{Quality: 100})
	}
	if err != nil {
		return nil, fmt.Errorf("could not write document to file: %v", err)
	}

	doc := &Document{
		ID:    id,
		Title: title,
		Size:  fh.Size,
		Path:  path,
		Time:  time.Now(),
	}

	db.insert(doc)

	return doc, nil
}

func init() {
	db.seed(10)
}
