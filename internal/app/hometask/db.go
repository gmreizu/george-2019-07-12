package hometask

import (
	"fmt"
	"math/rand"

	nanoid "github.com/matoous/go-nanoid"
)

type database struct {
	docs map[string]*Document
}

func newDatabase() *database {
	return &database{map[string]*Document{}}
}

func (d *database) insert(doc *Document) {
	d.docs[doc.ID] = doc
}

func (d *database) delete(id string) {
	delete(d.docs, id)
}

func (d *database) all() []*Document {
	values := make([]*Document, 0, len(d.docs))

	for _, v := range d.docs {
		values = append(values, v)
	}

	return values
}

// seed populates the db with some dummy documents.
func (d *database) seed(n int) {
	for i := 0; i < n; i++ {
		id, _ := nanoid.Nanoid()
		d.insert(&Document{
			ID:    id,
			Title: fmt.Sprintf("Dummy%d", i),
			Size:  int64(rand.Intn(100000)),
		})
	}
}
