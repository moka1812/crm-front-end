import Vue from 'vue'

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

import {getError} from '../../utils/call_errors'

export default {
    [SET_ENABLE] (state, {enabled}) {
        Vue.set(state, 'enabled', enabled)
    },

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
    [UPDATE_CALL_ID] (state, {id}) {
        Vue.set(state, 'callID', id)
    },
    [CALL_UPDATING_REQUEST] (state, {requesting}) {
        Vue.set(state, 'callUpdating', requesting)
    },
    [UPDATE_ORDER_ID] (state, {id}) {
        Vue.set(state, 'orderID', id)
    },


    //FOR OUTCOMING CALLING
    [OUTCOMING_REQUEST] (state, {customerPhone, customerName}) {
        Vue.set(state, 'requestType', 'outcoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'step', 'connecting')
        Vue.set(state, 'customerPhone', customerPhone)
        Vue.set(state, 'customerName', customerName)
    },
    [OUTCOMING_CONNECTED] (state) {
        Vue.set(state, 'step', 'progress')
    },
    [OUTCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'error', '')
        Vue.set(state, 'step', 'client confirmed')
    },
    [OUTCOMING_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const message = getError(cause, state.byEmployee);
        Vue.set(state, 'error', message)
        Vue.set(state, 'step', 'ended')
    },
    [OUTCOMING_FAIL] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const message = getError(cause, state.byEmployee);
        Vue.set(state, 'error', message)
        Vue.set(state, 'step', 'outcoming failed')
    },

    //FOR INCOMING CALLING
    [INCOMING_REQUEST] (state, {customerPhone, customerName}) {
        Vue.set(state, 'requestType', 'incoming')
        Vue.set(state, 'ring', true)
        Vue.set(state, 'step', 'progress')
        Vue.set(state, 'customerPhone', customerPhone)
        Vue.set(state, 'customerName', customerName)
    },
    [INCOMING_RESPONSE] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'error', '')
        Vue.set(state, 'step', 'user confirmed')
    },
    [INCOMING_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const message = getError(cause, state.byEmployee);
        Vue.set(state, 'error', message)
        Vue.set(state, 'step', 'ended')
    },
    [INCOMING_FAIL] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'ring', false)
        const message = getError(cause, state.byEmployee);
        Vue.set(state, 'error', message)
        Vue.set(state, 'step', 'incoming failed')
    },

    [RESET_DETAIL] (state) {
        Vue.set(state, 'error', '')
        Vue.set(state, 'step', 'rest')
        Vue.set(state, 'requestType', '')
        Vue.set(state, 'customerPhone', '')
        Vue.set(state, 'customerName', '')
        Vue.set(state, 'byEmployee' , false)
    },
    [BY_EMPLOYEE] (state, {byEmployee}) {
        Vue.set(state, 'byEmployee' , byEmployee)
    }
}