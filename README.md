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

For the back-end:

```sh
go test ./...
```

For the front-end:

```sh
cd web/app
npm run test
```

## Miscellanea

### Code Style

We strive to use the 'official' code style of both languages used in the implementation. Please, note that Golang, promotes the use of small identifiers etc.

### Git

For Git commit messages, we follow Golang Team's conventions as described here:

<https://golang.org/doc/contribute.html#commit_messages>

A 'monorepo' aproach is used, where both the API service and the front-end Web app are organized in a single-repo, mainly for simplicity. The two code-bases can be separated at a later stage, if needed.

### CSS

We use the [BEM methodology](https://en.bem.info/) for CSS styles, mostly to disable the 'cascading' feature of CSS, which is considered an anti-pattern these days.


