#!/usr/bin/env sh

# Build back-end.

go build

# Build front-end.

pushd web/app
npm i
npm run build
popd
