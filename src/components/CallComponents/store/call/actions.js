import VOIPService from "../../../../services/VoIP.service"
import OrderService from "../../../../services/order.service"
import { CallService, CallError } from "../../../../services/call.service"
import moment from 'moment'

import {
  SET_ENABLE,

  SESSION,

  OPEN_WINDOW,
  OPEN_CALL_BOX,
  OPEN_DIAL_PAD,

  CLOSE_WINDOW,
  CLOSE_CALL_BOX,
  CLOSE_DIAL_PAD,

  UPDATE_CALL_ID,
  CALL_UPDATING_REQUEST,
  UPDATE_ORDER_ID,

  OUTCOMING_REQUEST,
  OUTCOMING_CONNECTED,
  OUTCOMING_RESPONSE,
  OUTCOMING_END,
  OUTCOMING_FAIL,

  INCOMING_REQUEST,
  INCOMING_RESPONSE,
  INCOMING_END,
  INCOMING_FAIL,

  RESET_DETAIL,
  BY_EMPLOYEE,
} from './types'

const wsUser = process.env.VUE_APP_WS_USER
var timer = null

const incomingOptions = {
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

export default {
  async setEnableCall({commit}, {enabled}) {
    commit(SET_ENABLE, {enabled})
  },

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
    commit(RESET_DETAIL)
  },

  async terminate({getters, commit}) {
    const session = getters.session
    //Session is exist
    if (session != null) {
      commit(BY_EMPLOYEE, {byEmployee: true})
      session.terminate()
    }
  },

  async closeWindow({commit, getters}) {
    const session = getters.session
    //Session is still exist
    if (session != null) {
      commit(BY_EMPLOYEE, {byEmployee: true})
      await session.terminate()
    }

    //Timer exist
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
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
      //Begin Ring
      'progress': (e) => {
        commit(OUTCOMING_CONNECTED)
      },
      //Begin call
      'confirmed': (e) => {
        commit(OUTCOMING_RESPONSE)
        const audio = document.createElement('audio')
        audio.volume = 1
        audio.autoplay = true
        audio.srcObject = session.connection.getLocalStreams()[0]
      },
      //End call
      'ended': (e) => {
        commit(OUTCOMING_END, {cause: e.cause})
        commit(SESSION, {session:null})
        timer = setTimeout(() => {
          dispatch("closeCallBox")
        }, 5000)
      },
      //Fail Before call
      'failed': (e) => {
        commit(OUTCOMING_FAIL, {cause: e.cause})
        commit(SESSION, {session:null})
        timer = setTimeout(() => {
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
    }

    const phone = VOIPService.getTelephone()
    const session = phone.call(wsUser.replace("user", payload.phone), options);

    try {

      commit(CALL_UPDATING_REQUEST, {requesting: true})

      const data = {
        orderID: payload.orderID,
        callType: 'Call out',
        callStatus: 'connecting',
        startTime: moment().format("YYYY-MM-DD HH:mm:ss")
      }

      const {id} = await CallService.createCall(data)

      commit(UPDATE_CALL_ID, {id})
      commit(CALL_UPDATING_REQUEST, {requesting: false})

    } catch (error) {

      if (error instanceof CallError) {
        console.log(`Code ${error.errorCode}: ${error.message}`)
      }
      console.log('Code 500: Internal Server Error')

    }

    commit(SESSION, {session})
    commit(OUTCOMING_REQUEST, {customerPhone : payload.phone, customerName: payload.name})
  },

  // For incoming call
  async incomingRequest({commit, dispatch}, {session}) {

    try {

      const data = {
        orderID: null,
        callType: 'Call in',
        callStatus: 'Ring',
        startTime: moment().format("YYYY-MM-DD HH:mm:ss")
      }
      
      const {id} = await CallService.createCall(data)
      commit(UPDATE_CALL_ID, {id})

    } catch (error) {
      if (error instanceof CallError) {
        console.log(`Code ${error.errorCode}: ${error.message}`)
      }
      console.log('Code 500: Internal Server Error')
    }

    //Get phone from session
    const phone = session._remote_identity._display_name
    
    //Get client by Phone
    OrderService.findOrderByPhone(phone).then((orderList) => {
      //Check client is new or old
      if (orderList.length === 0) {
        commit(INCOMING_REQUEST, {customerPhone: phone, customerName: 'Khách lạ'})
      } else {
        commit(INCOMING_REQUEST, {customerPhone: phone, customerName: orderList[orderList.length-1].name})
      }
    })

    //Add events handle for incoming call session
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
      timer = setTimeout(() => {
        dispatch("closeCallBox")
      }, 5000)
    })

    session.on('failed', (e) => {
      commit(INCOMING_FAIL, {cause: e.cause})
      commit(SESSION, {session:null})
      timer = setTimeout(() => {
        dispatch("closeCallBox")
      }, 5000)
    })

    commit(SESSION, {session})
  },

  //Accept imcoming call
  async imcomingAccept({getters, dispatch}) {
    const session = getters.session

    if (session != null) {
      await dispatch("openCallBox")
      session.answer(incomingOptions)
    }
  },

  async updateCall({getters, commit}, payload) {
    
    const callInfo = {
      callID: getters.callID,
      ...payload
    }

    commit(CALL_UPDATING_REQUEST, {requesting: true})

    try {

      const {order} = await CallService.updateCall(callInfo)
      
      commit(UPDATE_ORDER_ID, {id: order})
      commit(CALL_UPDATING_REQUEST, {requesting: false})

    } catch (error) {
      if (error instanceof CallError) {
        console.log(`Code ${error.errorCode}: ${error.message}`)
      }
      console.log('Code 500: Internal Server Error')
    }

  },

}