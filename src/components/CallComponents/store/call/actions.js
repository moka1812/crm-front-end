import VOIPService from "../../../../services/VoIP.service"
import { VOIPUserService } from '../../../../services/storage.service'

import {
  OPEN_CALL_BOX,
  OPEN_NUMBER_BOX,
  CLOSE_CALL_BOX,
  CLOSE_NUMBER_BOX,
  CALLING,
  CALL_RING,
  CALL_FAIL,
  CALL_END
} from './types'

//If user and password VOIP exist in cookie, connect to VOIP Backend
if (VOIPUserService.isExist()) {
  const username = VOIPUserService.getUsername()
  const password =  VOIPUserService.getPassword()
 
  VOIPService.setTelephone({user: username, password: password})
}
const phone = VOIPService.getTelephone()
var session = null

export default {
    async openCallBox({commit}) {
      commit(OPEN_CALL_BOX)
    },

    async call({commit}, payload) {
        
      const eventHandlers = {
        'progress': (e) => {
          commit(CALL_RING)
        },
        'failed': (e) => {
          commit(CALL_FAIL, {cause: e.cause})
          session = null
        },
        'confirmed': (e) => {
          commit(CALLING)
          const audio = document.createElement('audio')
          audio.volume = 1
          audio.autoplay = true
          audio.srcObject = session.connection.getLocalStreams()[0]
        },
        'ended': (e) => {
          commit(CALL_END, {cause: e.cause})
          session = null
        },
      };

      const options = {
        'eventHandlers' : eventHandlers,
        'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
        'mediaConstraints' : { 'audio': true, 'video': false },
        'sessionTimersExpires': '180',
        'pcConfig': {
            'iceServers': [
              { 'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
              { 'urls': 'turn:example.com', 'username': 'foo', 'credential': ' 1234' }
            ]
        }
      };
      session = phone.call(`sip:${payload.phone}@webrtc.icado.com`, options);
    },

    async terminate({commit}) {
      session.terminate()
      commit(CLOSE_CALL_BOX)
    },

    async closeWindow({commit}) {
      //Session is exist
      if (session != null) {
        session.terminate()
      }
      commit(CLOSE_CALL_BOX)
    }
}

