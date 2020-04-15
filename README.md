# posenet-client-electron

## What is this
This application uses the brilliant work by the [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) project, and adds a communication layer on top of this to route the poses to external clients so they can use the pose information.
Ex games, remote presence apps...

## Description of this application/project
Posenet client native app using electron.

This is an application with an embedded MQTT server that uses the camera to track your poses (skeleton tracking).
These poses are then published on the MQTT server to be consumed by any client.

To simplify configuration the server & clients autoconfigure so the clients automatically finds the server and connects.
This is done over UDP broadcasting.
The server listens to broadcasts requests on the port 45458 and will publish MQTT/webcast information on the brodcast port 45459 whenever a request has been received on the port 45458 or at application startup.

## System overview
![PoseCore overview](http://www.plantuml.com/plantuml/png/RP0z3eCm38Ltdy9YvmATK7_6IbIbSnM2XqeaeOwXGzMxDm524Mecs-_pUueBBugbDorspfDsJ007PpfdoGfcPHYYRX-XoL3vkLmJiUo565zKQsM8rGXE9O1r3SqsfvQqiBDuvM5aElBu1Wnlc-Y91-892ltTyx3bpfUgMfpCK-GVj6Ud6gsyh1thD1mtFW1f6_Fy5pVzD8wIlCEOkHAIqQpUZYKkWP2C8fYEKP1jmgc_)

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

# MQTT API

## Topinc naming structure

### Pose-events
When a new pose is posted it is posted on a topic using the following naming convention:
Topic name: **posetracking/{ClientId}/{DeviceId}/{SessionId}/pose-event**

### Pose server settings
This will post a message with what settings the pose skeleton parser app has
It is posted on a topic using the following naming convention:
Topic name: **posetracking/{ClientId}/{DeviceId}/{SessionId}/pose-settings**

### Topic parts
**DeviceId**: The id of the pose skeleton tracking device sending the pose info
**ClientId**: The Id of the client that should receive the message (unused for now)
**SessionId**: A unique Id for the session this message is part of (unused for now)

# Build & run
A page describing howto run and build this project can be found [here](operation.md)
