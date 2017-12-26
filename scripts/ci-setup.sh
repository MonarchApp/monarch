#!/usr/bin/env bash

sudo apt-get update

# Database
createdb 'monarch_test'

# Install
cd api || exit
npm install -g yarn
cd ../app || exit
npm install -g yarn
cd ../ || exit
