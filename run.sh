#!/bin/bash

test -f bundle.js ||./build.sh
node server.js
