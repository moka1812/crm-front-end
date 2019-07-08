import VOIPService from "../../../../services/VoIP.service"
import OrderService from "../../../../services/order.service"

import {
  SESSION,

  OPEN_WINDOW,
  OPEN_CALL_BOX,
  OPEN_DIAL_PAD,

  CLOSE_WINDOW,
  CLOSE_CALL_BOX,
  CLOSE_DIAL_PAD,

  OUTCOMING_RESPONSE,
  OUTCOMING_REQUEST,
  OUTCOMING_END,

  INCOMING_REQUEST,
  INCOMING_RESPONSE,
  INCOMING_END,

  RESET_DETAIL,
} from './types'

const ws_user = process.env.VUE_APP_WS_USER

export default {
  async openDialPad({commit}) {
    commit(OPEN_WINDOW)
    commit(OPEN_DIAL_PAD)
  },

  async closeDialPad({commit}) {
    commit(CLOSE_DIAL_PAD)
    commit(CLOSE_WINDOW)
  },

  async openCallBox({commit}) {
    commit(OPEN_WINDOW)
    commit(OPEN_CALL_BOX)
  },

  async closeCallBox({commit}) {
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
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
    //Session is still exist
    if (session != null) {
      session.terminate()
    }
    commit(CLOSE_DIAL_PAD)
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
    commit(RESET_DETAIL)
  },

  //For outcoming call
  async call({commit, dispatch}, payload) {

    //Open CallBox show phone ring
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
      eventHandlers : eventHandlers,
      extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ],
      mediaConstraints : { audio: true, video: false },
      sessionTimersExpires: '180',
      pcConfig: {
          iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
          ]
      }
    };
    const phone = VOIPService.getTelephone()
    const session = phone.call(ws_user.replace("user", payload.phone), options);
    commit(SESSION, {session})
    commit(OUTCOMING_REQUEST, {customerPhone : payload.phone, customerName: payload.name})
  },



  // For incoming call
  async incomingRequest({commit, dispatch}, {session}) {

    const phone = session._remote_identity._display_name

    const orderList = await OrderService.findOrderByPhone(phone)

    if (orderList.length === 0) {
      commit(INCOMING_REQUEST, {customerPhone: phone, customerName: 'Khách lạ'})
    } else {
      commit(INCOMING_REQUEST, {customerPhone: phone, customerName: orderList[orderList.length-1].name})
    }

    

    session.on('failed', (e) => {
      commit(INCOMING_END, {cause: e.cause})
      commit(SESSION, {session:null})
      setTimeout(() => {
        dispatch("closeCallBox")
      }, 5000)
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
      setTimeout(() => {
        dispatch("closeCallBox")
      }, 5000)
    })

    commit(SESSION, {session})
  },

  async imcomingAccept({getters, dispatch}) {
    const session = getters.session

    if (session != null) {
      await dispatch("openCallBox")

      const options = {
        extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ],
        mediaConstraints : { audio: true, video: false },
        sessionTimersExpires: '180',
        pcConfig: {
            iceServers: [
              { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
            ],
            iceTransportPolicy: 'all',
            rtcpMuxPolicy: 'negotiate'
        }
      };

      session.answer(options)
    }
  },

  
}