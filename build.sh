#!/bin/bash

if [ -d dist ]; then rm --recursive --force dist; fi

npx tsc --project production.tsconfig.json

cp --recursive --parents ./src/web/public ./dist
cp --recursive --parents ./src/web/views ./dist

