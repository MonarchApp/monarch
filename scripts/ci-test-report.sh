#!/usr/bin/env bash

cd api || exit
yarn run coverage
./node_modules/.bin/coveralls
