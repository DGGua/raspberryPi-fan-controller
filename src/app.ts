import { readFileSync } from "fs";
import { Gpio } from "onoff"

// BCM code 
const ledOut = new Gpio(14, 'out');
let on = false;
setInterval(() => {
    let tempStr = readFileSync("/sys/class/thermal/thermal_zone0/temp").toString()
    const temp = Number.parseInt(tempStr) / 1000;
    console.log(temp)
    if (temp > 55 && !on) {
        on = true
        console.log("on")
    }
    if (temp < 50 && on) {
        on = false
        console.log("off")
    }
    ledOut.writeSync(on ? 0 : 1)
}, 1000
)
// current LED 
