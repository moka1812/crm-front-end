import VOIPService from "../../../../services/VoIP.service"

import {
  SESSION,

  OPEN_CALL_BOX,
  OPEN_NUMBER_BOX,
  OPEN_WINDOW,

  CLOSE_WINDOW,
  CLOSE_CALL_BOX,
  CLOSE_NUMBER_BOX,

  OUTCOMING_RESPONSE,
  OUTCOMING_REQUEST,
  OUTCOMING_END,

  INCOMING_REQUEST,
  INCOMING_RESPONSE,
  INCOMING_END,

  RESET_DETAIL,
} from './types'

export default {
  async openCallBox({commit}) {
    commit(OPEN_WINDOW)
    commit(OPEN_CALL_BOX)
  },

  async closeCallBox({commit}) {
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
    commit(RESET_DETAIL)
  },

  //For outcoming call
  async call({commit, dispatch}, payload) {
    await dispatch("openCallBox")

    const eventHandlers = {
      'failed': (e) => {
        commit(OUTCOMING_END, {cause: e.cause})
        commit(SESSION, {session:null})
        setTimeout(() => {
          dispatch("closeCallBox")
        }, 5000)
      },
      'confirmed': (e) => {
        commit(OUTCOMING_RESPONSE)
        const audio = document.createElement('audio')
        audio.volume = 1
        audio.autoplay = true
        audio.srcObject = session.connection.getLocalStreams()[0]
      },
      'ended': (e) => {
        commit(OUTCOMING_END, {cause: e.cause})
        commit(SESSION, {session:null})
        setTimeout(() => {
          dispatch("closeCallBox")
        }, 5000)
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
    const phone = VOIPService.getTelephone()
    const session = phone.call(`sip:${payload.phone}@2019.icado.vn`, options);
    commit(SESSION, {session})
    commit(OUTCOMING_REQUEST, {customer : payload.phone})
  },





  // For incoming call
  async incomingRequest({commit}, {newSession}) {
    const session = newSession

    commit(INCOMING_REQUEST, {customer: session._remote_identity._display_name})

    session.on('failed', (e) => {
      commit(INCOMING_END, {cause: e.cause})
      commit(SESSION, {session:null})
    })

    session.on('confirmed', (e) => {
      commit(INCOMING_RESPONSE)
      const audio = document.createElement('audio')
      audio.volume = 1
      audio.autoplay = true
      audio.srcObject = session.connection.getLocalStreams()[0]
    })

    session.on('ended', (e) => {
      commit(INCOMING_END, {cause: e.cause})
      commit(SESSION, {session:null})
    })

    commit(SESSION, {session})
  },

  async imcomingAccept({getters}) {
    const session = getters.session
    session.answer()
  },

  async terminate({getters}) {
    const session = getters.session
    //Session is exist
    if (session != null) {
      session.terminate()
    }
  },

  async closeWindow({commit, getters}) {
    const session = getters.session
    //Session is exist
    if (session != null) {
      session.terminate()
    }
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
    commit(RESET_DETAIL)
  },
}