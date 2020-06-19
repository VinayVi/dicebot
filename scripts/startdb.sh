#!/bin/bash

port=$(cat db.config.json | jq -r '.port')
dataDir=$(cat db.config.json | jq -r '.dataDir')
password=$(cat db.config.json | jq -r '.password')
db=$(cat db.config.json | jq -r '.database')

docker run --rm --name postgres -p $port:5432 -v $dataDir:/var/lib/postgresql/data -e POSTGRES_PASSWORD=$password -e POSTGRES_DB=$db -d postgres:13-alpine
