#!/usr/bin/env sh

# Build back-end.

pushd cmd/backend
go build
popd

# Build front-end.

pushd web/app
npm i
npm run build
popd
