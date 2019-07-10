# George Moschovitis - 12/07/2019

## Installation

## Security

## Improvements

## Libraries

## API

### GET /api/v1/documents?q={query}&offset={offset}&limit={limit}

Get a list of all documents stored on the service. This endpoint supports additional options passed as query-string parameters.

* `q`: only return the documents that match the query value
* `limit`: the maximum number of documents to return
* `offset`: the number of documents to skip

### POST /api/v1/documents

Upload a new document to the service.

### DELETE /api/v1/documents/{id}

Remove a document from the service

## Running tests

```sh
go test ./...
```

## Miscellanea

### Git

For Git commit messages, we follow Golang Team's conventions as described here:

<https://golang.org/doc/contribute.html#commit_messages>

### CSS

We use the [BEM methodology](https://en.bem.info/) for CSS styles, mostly to disable the 'cascading' feature of CSS, which is considered an anti-pattern these days.


