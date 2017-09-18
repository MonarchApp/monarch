#!/usr/bin/env bash

sudo apt-get update

# Database
createdb 'monarch_test'

# Install
npm install -g yarn
