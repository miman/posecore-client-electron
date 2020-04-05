# posenet-client-electron

Posenet client native app using electron.

This is an application with an embedded MQTT server that uses the camera to track your poses (skeleton tracking).
These poses are then published on the MQTT server to be consumed by any client.

To simplify configuration the server & clients autoconfigure so the clients automatically finds the server and connects.
This is done over TCP broadcasting.
The server listens to broadcasts requests on the port 45458 and will publish MQTT/webcast information on the brodcast port 45459 whenever a request has been received on the port 45458 or at application startup.

## System overview
![PoseCore overview](http://www.plantuml.com/plantuml/png/RP113u8m38Nl_HKDT-BT4v5uDC78tOpHWmdRi2juCFvtDs18Y3krVL_VorfuKIo3wR1tdhHZ0YYTwPqbAvXLOOYwUuGcG-MNSal4SX1YV56ZbI5M4pYN0DQrjDYSEzB2pkADnudfoUCRCBnzeYSUYMSez7VFuvwxNEjwTJ9FaN_GYPrgjVAoTMpISDhu0AHjpFDVtFpJE4ho4MFcHaX6YrgNrM4DX6GKmNICWcmRJlq5)

ps.
image links for diagrams created using the PlantUml onlie editor [here](http://www.plantuml.com/plantuml/uml/SoWkIImgAStDuShBJqbLA4ajBk5oICrB0Oe00000)
ds.

## Broadcasts msgs
The request message should be formatted as:
Class found @ src/broadcast/mqtt-srv-info-request.js
```
{
 header: {
     type: 'MqttSrvInfoRequest',
     sendTime: 1234567890 (Unix long time)
 }
}
```

The broadcast response:
Class found @ src/broadcast/mqtt-srv-info.js
```
{
 header: {
     type: 'MqttSrvInfoRequest',
     sendTime: 1234567890 (Unix long time)
 },
 payload: {
     ip = "192.168.0.1",
     port = 12345,
     srvType = "MqttSrvInfo"
 }
}
```


# Build & run

## Install dependencies
npm install

## run
npm start

## Build
npm run build

# create distribution packages (exe...)
npm run dist
or 
npm run release (only works on linux right now)

Here we use the library electron-builder.
https://github.com/electron-userland/electron-builder
