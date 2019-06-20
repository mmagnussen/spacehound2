#!/usr/bin/env node

const path = require("path");
//const spacehound = require('./spacehound');
//const sendMsg = spacehound();
const reporter = require("daemonize2").setup({
    main: './server.js',
    name: 'Spacehound',
    pidfile: path.join(__dirname, "path.pid"),
    silent: false
});

// process.on('unhandledRejection', err => { console.log(err) });

if (reporter.status() !== 0) {
    reporter.kill(() => reporter.start());
} else {
    reporter.start();
}



