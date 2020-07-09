const { randomString, newKGR, randomInteger } = require("../utils");
const bluetooth = require('node-bluetooth');

class StopSleep {
    constructor() {
        this.journal = [];
        this.id = randomString(10);
        this.batteryCharge = 100;
        this.batteryTime = 300;
        this.lastKGR = randomInteger(200, 500);
    }

    checkNotification() {
        if (this.batteryCharge <= 50) {
            this.socket.emit('notification', {deviceId: this.id, signal: 4, value: this.batteryCharge});
        }
        if (this.lastKGR < this.journal[this.journal.length - 1] && this.journal[this.journal.length - 1] < this.journal[this.journal.length - 2]) {
            this.socket.emit('notification', {deviceId: this.id, signal: 2, value: this.lastKGR});
        }
        if (this.journal.length > 1) {
            this.journal.splice(0, 2);
        }
        if (this.lastKGR < 200) {
            this.socket.emit('notification', {deviceId: this.id, signal: 3, value: this.lastKGR});
        }
    }

    turnOn() {
        this.runId = setInterval(() => {
            this.journal.push(this.lastKGR);
            this.lastKGR = newKGR(this.lastKGR);
            this.batteryCharge -= 0.05;
            this.batteryTime -= 0.15;
            this.checkNotification();
        }, 3000);
        this.socket.emit('notification', {deviceId: this.id, signal: 0, value: this.batteryCharge});
    }
    turnOff() {
        clearInterval(this.runId);
        this.socket.emit('notification', {deviceId: this.id, signal: 5, value: this.batteryCharge});
    }

    connect(socket) {
        this.socket = socket;
    }

    disconnect() {
        this.socket = null;
    }
}

module.exports = StopSleep;
