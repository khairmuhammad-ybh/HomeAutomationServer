# HomeAutomationServer
 Home automation server to control 8 channel relay with rpi3

### Prerequisites
* Raspbery pi 3
* 8 Channels relay
* [NodeJS](https://nodejs.org/en/)
* npm/npx
* pm2
* git

## Setup
Make sure you had already install nodejs, npm, git and pm2 before doing git clone

Git clone
```
git clone https://github.com/khairmuhammad-ybh/HomeAutomationServer.git
```
Go into `HomeAutomationServer` directory and install all dependencies
```
npm install
```

## Run server with pm2
Run this command and it will generate the path to be copied and run in terminal
```
pm2 startup
```
Once path is set, start the server by running this command and
```
pm2 start server.js --name "HomeAutomationServer" --watch
```
To make the server run on boot, run this command
```
pm2 save
```

## Test server on boot
Reboot your system and checked to make sure the server runs on boot everytime
```
sudo reboot
```
```
pm2 list
```

## Development / Extra
- [x] [Client application with *React native*](https://github.com/khairmuhammad-ybh/HomeAutomation)

## Troubleshooting / FAQ
Please note that for `onoff` package, you require a list of python scripts to be install in your system, but no python setup required if you using raspberry pi.
