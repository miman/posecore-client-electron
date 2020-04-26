var mosca = require('mosca');
var https = require('https');
var http = require('http');
var fs = require("fs");
var express = require("express");
var path = require("path");

var SECURE_KEY = __dirname + '/../rootCA.key';
var SECURE_CA = __dirname + '/../rootCA.pem';
var SECURE_CERT = __dirname + '/../tls-cert.pem';

/**
 * This is a websocket class that Implements the logic according for thsi connection to the server.
 */
class MoscaMqttServer {
    /**
     * Constructor
     */
    constructor(clientId) {
        this.mqttServer = null;
        this.mqttSettings = null;
        this.connectCallbackFn = null;
        this.httpServ = null;
        this.httpsServ = null;
        this.app = null;

        this.setup = this.setup.bind(this);
        this.clientConnected = this.clientConnected.bind(this);
        this.msgReceived = this.msgReceived.bind(this);
        this.setConnectCallbackFn = this.setConnectCallbackFn.bind(this);
        this.startMqttSrv = this.startMqttSrv.bind(this);
        this.httpHandler = this.httpHandler.bind(this);
    };

    /**
     * This function starts the local Mosca MQTT server
     * @param {If we should expose the mQTT server over a websocket or only over TCP} usingWebsocket 
     */
    startMqttSrv(usingWebsocket) {
        console.log("SECURE_KEY: " + SECURE_KEY);
        if (usingWebsocket) {
            this.mqttSettings = {
                port: 1883
            };
/*            
            this.mqttSettings = {
                http: {
                    port: 8883,
                    bundle: true,
                    static: './'
                },
                secure: {
                    port: 48883,
                    keyPath: SECURE_KEY,
                    certPath: SECURE_CERT
                }
            };*/
        } else {
            this.mqttSettings = {
                port: 1883
            };
        }
        console.log("Starting server with settings: " + JSON.stringify(this.mqttSettings));
        this.mqttServer = new mosca.Server(this.mqttSettings);

        this.mqttServer.on('ready', this.setup);
        this.mqttServer.on('clientConnected', this.clientConnected);
        // fired when a message is received
        this.mqttServer.on('published', this.msgReceived);

        if (usingWebsocket) {
            // We start a secured HTTP server and attach the MQTT server to use this HTTP server to expose it's MQTT interface over websocket
            let httpsSrvPort = 9443;
            let httpSrvPort = 9080;
            let httpsOptions = {
                key: fs.readFileSync(SECURE_KEY),
                cert: fs.readFileSync(SECURE_CERT),
                ca: fs.readFileSync(SECURE_CA)
              };
            this.app = express();
            this.httpsServ = https.createServer(httpsOptions, this.app);
            this.httpServ = http.createServer({}, this.app);
            this.mqttServer.attachHttpServer(this.httpServ);
            this.mqttServer.attachHttpServer(this.httpsServ);

//            this.express.use(express.static(path.dirname(require.resolve("mosca")) + "/public"));
            console.log("__dirname" + __dirname);
            this.app.use(express.static(__dirname + '/..'));
            this.app.get('/ping', (req, res) => {
                res.send('Hello World');
            });

            this.httpsServ.listen(httpsSrvPort, () => {
                var host = this.httpsServ.address().address
                var port = this.httpsServ.address().port
                
                console.log("Embedded HTTPS web srv listening at https://%s:%s", host, port);
            });
            this.httpServ.listen(httpSrvPort, () => {
                var host = this.httpServ.address().address
                var port = this.httpServ.address().port
                
                console.log("Embedded HTTP web srv listening at http://%s:%s", host, port);
            });
        }
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
        // Remarked to better be able to view logs
//        console.log('Msg received: ' + msg.payload);
    }

    test(str) {
        console.log('Test msg: ' + str);
    }

    httpHandler(req, res) {
        console.log('httpHandler called');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Hello World!');
        res.end();
/*        res.writeHead(302, {
            'Location': 'your/404/path.html'
            //add other headers here...
          });
        res.end();*/
      };
}

export default MoscaMqttServer;