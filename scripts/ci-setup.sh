#!/usr/bin/env bash

sudo apt-get update

# Node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

# Database
createdb 'monarch_test'

# Install
npm install -g yarn
