
/**
 * This message is sent from a client as the first message after it has connected to a Websocket connection to the server.
 */
class PoseEvent {
    /**
     * Constructor
     * @param {The dispatch function for redux} dispatch 
     */
    constructor(clientId) {
        this.nose = null;
        this.head = null;
        this.leftEye = null;
        this.rightEye = null;
        this.leftEar = null;
        this.rightEar = null;
        this.leftShoulder = null;
        this.rightShoulder = null;
        this.leftElbow = null;
        this.rightElbow = null;
        this.leftWrist = null;
        this.rightWrist = null;
        this.pelvis = null; // Root
        this.leftHip = null;
        this.rightHip = null;
        this.leftKnee = null;
        this.rightKnee = null;
        this.leftFoot = null;
        this.rightFoot = null;
    };
}

module.exports = PoseEvent;
