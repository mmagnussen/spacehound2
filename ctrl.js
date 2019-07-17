#!/usr/bin/env node

const path = require("path");
const spacehound = require('./spacehound');
const spacehound_html = spacehound()

const reporter = require("daemonize2").setup({
    main: './server.js',
    name: 'Spacehound',
    argv: spacehound_html,
    pidfile: path.join(__dirname, "path.pid"),
    stopTimeout: 10000
});

if (reporter.status() !== 0) {
    reporter.kill(() => reporter.start());
} else {
    reporter.start();
}
