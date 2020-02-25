const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const gpio = require('onoff').Gpio

// //Pin Configuration with BCM
const r1 = new gpio(18, 'out')
const r2 = new gpio(23, 'out')
const r3 = new gpio(24, 'out')
const r4 = new gpio(25, 'out')
const r5 = new gpio(12, 'out')
const r6 = new gpio(16, 'out')
const r7 = new gpio(20, 'out')
const r8 = new gpio(21, 'out')

// const r1 = new gpio(18)
// const r2 = new gpio(23)
// const r3 = new gpio(24)
// const r4 = new gpio(25)
// const r5 = new gpio(12)
// const r6 = new gpio(16)
// const r7 = new gpio(20)
// const r8 = new gpio(21)

r1.write(1)
r2.write(1)
r3.write(1)
r4.write(1)
r5.write(1)
r6.write(1)
r7.write(1)
r8.write(1)

app.get('/', (req, res) => res.send('Hello World!'))


app.get('/relay', (req, res) => {
    var body = req.query
    var relaySwitch = body.relay
    var relayState = body.state

    if(relayState == 1){
        if(relaySwitch != 0)
            onRelay(relaySwitch, relayState)
    }else{
        offRelay(relaySwitch, relayState)
    }
    res.send(relaySwitch + ' ' + relayState);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//On Relay function
const onRelay = (relay, state) => {
    console.log("ON")
    console.log("Relay: " + relay, " State: " + state)

    switch(relay){
        case '1':
            r1.writeSync(0)
            break
        case '2':
            r2.writeSync(0)
            break
        case '3':
            r3.writeSync(0)
            break
        case '4':
            r4.writeSync(0)
            break
        case '5':
            r5.writeSync(0)
            break
        case '6':
            r6.writeSync(0)
            break
        case '7':
            r7.writeSync(0)
            break
        case '8':
            r8.writeSync(0)
            break
    }
}

//Off Relay function
const offRelay = (relay, state) => {
    console.log("OFF")
    console.log("Relay: " + relay, " State: " + state)

    switch(relay){
        case '1':
            r1.writeSync(1)
            break
        case '2':
            r2.writeSync(1)
            break
        case '3':
            r3.writeSync(1)
            break
        case '4':
            r4.writeSync(1)
            break
        case '5':
            r5.writeSync(1)
            break
        case '6':
            r6.writeSync(1)
            break
        case '7':
            r7.writeSync(1)
            break
        case '8':
            r8.writeSync(1)
            break
    }
}

// Handle Ctrl+C exit cleanly 
process.on('SIGINT', () => {
    allLightsOff()
    process.exit()
})

const allLightsOff = () => {
    r1.writeSync(1)
    r2.writeSync(1)
    r3.writeSync(1)
}