#!/usr/bin/env bash

cd api || exit
yarn lint
yarn test
yarn features
