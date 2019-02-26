import MqttConnection from '../websocket/mqtt-client';
const uuidv4 = require('uuid/v4');

/**
 * This service Finds the real IP based on a list of potential IP addresses by testing 
 * to connect to each of them & see which we actually can connect to.
 */
class MqttIpFinder {
    /**
     * Constructor
     */
    constructor() {
        console.log('Creating MqttIpFinder');
        this.ipAddressList = [];
        this.actualIpList = [];
        this.mqttSrvPort = 1883;
        this.indexBeingTested = 0;
        this.setActualIpCallback = null;
        this.mqttClient = null;

        this.findActualIp = this.findActualIp.bind(this);
        this.connectToIp = this.connectToIp.bind(this);
        this.mqttConnectionCallback = this.mqttConnectionCallback.bind(this);
        this.connectToNextIp = this.connectToNextIp.bind(this);
    };

    /**
     * Initializes the socket
     * @param {The websocket URL} url
     */
    findActualIp(ipAddressList, mqttSrvPort, setActualIpCallback) {
        this.actualIpList = [];
        this.ipAddressList = ipAddressList;
        this.mqttSrvPort = mqttSrvPort;
        this.setActualIpCallback = setActualIpCallback;
        console.log('Finding the real IP from these options: ' + this.ipAddressList + ', on port: ' + this.mqttSrvPort);

        if (this.ipAddressList.length > 0) {
            this.indexBeingTested = 0;
            this.connectToIp(this.ipAddressList[this.indexBeingTested], this.mqttSrvPort);
        } else {
            console.log('Verified MQTT IP addresses: ' + this.actualIpList);
            this.setActualIpCallback(this.actualIpList);
        }
    };

    connectToIp(ip, port) {
        this.mqttClient = new MqttConnection('IpTester_' + uuidv4());
        this.mqttClient.username = '';
        this.mqttClient.password = '';
        let url = 'mqtt://' + ip + ':' + port;
        this.mqttClient.connectToMqttSrv(url, this.mqttConnectionCallback);

    }

    /**
     * Called when the MQTT srv connection completed (ok or not)
     * @param {If the connection to the MQTT srv succeeded or not} connectionOk 
     */
    mqttConnectionCallback(connectionOk) {
        if (connectionOk) {
            console.log('Connection to MQTT-srv ' + this.ipAddressList[this.indexBeingTested] + ' succeeded');
            this.actualIpList.push(this.ipAddressList[this.indexBeingTested]);
            this.indexBeingTested = this.indexBeingTested + 1;
            this.mqttClient.disconnect(this.connectToNextIp);
        } else {
            console.log('Connection to MQTT-srv ' + this.ipAddressList[this.indexBeingTested] + ' failed');
            this.indexBeingTested = this.indexBeingTested + 1;
            this.connectToNextIp();
        }
    }

    /**
     * Connect to the next IP address or send response
     */
    connectToNextIp() {
        console.log('MQTT connection closed -> verifying next MQTT IP address');
        if (this.indexBeingTested < this.ipAddressList.length) {
            this.connectToIp(this.ipAddressList[this.indexBeingTested], this.mqttSrvPort);
        } else {
            // All IPs tested, return result
            console.log('Verified MQTT IP addresses: ' + this.actualIpList);
            this.setActualIpCallback(this.actualIpList);
        }
    }
}


export default MqttIpFinder;