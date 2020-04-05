# posenet-client-electron

## What is this
This application uses the brilliant work by the [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) project, and adds a communication layer on top of this to route the poses to external clients so they can use the pose information.
Ex games, remote presence apps...

## Description of this application/project
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

### Start server flow
![PoseCore start flow](http://www.plantuml.com/plantuml/png/PL3BJWCn3BplLunwvmTwG9LM7950z0VIx5IDMEB8TdV5tvC7eWTyI69d9ZEJatbGlt-jA6ACeko3wohxDA5MY2wAmzse1mH3E_IBKc4ffXAoup2lYNKFfNHGxEr_s9iOPr7YPMLqbGoZRhyl5rgNx19uUcu37F7H_E2FEGXDQSAeZglm8Ng4CI-ug8Gb1dCehKWsOaz-W-c642FDaF9LHiJLuJSgaQmsoh1y8-GMFMryX1arseU_MN9cTBZWzVryxWgYs7anYPySn6ffcavrhJ_z0m00)

### Start client flow
![PoseCore start flow](http://www.plantuml.com/plantuml/png/PP71QiCm38RlUOgVtlS2FOn2s76miRw0wgYhcMiPIqtOsq_Lp7Qe3Y5A_l_x33weKRVRjQ29SYgPgyMdSv5jck13oQHZTrFkEv3Y_X8_ciTooesgOJT75THQX7v9Zx4tjypI6I-5atMfSDewo8qrbA70q_EWO8yFSmZIdoDIO_MS5-yXhWjENHPAf8QhVaQCYi4kxCwildIcvHjKGSdooiC_OOoZ_irxw63I4ipEsgGgOyjsWVRLAObLaUjP1kFnOBFKoibWWjVtup5wqh7nIILziKNHHTDqyATVnWy0)

### Pose event flow
This is the flow for each pose noticied by the framework
![Pose event flow](http://www.plantuml.com/plantuml/png/bP71QlCm48JlVeeXz_y5VFW9X1vRMXBefL1aUHkBo9AgNJlDsnUjOd2JNkgBPU_ipBUhBOl9CeqUAJBHJ44-V3mt3G0OAp5ZCp7b3GoZ7BIGJ1PdNJ91iDcPaR9HWTNZlUGvCe4fpzL8izuvp_VAnvV30Viygspy5FbTjlEEWi2aL7FrKw4L4l_-NrdGel91ih6drGorNfGBJOl2-KG2eS0nbqN0kmvl0JtPs5Dj1v_8ayIWFaltJwU7hv8da87qByvE1WpkE10BKewTwPntSgcBzWATt6b23yE5Dt2AMU3DvSfycxSi28ekoW-zH8nyh2rgho2PYhyHU38iY85WhBYPblrXzLJh6bFBxThUCTB40_LbEHB1KySskyw5uwqRXRvPlPNcbJgEzaJoruchDrhiAVGtyqBYAblpcYs5VXhzDm00)

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
