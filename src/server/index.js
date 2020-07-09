const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const StopSleep = require('../models/StopSleep')
const bodyParser = require('body-parser');
const {randomInteger} = require("../utils");

const stopSleepDevice = new StopSleep();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

    if (req.query.turnOn) {
        stopSleepDevice.notify(0, randomInteger(0, 100));
    }
    if (req.query.turnOff) {
        stopSleepDevice.notify(5, randomInteger(0, 100));
    }
    if (req.query.alarm) {
        stopSleepDevice.notify(2, randomInteger(30, 1000));
    }
    if (req.query.attention) {
        stopSleepDevice.notify(3, randomInteger(30, 1000));
    }
});

io.on('connection', (socket) => {
    stopSleepDevice.connect(socket);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
