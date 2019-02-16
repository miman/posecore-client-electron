// Require dgram module.
var dgram = require('dgram');
var dns = require('dns');
var os = require('os');

import {
    mqttSrvInfoReqTypeStr
} from './mqtt-srv-info-request';
import MqttSrvInfoRequest from './mqtt-srv-info-request';
import MqttSrvInfo from './mqtt-srv-info';


/**
 * This service will listen to a broadcast port (45458) for incoming service requests.
 * It will also broadcast connection info at startup & when requested (on port 45459).
 */
class BroadcastService {
    /**
     * Constructor
     */
    constructor() {
        console.log('Creating BroadcastService');
        this.server = dgram.createSocket("udp4");
        this.client = dgram.createSocket("udp4");
        this.ipaddress = "?";
        this.serviceRequestPort = 45458;
        this.infoSendPort = 45459;
        this.correlationId = 1;
        this.sendSrvSettingTimer = null;

        this.initialize = this.initialize.bind(this);
        this.handleReceivedMsg = this.handleReceivedMsg.bind(this);
        this.onServerListening = this.onServerListening.bind(this);
        this.broadcastSrvSettings = this.broadcastSrvSettings.bind(this);
        this.retrieveLocalIp = this.retrieveLocalIp.bind(this);
        this.broadcastMessage = this.broadcastMessage.bind(this);
        this.handleInterfaceResult = this.handleInterfaceResult.bind(this);

        this.tmpSendReq = this.tmpSendReq.bind(this);
    };

    /**
     * Initializes the socket
     * @param {The websocket URL} url
     */
    initialize(serviceRequestPort, infoSendPort) {
        this.serviceRequestPort = serviceRequestPort;
        this.infoSendPort = infoSendPort;
        console.log('Initializing UDP broadcast service (serviceRequestPort: ' + this.serviceRequestPort + ', infoSendPort: ' + this.infoSendPort + ')');
        this.retrieveLocalIp();
        // Make udp server listen on server port.
        this.server.bind(this.serviceRequestPort);

        // When udp server receive message.
        this.server.on("message", this.handleReceivedMsg);
        // When udp server started and listening.
        this.server.on('listening', this.onServerListening);

        // Broadcast the server settings after 100 ms
        this.sendSrvSettingTimer = setTimeout(this.broadcastSrvSettings, 1000, 'started');

        setTimeout(this.tmpSendReq, 5000, 'request');
    };

    /**
     * Handle received message
     * @param {the received message (Message with payload as MqttSrvInfoRequest)} message
     */
    handleReceivedMsg(message) {
        console.log("> handleReceivedMsg");
        // Create output message.
        var output = "Udp server receive message : " + message + "\n";
        // Print received message in stdout, here is log console.
        console.log(output);
        let msgObj = JSON.parse(message);
        if (msgObj.header.type === mqttSrvInfoReqTypeStr) {
            // This is a srv info request -> broadcast srv info
            let currentTime = new Date();
            let clientTime = new Date(msgObj.header.sendTime);
            let timeDiff = currentTime.getTime() - clientTime.getTime();
            this.broadcastSrvSettings();
            console.log('srv info request ping time: ' + timeDiff + " ms");
        } else {
            var output = "Unknown msg type received: " + msgObj.header.type + ", waiting for: " + mqttSrvInfoReqTypeStr;
            console.log(output);
        }
    }


    /**
     * This function retrieves the local IP address of this machine we are running on.
     */
    retrieveLocalIp() {
        console.log('> retrieveLocalIp');
        var ifaces = os.networkInterfaces();

//        console.log("ifaces : " + JSON.stringify(ifaces));
        let keys = Object.keys(ifaces);
        for (var i = 0; i < keys.length; i++) {
            let ifname = keys[i];
            let alias = 0;
//            console.log("ifname : " + ifname);
            let ifacesForName = ifaces[ifname];
            if (ifacesForName !== undefined) {
                for (var j = 0; j < ifacesForName.length; j++) {
                    let iface = ifacesForName[j];
//                    console.log("iface : " + JSON.stringify(iface));
                    this.handleInterfaceResult(iface, ifname, alias)
                }
            }
            alias = alias + 1;
        }
    }

    /**
     * This function is called when the IP address has been retrieved (async function)
     */
    handleInterfaceResult(iface, ifname, alias) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + '[' + alias + '] : ' + iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname + " : " + iface.address);
        }
        if ('Local Area Connection' === ifname) {
            this.ipaddress = iface.address;
            console.log('Local IP found: ' + this.ipaddress);
        }
    }

    /**
     * called when the UDP server connection is established
     */
    onServerListening() {
        console.log('UDP Server started and listening');
        // Get and print udp server listening ip address and port number in log console. 
        var address = this.server.address();
        console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
    }

    /**
     * Broadcast server info to all clients (IP address & port)
     * @param {*} arg 
     */
    broadcastSrvSettings(arg) {
        console.log('> broadcastSrvSettings');
        let mqttSrvInfo = new MqttSrvInfo(this.ipaddress, this.serviceRequestPort, 'MqttSrv');
        let msg = mqttSrvInfo.createMessage(this.correlationId);
        this.correlationId = this.correlationId + 1;
        let message = JSON.stringify(msg);
        this.broadcastMessage(message);
        this.sendSrvSettingTimer = null;
        console.log('< broadcastSrvSettings');
    }

    /**
     * Broadcast the received text
     * @param {Text to send} message 
     */
    broadcastMessage(message) {
        this.client.send(message, 0, message.length, this.infoSendPort, "localhost");
    }

    /**
     * Remove this after test
     */
    tmpSendReq() {
        console.log('> tmpSendReq');
        let mqttSrvInfo = new MqttSrvInfoRequest();
        let msg = mqttSrvInfo.createMessage('1234');
        let message = JSON.stringify(msg);
        console.log('tmpSendReq, sending: ' + message);
        this.client.send(message, 0, message.length, this.serviceRequestPort, "localhost");
        //        this.client.send(message, 0, message.length, this.clientPort, "localhost");
        console.log('< tmpSendReq');
    }
}


export default BroadcastService;