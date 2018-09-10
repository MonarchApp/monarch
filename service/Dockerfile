FROM node:8.11.4-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

# Install builds-deps, build-base, and python for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python openssl

RUN yarn
RUN yarn gen-keys

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
