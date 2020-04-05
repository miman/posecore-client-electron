import Message from './msg';
import MsgHeader from './msg_header';

/**
 * This is the unique service name for the MqttSrvInfoRequest, this should be set as the type for the message
 */
export const mqttSrvInfoReqTypeStr = 'MqttSrvInfoRequest';

/**
 * This message is sent from a client as the first message after it has connected to a Websocket connection to the server.
 * type for this message is 'MqttSrvInfoRequest'
 */
class MqttSrvInfoRequest {

    /**
     * Constructor
     */
    constructor() {
        /**
         * IP of the requestor
         */
        this.ip = null;
        /**
         * The name of the client
         */
        this.clientName = "";
    };

    /**
     * Creates a message with this object as the payload
     * @param {The unique correlation id of the message [Optional]} correlationId 
     */
    createMessage(correlationId) {
        let msg = new Message();
        let header = new MsgHeader();
        header.type = mqttSrvInfoReqTypeStr;
        header.correlationId = correlationId;
        msg.header = header;
        msg.payload = this;
        return msg;
    }
}

export default MqttSrvInfoRequest;
