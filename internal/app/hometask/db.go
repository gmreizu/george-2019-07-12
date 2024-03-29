package hometask

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

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

func (d *database) delete(id string) error {
	_, ok := d.docs[id]
	if !ok {
		return ErrNotFound
	}

	delete(d.docs, id)
	return nil
}

func (d *database) all() []*Document {
	values := make([]*Document, 0, len(d.docs))

	for _, v := range d.docs {
		values = append(values, v)
	}

	return values
}

func (d *database) search(q string) []*Document {
	values := make([]*Document, 0, len(d.docs))
	q = strings.ToLower(q)
	for _, v := range d.docs {
		if strings.Contains(strings.ToLower(v.Title), q) {
			values = append(values, v)
		}
	}

	return values
}

// seed populates the db with some dummy documents.
func (d *database) seed(n int) {
	for i := 0; i < n; i++ {
		id, _ := nanoid.Nanoid()
		time.Sleep(1 * time.Millisecond)
		d.insert(NewDocument(
			id,
			fmt.Sprintf("Doc %d", i+1),
			"uploads/dummy.jpg",
			int64(rand.Intn(100000)),
		))
	}
}
