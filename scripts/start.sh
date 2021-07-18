#!/bin/bash

if [ ! -d "./client/node_modules" ]; then 
    cd ./client && npm install && cd ../
fi
node ./server.js