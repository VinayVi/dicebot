ARG NODE_BASE

FROM ${NODE_BASE}

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT npm start