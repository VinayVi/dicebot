#!/bin/bash

port=$(cat db.config.json | jq -r '.port')
dataDir=$(cat db.config.json | jq -r '.dataDir')
password=$(cat db.config.json | jq -r '.password')

docker run --rm --name postgres -p $port:5432 -v $dataDir:/var/lib/postgresql/data -e POSTGRES_PASSWORD=$password -d postgres:13-alpine
