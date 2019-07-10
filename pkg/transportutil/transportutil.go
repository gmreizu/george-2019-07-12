package transportutil

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type jsonError struct {
	Error string `json:"error"`
}

// Respond writes a JSON response to Writer w.
func Respond(w http.ResponseWriter, v interface{}, statusCode int) {
	if err, ok := v.(error); ok {
		if statusCode == http.StatusInternalServerError {
			v = jsonError{"internal server error"}
		} else {
			v = jsonError{err.Error()}
		}
	}

	var b bytes.Buffer
	if err := json.NewEncoder(&b).Encode(v); err != nil {
		Respond(w, fmt.Errorf("could not marshal response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(statusCode)
	_, _ = w.Write(b.Bytes())
}
