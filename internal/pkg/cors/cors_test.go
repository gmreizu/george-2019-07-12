package cors

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCors(t *testing.T) {
	req, err := http.NewRequest("GET", "https://google.com?url=localhost", nil)
	if err != nil {
		t.Fatal(err)
	}

	rec := httptest.NewRecorder()
	h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		expectedAllowOrigin := w.Header().Get("Access-Control-Allow-Origin")
		gotAllowOrigin := r.Header.Get("Origin")
		if gotAllowOrigin != expectedAllowOrigin {
			t.Fatalf("expected origin to be: '%s' but got: '%s'", expectedAllowOrigin, gotAllowOrigin)
		}

		expectedAllowMethods := "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS"
		gotAllowMethods := w.Header().Get("Access-Control-Allow-Methods")
		if gotAllowMethods != expectedAllowMethods {
			t.Fatalf("expected methods %q; got %q", expectedAllowMethods, gotAllowMethods)
		}

		expectedAllowHeaders := "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Pragma, Cache-Control, Authorization"
		gotAllowHeaders := w.Header().Get("Access-Control-Allow-Headers")
		if gotAllowHeaders != expectedAllowHeaders {
			t.Fatalf("expected allow header to be: '%s' but got: '%s'", expectedAllowHeaders, gotAllowHeaders)
		}

		expectedAllowCredentials := "true"
		gotAllowCredentials := w.Header().Get("Access-Control-Allow-Credentials")
		if gotAllowHeaders != expectedAllowHeaders {
			t.Fatalf("expected allow credentials to be: '%s' but got: '%s'", expectedAllowCredentials, gotAllowCredentials)
		}

	})

	Handler(h, "").ServeHTTP(rec, req)
	if status := rec.Code; status != http.StatusOK {
		t.Fatal(http.StatusFound)
	}
}
