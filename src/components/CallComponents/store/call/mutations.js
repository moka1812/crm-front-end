import Vue from 'vue'

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

import {getError} from '../../utils/call_errors'

export default {
    [SESSION] (state, {session}) {
        Vue.set(state, 'session', session)
    },

    [OPEN_WINDOW] (state) {
        Vue.set(state, 'windowOpen', true)
    },
    [OPEN_CALL_BOX] (state) {
        Vue.set(state, 'callBox', true)
    },
    [OPEN_DIAL_PAD] (state) {
        Vue.set(state, 'dialPad', true)
    },

    [CLOSE_WINDOW] (state) {
        Vue.set(state, 'windowOpen', false)
    },
    [CLOSE_CALL_BOX] (state) {
        Vue.set(state, 'callBox', false)
    },
    [CLOSE_DIAL_PAD] (state) {
        Vue.set(state, 'dialPad', false)
    },

    /*
        callError
            0: Not call, Call Ring
            1: Calling
            2: Error from SIP 
            3: Error from RTCSession 
    */

    //FOR OUTCOMING CALLING
    [OUTCOMING_REQUEST] (state, {customerPhone, customerName}) {
        Vue.set(state, 'requestType', 'outcoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'customerPhone', customerPhone)
        Vue.set(state, 'customerName', customerName)
    },
    [OUTCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 1)
    },
    [OUTCOMING_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const {code, message} = getError(cause);
        Vue.set(state, 'callError', message)
        Vue.set(state, 'callErrorCode', code)
    },

    //FOR INCOMING CALLING
    [INCOMING_REQUEST] (state, {customerPhone, customerName}) {
        Vue.set(state, 'requestType', 'incoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'customerPhone', customerPhone)
        Vue.set(state, 'customerName', customerName)
    },
    [INCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 1)
    },
    [INCOMING_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const {code, message} = getError(cause);
        Vue.set(state, 'callError', message)
        Vue.set(state, 'callErrorCode', code)
    },

    [RESET_DETAIL] (state) {
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 0)
        Vue.set(state, 'requestType', '')
        Vue.set(state, 'customerPhone', '')
        Vue.set(state, 'customerName', '')
    }
}