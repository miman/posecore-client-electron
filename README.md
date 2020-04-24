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


### Pose event flow
This is the flow for each pose noticied by the framework
![Pose event flow](http://www.plantuml.com/plantuml/png/bP71QlCm48JlVeeXz_y5VFW9X1vRMXBefL1aUHkBo9AgNJlDsnUjOd2JNkgBPU_ipBUhBOl9CeqUAJBHJ44-V3mt3G0OAp5ZCp7b3GoZ7BIGJ1PdNJ91iDcPaR9HWTNZlUGvCe4fpzL8izuvp_VAnvV30Viygspy5FbTjlEEWi2aL7FrKw4L4l_-NrdGel91ih6drGorNfGBJOl2-KG2eS0nbqN0kmvl0JtPs5Dj1v_8ayIWFaltJwU7hv8da87qByvE1WpkE10BKewTwPntSgcBzWATt6b23yE5Dt2AMU3DvSfycxSi28ekoW-zH8nyh2rgho2PYhyHU38iY85WhBYPblrXzLJh6bFBxThUCTB40_LbEHB1KySskyw5uwqRXRvPlPNcbJgEzaJoruchDrhiAVGtyqBYAblpcYs5VXhzDm00)

# API
A page describing the API of communicating with this server can be found [here](api.md)


# Build & run
A page describing howto run and build this project can be found [here](operation.md)

# Binary & example games can be found here:
The binary for this server & example games using the Posecore server can be found here:
https://sites.google.com/view/posecore/startsida

