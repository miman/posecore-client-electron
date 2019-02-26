
/**
 * This message is sent from a client as the first message after it has connected to a Websocket connection to the server.
 */
class ClientConnectedMsg {
    /**
     * Constructor
     * @param {The dispatch function for redux} dispatch 
     */
    constructor(clientId, srvUrl) {
        this.clientId = clientId;
        this.srvUrl = srvUrl;
    };
}

module.exports = ClientConnectedMsg;
