 /**--------------------------------------------------------------
 * Author by : Jatizso
 * Date of revision : 05-12-2019 -- 25-02-2020
 * Module Name : Server
 ---------------------------------------------------------------*/

const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const ENV = require('./properties/env')

const gpio = require('onoff').Gpio

//Pin initialization with BCM
global.r1 = new gpio(18, 'out')
global.r2 = new gpio(23, 'out')
global.r3 = new gpio(24, 'out')
global.r4 = new gpio(25, 'out')
global.r5 = new gpio(12, 'out')
global.r6 = new gpio(16, 'out')
global.r7 = new gpio(20, 'out')
global.r8 = new gpio(21, 'out')

//Close all relay switches
r1.writeSync(1)
r2.writeSync(1)
r3.writeSync(1)
r4.writeSync(1)
r5.writeSync(1)
r6.writeSync(1)
r7.writeSync(1)
r8.writeSync(1)


/** Import routes */
const RelayRoute = require('./RelayControllers/Relay.route')

/** Middlewares */
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
app.use(bodyParser.json());
app.use('/api/relays', RelayRoute);

const PORT = ENV.relayPort;

app.get('/', (req,res) => {
    res.json({
        Message : "Please use routes given",
        Routes : {
            relay : "/api/relays"
        }
    })
})

app.listen(PORT, () => console.info(`[INFO] Relay Server started on port ${PORT}`))


