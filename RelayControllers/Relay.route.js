 /**--------------------------------------------------------------
 * Author by : Muhammad Khairi A.K.A Jatizso
 * Date of revision : 05-12-2019 -- 14-2-2020
 * Module Name : Relay.route
 ---------------------------------------------------------------*/

const express = require('express')
const router = express.Router()
const Service = require('./Relay.service')

router.get('/', (req,res) => {
    res.json({
        Message : "Use post to send command to 'Relay Switches'",
        Method : "POST",
        Params : "switch, state"
    })
})

router.post('/', (req, res) => {
    //get query value
    var body = req.body
    var relay = body.switch
    var state = body.state

    if(relay != undefined && state != undefined){
        //Check for valid range of relay
        if(relay >= 1 && relay <= 8){
            if(state == 'true'){
                Service.OnRelay(relay, state, (err, payload) => {
                    if(err){
                        res.json({Success: false, payload: payload})
                    }else{
                        res.json({success: true, payload: payload})
                    }
                })
            }else if(state == 'false'){
                Service.OffRelay(relay, state, (err, payload) => {
                    if(err){
                        res.json({Success: false, payload: payload})
                    }else{
                        res.json({success: true, payload: payload})
                    }
                })
            }else{
                res.json({success: false, payload: {
                    body: body,
                    Message: "Either relay or state is undefined or invalid",
                    Params: "[Relay: " + relay + " state: " + state + "]",
                    Rectifyer: "Relay(1-8), state (1/0)-(1 - ON, 2 - OFF)"
                }})
            }
        }else{
            res.json({success: false, payload: {
                body: body,
                Message: "Either relay or state is undefined or invalid",
                Params: "[Relay: " + relay + " state: " + state + "]",
                Rectifyer: "Relay(1-8), state (1/0)-(1 - ON, 2 - OFF)"
            }})
        }
        
    }else{
        //Default
        res.json({success: false, payload: {
            Message: "Either relay or state is undefined or invalid",
            Params: "[Relay: " + relay + " state: " + state + "]",
            Rectifyer: "Relay(1-8), state (1/0)-(1 - ON, 2 - OFF)"
        }})
    }
})

router.post('/Onallrelay', (req, res) => {
    Service.OnAllRelays((err, payload) => {
        if(err){
            res.json({success: false, payload: err})
        }else{
            res.json({success: true, payload: payload})
        }
    })
})

router.post('/Offallrelay', (req, res) => {
    Service.OffAllRelays((err, payload) => {
        if(err){
            res.json({success: false, payload: err})
        }else{
            res.json({success: true, payload: payload})
        }
    })
})

router.get('/checkStatus', (req,res) =>{
    Service.CheckStatus((err, payload) => {
        if(err){
            res.json({success: false, payload: err})
        }else{
            res.json({success: true, payload: payload})
        }
    })
})

router.get('/checkConnection', (req, res) => {
    Service.CheckConnection((err, payload) => {
        if(err){
            res.json({success: false, payload: err})
        }else{
            res.json({success: true, payload: payload})
        }
    })
})

router.post('/relayState', (req, res) => {
    //get query value
    var relayStateObj = req.body
    // Tranform data into array [relayArr, dataArr]
    const relayArr = Object.keys(relayStateObj);
    const dataArr = Object.keys(relayStateObj).reduce(
      (arr, key) => arr.concat(relayStateObj[key]),
      [],
    );

    Service.RelayState(relayArr, dataArr, (err, payload) => {
        if(err){
            res.json({success: false, payload: err})
        }else{
            res.json({success: true, payload: payload})
        }
    })
    
})

module.exports = router;