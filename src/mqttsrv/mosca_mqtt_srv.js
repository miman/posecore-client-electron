var mosca = require('mosca');

var settings = {
    port: 1883
};

/**
 * This is a websocket class that Implements the logic according for thsi connection to the server.
 */
class MoscaMqttServer {
    /**
     * Constructor
     */
    constructor(clientId) {
        this.mqttServer = null;
        this.connectCallbackFn = null;

        this.setup = this.setup.bind(this);
        this.clientConnected = this.clientConnected.bind(this);
        this.msgReceived = this.msgReceived.bind(this);
        this.setConnectCallbackFn = this.setConnectCallbackFn.bind(this);
        this.startMqttSrv = this.startMqttSrv.bind(this);
    };

    startMqttSrv() {
        this.mqttServer = new mosca.Server(settings);

        this.mqttServer.on('ready', this.setup);
        this.mqttServer.on('clientConnected', this.clientConnected);
        // fired when a message is received
        this.mqttServer.on('published', this.msgReceived);
    }

    setConnectCallbackFn(callback) {
        this.connectCallbackFn = callback;
    }

    // fired when the mqtt server is ready
    setup() {
        console.log('Mosca server is up and running');
        if (this.connectCallbackFn !== null) {
            this.connectCallbackFn();
        }
    }

    clientConnected(client) {
        console.log('client connected', client.id);
    }

    msgReceived(msg, client) {
//        console.log('Msg received: ' + msg.payload);
    }

    test(str) {
        console.log('Test msg: ' + str);
    }
}

export default MoscaMqttServer;