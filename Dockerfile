FROM node:12-alpine3.12

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT npm start