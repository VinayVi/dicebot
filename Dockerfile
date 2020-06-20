FROM node:12-alpine3.12

WORKDIR /app

COPY . .

CMD npm install

ENTRYPOINT npm start