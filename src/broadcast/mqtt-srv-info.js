import Message from './msg';
import MsgHeader from './msg_header';

/**
 * This message is sent to inform of where the server can be found
 * Header type for this message is 'MqttSrvInfoRequest'
 */
class MqttSrvInfo {

    /**
     * Constructor
     */
    constructor(ip, port, srvType) {
        /**
         * IP of the MQTT Srv
         */
        this.ip = ip;
        /**
         * Port of the MQTT srv
         */
        this.port = port;
        /**
         * What type of server this is.
         * possible values are:
         * - MqttSrv
         * - WebsocketSrv
         */
        this.srvType = srvType;
    };

    /**
     * Creates a message with this object as the payload
     * @param {The unique correlation id of the message [Optional]} correlationId 
     */
    createMessage(correlationId) {
        let msg = new Message();
        let header = new MsgHeader();
        header.type = 'MqttSrvInfo';
        header.correlationId = correlationId;
        msg.header = header;
        msg.payload = this;
        return msg;
    }
}

module.exports = MqttSrvInfo;
