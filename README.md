# George - 11/07/2019



## Installation

To run this application you need to have `nodejs 10.16` and `Go 1.12` installed on your system. For installation instructions please check here:

* [Nodejs](https://nodejs.org/en/download/)
* [Go](https://golang.org/doc/install)

Then, you can run the included build script to install further dependencies and build the front-end and the back-end.

```sh
./scripts/build.sh
```

## Security

For security reasons we try to minimize external dependencies.

## Improvements

* Support pagination in the document grid (offset, limit)
* More refactored CSS

## Libraries

### Back-end

We use one external dependency:

* `go-nanoid`: A tiny, secure, URL-friendly, unique string ID generator.   

### Front-end

The only libraries used in production are `react` and `react-dom`.

Development-only dependencies include:

* `typescript`: Static-typing catches many bugs and allows for superior development ergonomics (IDEs), and more readable and maintainable code.

* `react-scripts`: Easy boostrapping of a React applications that follow best-practices.

## API

### GET /api/v1/documents?q={query}

Get a list of all documents stored on the service. This endpoint supports additional options passed as query-string parameters.

* `q`: only return the documents with a title matching the value of the `q` parameter.

Returns a list of documents in JSON format, for example:

```
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Pragma, Cache-Control, Authorization
Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Origin: http://localhost:3001
Content-Type: application/json; charset=utf-8
Date: Thu, 11 Jul 2019 12:52:35 GMT
Content-Length: 1636
Connection: close

[
  {
    "id": "9n6a5hMzTKXJu6CCmdkjqj",
    "title": "Doc 9",
    "path": "uploads/dummy.jpg",
    "size": 40456,
    "time": "2019-07-11T15:43:20.870463653+03:00"
  },
  {
    "id": "cqh2hEkW0OE8_zTL9dPfxD",
    "title": "Doc 2",
    "path": "uploads/dummy.jpg",
    "size": 27887,
    "time": "2019-07-11T15:43:20.862667244+03:00"
  },
  {
    "id": "O0vvloodDNXUEr7u4VadOo",
    "title": "George",
    "path": "/uploads/O0vvloodDNXUEr7u4VadOo.jpg",
    "size": 103134,
    "time": "2019-07-11T15:43:33.342352653+03:00"
  },
]
```

### POST /api/v1/documents

Upload a new document to the service. This a `multipart/form-data` request, with two parameters:

* `title`: The document title
* `docfile`: The file of the document

```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryoLNLjP3A7RoB87LD
Origin: http://localhost:3001
Referer: http://localhost:3001/
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36
```

Returns the created document in JSON format, for example:

```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Pragma, Cache-Control, Authorization
Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Origin: http://localhost:3001
Content-Length: 152
Content-Type: application/json; charset=utf-8
Date: Thu, 11 Jul 2019 12:56:20 GMT

{
    "id": "nEpzXkYE5_UxbERc4hkuNX",
    "title": "Image",
    "path": "/uploads/nEpzXkYE5_UxbERc4hkuNX.jpg",
    "size": 103134,
    "time": "2019-07-11T15:56:20.763232651+03:00"
}
```

### DELETE /api/v1/documents?id={id}

Remove the document with the specific id from the service.

On success returns an empty response, for example:

```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Pragma, Cache-Control, Authorization
Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Origin: http://localhost:3001
Content-Length: 3
Content-Type: application/json; charset=utf-8
Date: Thu, 11 Jul 2019 13:06:26 GMT

{}
```

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

### Code Style and Code Layout

We strive to use the 'official' code style of both languages used in the implementation. Please, note that Golang, promotes the use of small identifiers etc. For Golang we use the standard `gofmt` formatter. For TypeScript we use the VSCode formatter with minor tweaks (e.g. no semicolons).

We use the directory structure described here:

<https://github.com/golang-standards/project-layout>

### Git

For Git commit messages, we follow Golang Team's conventions as described here:

<https://golang.org/doc/contribute.html#commit_messages>

A 'monorepo' aproach is used, where both the API service and the front-end Web app are organized in a single-repo, mainly for simplicity. The two code-bases can be separated at a later stage, if needed.

### CSS

We use the [BEM methodology](https://en.bem.info/) for CSS styles, mostly to disable the 'cascading' feature of CSS, which is considered an anti-pattern these days.
