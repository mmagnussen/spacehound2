#!/usr/bin/env node

const port = 8081;
const open = require('open');
const express = require('express');
const app = express();

app.get('/', function (request, result) {
    result.send(process.argv.slice(2, -1).join(' '))
});

app.listen(port);

(async () => {
  await open(('http://localhost:' + port));
})()

