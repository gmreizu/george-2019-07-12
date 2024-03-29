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
	"regexp"
	"time"

	nanoid "github.com/matoous/go-nanoid"
)

// MaxUploadBytesNum is the maximum size of uploads in bytes.
const MaxUploadBytesNum = 10 << 20 // 10MiB

var (
	// ErrNotFound denotes that the document was not found.
	ErrNotFound = errors.New("document not found")
	// ErrInvalidTitle denotes that the document title is invalid.
	ErrInvalidTitle = errors.New("invalid document title")
	// ErrInvalidDoc denotes an invalid document that is exceeding the max bytes
	// or an unsupported image format.
	ErrInvalidDoc = errors.New("invalid document")
	// ErrUnsupportedDocFormat denotes that the document has an unsupported image format.
	ErrUnsupportedDocFormat = errors.New("unsupported document format")
)

var (
	db             = newDatabase()
	reInvalidTitle = regexp.MustCompile("^[^<>]+$")
)

// Service implements the document management logic.
type Service interface {
	GetDocuments(ctx context.Context, q string) (docs []*Document, err error)
	UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (doc *Document, err error)
	DeleteDocument(ctx context.Context, id string) (err error)
}

type service struct {
}

func (s *service) GetDocuments(ctx context.Context, q string) ([]*Document, error) {
	if q == "" {
		return db.all(), nil
	}

	return db.search(q), nil
}

func (s *service) UploadDocument(ctx context.Context, title string, file multipart.File, fh *multipart.FileHeader) (*Document, error) {
	defer file.Close()

	tlen := len(title)

	if tlen < 4 || tlen > 32 {
		return nil, ErrInvalidTitle
	}

	if !reInvalidTitle.MatchString(title) {
		return nil, ErrInvalidTitle
	}

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

func (s *service) DeleteDocument(ctx context.Context, id string) error {
	return db.delete(id)
}

func init() {
	db.seed(10)
}
