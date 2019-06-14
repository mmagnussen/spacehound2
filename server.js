#!/usr/bin/env node
/*
'use-strict;'
var http = require('http');
const fs = require('fs');
const html = require('./index.html')
http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
}).listen(8081);


fs.readFile("index.html", function(err, data){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();
  }).listen(8081);

*/

//try importing spacehound...

const app = require('./app');
const port = 8081;
const path = ''
const open = require('open');



//daemonize example from Stylecheck
/*
const pidfile_path = path.join(report_loc, 'server.pid')
serveReport(pidfile_path);
*/
//example code from 'open' npm package

app.listen(port, function () {

    process.emit('daemon_running', 'Spacehound running (quickly) on port ' + port);

});
open(('localhost:' + port), { wait: false });


//open
/*
(async () => {
    await open(('localhost:' + port), { app: 'google chrome' });
})();
*/