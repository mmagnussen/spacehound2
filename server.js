#!/usr/bin/env node

const port = 8081;
const open = require('open');
const express = require('express');
const app = express();

const spacehound_html = process.argv.slice(2, -1).join(' ')

app.get('/', function (request, result) {
    result.send(spacehound_html)
})

app.listen(port);

open('http://localhost:' + port)

