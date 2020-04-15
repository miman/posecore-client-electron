/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import MoscaMqttServer from './mqttsrv/mosca_mqtt_srv';

import PoseSrvProxy from './websocket/pose-srv-proxy';
import BroadcastService from './broadcast/broadcast-service'

let broadcastService = new BroadcastService();
broadcastService.initialize(45458, 45459);

let poseProxy = new PoseSrvProxy('PosnetClient', poseSrvConnectedCallback);

function poseSrvConnectedCallback() {
  broadcastService.broadcastSrvSettings();
}

/**
 * This fn will be called when the local MQTT srv is operational.
 */
function mqqtSrvRunning() {
  console.log('mqqtSrvRunning called');
//  broadcastService.verifyMqttSrvIpAddress();
poseProxy.connectToMqttSrv();
}

let moscaMqttServer = new MoscaMqttServer();
moscaMqttServer.test('Hejsan');
moscaMqttServer.setConnectCallbackFn(mqqtSrvRunning);
moscaMqttServer.startMqttSrv();
// While we don't use the local MQTT server right now, we start the MQTT connection regardless
// mqqtSrvRunning();

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
bindPage();
