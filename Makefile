install:
	npm install

start:
	npm run build:watch
build:
	rm -rf dist
	npm run build:dev

test:
	npm run test

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
