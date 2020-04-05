
/**
 * The is the message header
 */
class MsgHeader {
    /**
     * Constructor
     */
    constructor() {
        this.type = null;
        this.version = 1;
        /**
         * sendTime contains info on when this message was created
         */
        this.sendTime = null;
        /**
         * correlationId is the unique id for this communication 
         */
        this.correlationId = null;

        var d = new Date();
        this.sendTime = d.toISOString();
    };
}

module.exports = MsgHeader;
