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
![PoseCore overview](http://www.plantuml.com/plantuml/png/RP7FJiCm3CRlVWfh9pZq1H27YS4HDBHnGvhIr4mJJL9iRmoXlJlkdsn1Maxfvv_Zhv_deevr7rhiaf1FJ02B5BeKAIhEbYOkJ4JVxaouaTiPEfc-Ih2_xfKOlwdsBX2x4Hok9VXqD2gw5klK_E1xL7R-SnUtA1GbSPv0HzsC2a1C3HLMLiG7ue7gIF0Nq4vdhxXjYVaK0WeVHj1di3-5dUVNzHfN4nM-L3VMSWryuEGQxqHHBlFhB9wxJb3qvGHVIAVV6ysOD3IS0F98lA-gIs7C5qtAzJlidHQ5ShHLtnwNUBO8-I43ymgWZw1gwKEhV-7EAJQs_Zy0)

### Interfaces to the PoseCore server
![PoseCore overview](http://www.plantuml.com/plantuml/png/TT6nJiCm40RW_PxYr0c6I4Nj439LX845AIXcguJSv2Gg6f_n7M50l3l6XM12oPRVNox_oHjH6_HbEA1deOu35TRl1Q3cmRCZfxXeuaaTJx0xx6Dm9kSBjFBr1k2ufmor54OAINWIV0ECJpRjAh3jEokAyYDtt-63X77-nOqn3RPXJF9HrPy2xIyXSt9xPymaXcSz_kWTuBW55iMKLfWmnswuTQPkgekoN6KmBnlr_NM3qrBPm5Ga6xPr-4exuUw9jBfSbiiPbN_jUhs2J_6tPOhbHBuXryTR_G00)

### Pose event flow
This is the flow for each pose noticied by the framework
![Pose event flow](http://www.plantuml.com/plantuml/png/bP71QlCm48JlVeeXz_y5VFW9X1vRMXBefL1aUHkBo9AgNJlDsnUjOd2JNkgBPU_ipBUhBOl9CeqUAJBHJ44-V3mt3G0OAp5ZCp7b3GoZ7BIGJ1PdNJ91iDcPaR9HWTNZlUGvCe4fpzL8izuvp_VAnvV30Viygspy5FbTjlEEWi2aL7FrKw4L4l_-NrdGel91ih6drGorNfGBJOl2-KG2eS0nbqN0kmvl0JtPs5Dj1v_8ayIWFaltJwU7hv8da87qByvE1WpkE10BKewTwPntSgcBzWATt6b23yE5Dt2AMU3DvSfycxSi28ekoW-zH8nyh2rgho2PYhyHU38iY85WhBYPblrXzLJh6bFBxThUCTB40_LbEHB1KySskyw5uwqRXRvPlPNcbJgEzaJoruchDrhiAVGtyqBYAblpcYs5VXhzDm00)

ps.
image links for diagrams created using the PlantUml onlie editor [here](http://www.plantuml.com/plantuml/uml/SoWkIImgAStDuShBJqbLA4ajBk5oICrB0Oe00000)
ds.

# API
A page describing the API of communicating with this server can be found [here](api.md)


# Build & run
A page describing howto run and build this project can be found [here](operation.md)

# Binary & example games can be found here:
The binary for this server & example games using the Posecore server can be found here:
https://sites.google.com/view/posecore/startsida

# Webcast tutorial
Below is a link to a webcast tutorial on how to create a Unity application using the PoseCore server to get body tracking data:
https://youtu.be/OZMrnhCYjgI
