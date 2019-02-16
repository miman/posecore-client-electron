import Message from './msg';
import MsgHeader from './msg_header';

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
        this.ip = null; // IP of the requestor
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
