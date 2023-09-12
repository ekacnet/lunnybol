#!/bin/bash

# Flow is not working really in Docker containers running in a Mac M1 (at least)
# Anyhow flow is more useful for the development than for running so let's make this optional
set -e
if [ ! -e /proc/self/cgroup ]||[ grep -q -v docker /proc/self/cgroup ]; then
  npm run flow
fi
npm run build
npm run bundle
npm run minify
