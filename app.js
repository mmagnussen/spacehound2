const express = require('express');
const app = express();

const spacehound = require('./spacehound');

app.get('/', function (request, result) {
    result.send(sendMsg = spacehound())
});


module.exports = app;  