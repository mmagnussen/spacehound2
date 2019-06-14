#!/usr/bin/env node

const path = require("path");

const reporter = require("daemonize3").Runner({
    main: './server.js',
    name: 'Spacehound',
    cwd: process.cwd(),
    pidfile: path.join(__dirname, "path.pid"),

});


// if there's a stylecheck server already running, stop it, then restart

if (reporter.getStatus() !== 0) {
    reporter.stop();
    reporter.startDaemon();
} else {
    reporter.startDaemon();
}


