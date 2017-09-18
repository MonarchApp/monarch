#!/usr/bin/env bash

# Node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Database
createdb 'monarch_test'

# Install
sudo apt-get update
npm install -g yarn
