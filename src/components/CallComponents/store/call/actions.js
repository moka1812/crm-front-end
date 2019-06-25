import VOIPService from "../../../../services/VoIP.service"
import {
  CALLING,
  CALL_RING,
  CALL_FAIL,
  CALL_END
} from './types'

const phone = VOIPService.getTelephone()

export default {
    async call({commit}, payload) {
        
          const eventHandlers = {
            'progress': (e) => {
              commit(CALL_RING)
            },
            'failed': (e) => {
              commit(CALL_FAIL, {cause: e.cause})
            },
            'confirmed':  function(e) {
              const audio = document.createElement('audio')
              audio.volume = 1
              audio.autoplay = true
              audio.src = window.URL.createObjectURL(session.connection.getLocalStreams()[0]);
            },
            'ended': (e) => {
              commit(CALL_END, {cause: e.cause})
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
        commit(CALLING)
        const session = phone.call(`sip:${payload.phone}@webrtc.icado.com`, options);
    }
}

