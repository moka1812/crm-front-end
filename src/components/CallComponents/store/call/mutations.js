import Vue from 'vue'

import {
    OPEN_CALL_BOX,
    OPEN_NUMBER_BOX,
    CLOSE_CALL_BOX,
    CLOSE_NUMBER_BOX,
    CALLING,
    CALL_RING,
    CALL_FAIL,
    CALL_END,
} from './types'

const getErrorCode = (cause) => {
    switch (cause) {
        case "Busy":
            return 486
        case "Rejected":
            return 403
        case "Redirected":
            return 300
        case "Unavailable":
            return 480
        case "Not Found":
            return 404
        case "Address Incomplete":
            return 484
        case "Incompatible SDP":
            return 488
        case "Authentication Error":
            return 401
    }
}

export default {
    [OPEN_CALL_BOX] (state) {
        Vue.set(state, 'windowOpen', true)
        Vue.set(state, 'callBox', true)
    },
    [OPEN_NUMBER_BOX] (state) {
        Vue.set(state, 'windowOpen', true)
        Vue.set(state, 'numberBox', true)
    },
    [CLOSE_CALL_BOX] (state) {
        Vue.set(state, 'windowOpen', false)
        Vue.set(state, 'callBox', false)
    },
    [CLOSE_NUMBER_BOX] (state) {
        Vue.set(state, 'windowOpen', false)
        Vue.set(state, 'numberBox', false)
    },
    [CALL_RING] (state) {
        Vue.set(state, 'ring', true)
    },
    [CALLING] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'ring', false)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 0)
    },
    [CALL_FAIL] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'callError', cause)
        const errorCode = getErrorCode(cause);
        Vue.set(state, 'callErrorCode', errorCode)
    },
    [CALL_END] (state, {cause}) {
        Vue.set(state, 'calling', false)
        Vue.set(state, 'callError', cause)
        Vue.set(state, 'callErrorCode', 200)
    }
}