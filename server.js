#!/usr/bin/env node

const port = 8081;
const open = require('open');
const express = require('express');
const app = express();

console.log(process.argv[1]);

app.get('/', function (request, result) {
    result.send(process.argv[1])
});

module.exports = app;

app.listen(port);

//open(('localhost:' + port), { wait: false });

