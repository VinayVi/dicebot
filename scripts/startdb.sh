#!/bin/bash

port=$(cat db.config.json | jq '.port')
dataDir=$(cat db.config.json | jq '.dataDir')
password=$(cat db.config.json | jq '.password')

docker run --rm --name postgres -p $port:5432 -v $dataDir:/var/lib/postgresql/data -e POSTGRES_PASSWORD=$password -d postgres:13-alpine
