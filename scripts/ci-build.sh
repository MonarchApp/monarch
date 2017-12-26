#!/usr/bin/env bash

cd api || exit
yarn
yarn gen-keys
cd ../ || exit
