const StopSleep = require('./models/StopSleep.js');

const device = new StopSleep((qwe)=>{console.log(qwe)});
device.turnOn();

setInterval(() => {
    console.log("Последнее измерение КГР: " + device.lastKGR);
    console.log(`Заряд баттареи: ${Math.round(device.batteryCharge)}%`);
    console.log(`Оставшееся время работы: ${Math.round(device.batteryTime)} минут\n\n`);
}, 3000);
