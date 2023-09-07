#!/bin/bash

set -e
npm run flow
npm run build
npm run bundle
npm run minify
