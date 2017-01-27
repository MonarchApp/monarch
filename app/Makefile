address ?= localhost
port ?= 8000

entry_file := src/Main.elm

.PHONY: all build clean install run test

all: build

build:
	@mkdir -p dist/
	@elm-make src/Main.elm --output=dist/index.html

clean:
	@rm -rf dist

install:
	@elm-package install

run:
	@elm-reactor --port=$(port) --address=$(address)

test:
	@elm-test
