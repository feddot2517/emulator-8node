const { randomString, newKGR, randomInteger } = require("../utils");

class StopSleep {
    constructor() {
        this.id = randomString(10);
    }

    notify(signal, value) {
        this.socket.emit('message', {deviceId: this.id, signal, value});
    }

    connect(socket) {
        this.socket = socket;
    }

    disconnect() {
        this.socket = null;
    }
}

module.exports = StopSleep;
