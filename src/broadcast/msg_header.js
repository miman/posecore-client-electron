
/**
 * The is the message header
 */
class MsgHeader {
    /**
     * Constructor
     */
    constructor(clientId) {
        this.type = null;
        this.version = 1;
        var d = new Date();
        this.sendTime = d.toISOString();
        this.correlationId = null;
    };
}

module.exports = MsgHeader;
