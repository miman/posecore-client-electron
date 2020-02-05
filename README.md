# posenet-client-electron

Posenet client native app using electron.

This is an application with an embedded MQTT server that uses the camera to track your poses (skeleton tracking).
These poses are then published on the MQTT server to be consumed by any client.

The server listens to broadcasts requests on the port 45458 and will publish MQTT/wqebcast information on the brodcast port 45459 whenever a request has been received on the port 45458 or at application startup.

The request message should be formatted as:
{
 header: {
     type: 'MqttSrvInfoRequest',
     sendTime: 1234567890 (Unix long time)
 }
}

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
