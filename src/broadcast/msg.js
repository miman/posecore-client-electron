/**
 * The is the message header
 */
class Message {
    /**
     * Constructor
     */
    constructor(header, payload) {
        this.header = header;
        this.payload = payload;
    };
}

module.exports = Message;
