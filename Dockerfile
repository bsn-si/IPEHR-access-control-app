FROM node:18-alpine3.16 AS builder
WORKDIR /srv
RUN apk update && apk add bash
COPY package*.json ./
RUN yarn --check-files
COPY . .
#RUN yarn dev
CMD ["yarn", "dev"]
