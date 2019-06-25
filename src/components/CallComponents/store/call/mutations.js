import Vue from 'vue'

import {
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
    [CALLING] (state) {
        Vue.set(state, 'calling', true)
        Vue.set(state, 'callError', '')
        Vue.set(state, 'callErrorCode', 0)
    },
    [CALL_RING] (state) {
        Vue.set(state, 'ring', true)
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