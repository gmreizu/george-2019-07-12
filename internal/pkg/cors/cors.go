package cors

import (
	"net/http"
	"strings"
)

// Handler creates a CORS handler.
func Handler(next http.Handler, origin string) http.Handler {
	return New(origin)(next)
}

// New returns a CORS middleware.
func New(origin string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if origin == "" {
				origin = r.URL.Query().Get("url")
			}

			if origin != "" {
				r.Header.Set("Origin", origin) // we may use that on the chain.
				allowOrigin(w, origin)
			}

			if r.Method == "OPTIONS" {
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func allowOrigin(w http.ResponseWriter, origin string) {
	origin = strings.TrimSuffix(origin, "/")
	w.Header().Set("Access-Control-Allow-Origin", strings.TrimSuffix(origin, "/"))
	w.Header().Set("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Pragma, Cache-Control, Authorization")
}
