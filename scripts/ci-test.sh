#!/usr/bin/env bash

cd api || exit
yarn run lint
yarn run test
