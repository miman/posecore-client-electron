# Posecore API specification
This page describes the API & topic names for communicating with this posecore server.

There are 2 API's for the server
- Broadcast API
- Posecore API

# Broadcast API
The Broadcast API is used to enable clients to connect to the server without manual configuration.

It communicates over broadcast UDP.

## Broadcast flows
### Start server flow
![PoseCore start flow](http://www.plantuml.com/plantuml/png/PL3BJWCn3BplLunwvmTwG9LM7950z0VIx5IDMEB8TdV5tvC7eWTyI69d9ZEJatbGlt-jA6ACeko3wohxDA5MY2wAmzse1mH3E_IBKc4ffXAoup2lYNKFfNHGxEr_s9iOPr7YPMLqbGoZRhyl5rgNx19uUcu37F7H_E2FEGXDQSAeZglm8Ng4CI-ug8Gb1dCehKWsOaz-W-c642FDaF9LHiJLuJSgaQmsoh1y8-GMFMryX1arseU_MN9cTBZWzVryxWgYs7anYPySn6ffcavrhJ_z0m00)

### Start client flow
![PoseCore start flow](http://www.plantuml.com/plantuml/png/PP71QiCm38RlUOgVtlS2FOn2s76miRw0wgYhcMiPIqtOsq_Lp7Qe3Y5A_l_x33weKRVRjQ29SYgPgyMdSv5jck13oQHZTrFkEv3Y_X8_ciTooesgOJT75THQX7v9Zx4tjypI6I-5atMfSDewo8qrbA70q_EWO8yFSmZIdoDIO_MS5-yXhWjENHPAf8QhVaQCYi4kxCwildIcvHjKGSdooiC_OOoZ_irxw63I4ipEsgGgOyjsWVRLAObLaUjP1kFnOBFKoibWWjVtup5wqh7nIILziKNHHTDqyATVnWy0)

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

# Posecore API
The Posecore API is used to distribute pose-info to clients

It communicates over MQTT or websockets.


## Posecore pose event msg
Example message:

```
{
    "type": "POSE_UPDATE",
    "version": 1,
    "sendTime": 1586955667486,
    "payload": {
        "nose": {
            "x": 85.04205027033576,
            "y": 64.4697651318613,
            "z": 0
        },
        "head": null,
        "leftEye": {
            "x": 78.38856172176656,
            "y": 76.05368403002466,
            "z": 0
        },
        "rightEye": {
            "x": 93.89490496108552,
            "y": 74.02164921216074,
            "z": 0
        },
        "leftEar": {
            "x": 68.75890774490375,
            "y": 80.90430263004501,
            "z": 0
        },
        "rightEar": {
            "x": 100,
            "y": 72.92355098526372,
            "z": 0
        },
        "leftShoulder": {
            "x": 56.14421813738251,
            "y": 69.21340335199164,
            "z": 0
        },
        "rightShoulder": {
            "x": 97.80505351734273,
            "y": 39.77812334740452,
            "z": 0
        },
        "leftElbow": {
            "x": 47.54057158015867,
            "y": 16.00249478561244,
            "z": 0
        },
        "rightElbow": {
            "x": 100,
            "y": 0,
            "z": 0
        },
        "leftWrist": {
            "x": 49.63331058143607,
            "y": 0,
            "z": 0
        },
        "rightWrist": {
            "x": 95.30974767392345,
            "y": 2.1088300856752085,
            "z": 0
        },
        "root": null,
        "leftHip": {
            "x": 57.02794592878261,
            "y": 5.140511766849528,
            "z": 0
        },
        "rightHip": {
            "x": 80.94621328114088,
            "y": 0.2277513523827821,
            "z": 0
        },
        "leftKnee": {
            "x": 53.79379790326991,
            "y": 1.0338282337650782,
            "z": 0
        },
        "rightKnee": {
            "x": 69.13462110649205,
            "y": 0.7424545288085938,
            "z": 0
        },
        "leftFoot": {
            "x": 53.644592586548136,
            "y": 0,
            "z": 0
        },
        "rightFoot": {
            "x": 69.68043894696262,
            "y": 0,
            "z": 0
        }
    }
}
```

## Posecore client connected msg
Example connected msg:
```
{
    "clientId":"poseclient-f7e062f7-2cf5-4afa-a548-44293116ab38",
    "srvUrl":"192.168.68.117:1883"
}
```

# MQTT API

## Topic naming structure

### Pose-events
When a new pose is posted it is posted on a topic using the following naming convention:
Topic name: **{PayloadProtocol}/posecore/{ClientId}/{DeviceId}/pose-event/{ApiVersion}**
Example: **json/posecore/local/PosenetClient/pose-event/1**

### Pose server settings
This will post a message with what settings the pose skeleton parser app has
It is posted on a topic using the following naming convention:
Topic name: **{PayloadProtocol}/posecore/{ClientId}/{DeviceId}/pose-settings/{ApiVersion}**
Example: **json/posecore/local/PosenetClient/pose-settings/1**

### Pose client connected
Whenever a client connects to the MQTT broker it posts a message to this topic, using the following naming convention:
Topic name: **{PayloadProtocol}/posecore/{ClientId}/connected/{ApiVersion}**
Example: **json/posecore/client-1/connected/1**

### Topic parts
**DeviceId**: The id of the pose skeleton tracking device sending the pose info
**ClientId**: The Id of the client that should receive the message (unused for now)
**PayloadProtocol**: json for now (planning on going to protobuf)
**ApiVersion**: Version of the payload for the specific service (1 for now)
