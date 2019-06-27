import Vue from 'vue'

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

import {getError} from '../../utils/call_errors'

export default {
    [SESSION] (state, {session}) {
        Vue.set(state, 'session', session)
    },
    [OPEN_CALL_BOX] (state) {
        Vue.set(state, 'callBox', true)
    },
    [OPEN_NUMBER_BOX] (state) {
        Vue.set(state, 'windowOpen', true)
    },
    [OPEN_WINDOW] (state) {
        Vue.set(state, 'windowOpen', true)
    },
    [CLOSE_CALL_BOX] (state) {
        Vue.set(state, 'callBox', false)
    },
    [CLOSE_NUMBER_BOX] (state) {
        Vue.set(state, 'numberBox', false)
    },
    [CLOSE_WINDOW] (state) {
        Vue.set(state, 'windowOpen', false)
    },

    //FOR OUTCOMING CALLING
    [OUTCOMING_REQUEST] (state, {customer}) {
        Vue.set(state, 'requestType', 'outcoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'customerNumberPhone', customer)
    },
    [OUTCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 0)
    },
    [OUTCOMING_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const {code, message} = getError(cause);
        Vue.set(state, 'callError', message)
        Vue.set(state, 'callErrorCode', code)
    },

    //FOR INCOMING CALLING
    [INCOMING_REQUEST] (state, {customer}) {
        Vue.set(state, 'requestType', 'incoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'customerNumberPhone', customer)
    },
    [INCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 0)
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
        Vue.set(state, 'customerNumberPhone', '')
    }
}