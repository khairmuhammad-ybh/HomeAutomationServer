/**--------------------------------------------------------------
* Author by : Jatizso
* Date of revision : 05-12-2019 -- 14-2-2020 -- 25-02-2020
* Module Name : Relay.service
---------------------------------------------------------------*/

const gpio = require('onoff').Gpio

var relayArray = new Array('false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')

function OnRelay(relay, state, callback) {
    //check if state is a number
    // if (!isNaN(state)) {
        //switch on corrosponding relay
        switch (relay) {
            case '1':
                r1.writeSync(0)
                break;
            case '2':
                r2.writeSync(0)
                break;
            case '3':
                r3.writeSync(0)
                break;
            case '4':
                r4.writeSync(0)
                break;
            case '5':
                r5.writeSync(0)
                break;
            case '6':
                r6.writeSync(0)
                break;
            case '7':
                r7.writeSync(0)
                break;
            case '8':
                r8.writeSync(0)
                break;
        }
        if (relayArray[relay - 1] == state) {
            callback(null, {
                Message: "Relay switch #" + relay + " is already ON"
            })
        } else {
            relayArray[relay - 1] = state
            callback(null, {
                Message: "Relay switch #" + relay + " is ON"
            })
        }
    // } else {
    //     callback(true, {
    //         Message: "Something went wrong in Relay.service.js related to relay #" + relay
    //     })
    // }
}

function OffRelay(relay, state, callback) {
    //check if state is a number
    // if (!isNaN(state)) {
        //switch on corrosponding relay
        switch (relay) {
            case '1':
                r1.writeSync(1)
                break;
            case '2':
                r2.writeSync(1)
                break;
            case '3':
                r3.writeSync(1)
                break;
            case '4':
                r4.writeSync(1)
                break;
            case '5':
                r5.writeSync(1)
                break;
            case '6':
                r6.writeSync(1)
                break;
            case '7':
                r7.writeSync(1)
                break;
            case '8':
                r8.writeSync(1)
                break;
        }
        if (relayArray[relay - 1] == state) {
            callback(null, {
                Message: "Relay switch #" + relay + " is already OFF"
            })
        } else {
            relayArray[relay - 1] = state
            callback(null, {
                Message: "Relay switch #" + relay + " is OFF"
            })
        }

    // } else {
    //     callback(true, {
    //         Message: "Something went wrong in Relay.service.js related to relay #" + relay
    //     })
    // }
}

function OnAllRelays(callback) {
    r1.writeSync(0)
    r2.writeSync(0)
    r3.writeSync(0)
    r4.writeSync(0)
    r5.writeSync(0)
    r6.writeSync(0)
    r7.writeSync(0)
    r8.writeSync(0)

    //update array
    for (let i = 0; i < relayArray.length; i++) {
        relayArray[i] = 'true'
    }

    callback(null, {
        Message: "Relay #1 - #8 switch ON"
    })
}

function OffAllRelays(callback) {
    r1.writeSync(1)
    r2.writeSync(1)
    r3.writeSync(1)
    r4.writeSync(1)
    r5.writeSync(1)
    r6.writeSync(1)
    r7.writeSync(1)
    r8.writeSync(1)

    //update array
    for (let i = 0; i < relayArray.length; i++) {
        relayArray[i] = 'false'
    }

    callback(null, {
        Message: "Relay #1 - #8 switch OFF"
    })
}

function CheckStatus(callback) {

    var statusObj = {}

    for (let i = 0; i < relayArray.length; i++) {
        if (relayArray[i] == "true") {
            statusObj[(i + 1)] = true
        } else {
            statusObj[(i + 1)] = false
        }
    }

    callback(null, {
        Message: "Relay switches status",
        Relays: statusObj
    })
}

function CheckConnection(callback) {
    callback(null, {
        Message: "200 (OK)",
    })
}

function RelayState(relayArr, dataArr, callback) {
    if(Array.isArray(dataArr) && dataArr.length){

        var statusObj = {}

        for (let i = 0; i < relayArr.length; i++) {
            if (dataArr[i] == "true") {
                switch (relayArr[i]) {
                    case '1':
                        r1.writeSync(0)
                        break;
                    case '2':
                        r2.writeSync(0)
                        break;
                    case '3':
                        r3.writeSync(0)
                        break;
                    case '4':
                        r4.writeSync(0)
                        break;
                    case '5':
                        r5.writeSync(0)
                        break;
                    case '6':
                        r6.writeSync(0)
                        break;
                    case '7':
                        r7.writeSync(0)
                        break;
                    case '8':
                        r8.writeSync(0)
                        break;
                        
                }

                relayArray[relayArr[i] - 1] = 'true'
                statusObj[(i + 1)] = true
            } else {
                switch (relayArr[i]) {
                    case '1':
                        r1.writeSync(1)
                        break;
                    case '2':
                        r2.writeSync(1)
                        break;
                    case '3':
                        r3.writeSync(1)
                        break;
                    case '4':
                        r4.writeSync(1)
                        break;
                    case '5':
                        r5.writeSync(1)
                        break;
                    case '6':
                        r6.writeSync(1)
                        break;
                    case '7':
                        r7.writeSync(1)
                        break;
                    case '8':
                        r8.writeSync(1)
                        break;
                }
                
                relayArray[relayArr[i] - 1] = 'false'
                statusObj[(i + 1)] = false
            }
        }


        callback(null, {
            Relays: statusObj,
        })
    }else{
        callback({err: "data is empty"}, {
            message: dataArr,
        })
    }
    
}

exports.OnRelay = OnRelay
exports.OffRelay = OffRelay
exports.OnAllRelays = OnAllRelays
exports.OffAllRelays = OffAllRelays
exports.CheckStatus = CheckStatus
exports.CheckConnection = CheckConnection
exports.RelayState = RelayState