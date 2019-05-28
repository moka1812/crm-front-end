import Vue from 'vue'

import {
    SEARCH_CLIENT_REQUEST,
    SEARCH_CLIENT_SUCCESS,
    SEARCH_CLIENT_ERROR,
    SEARCH_CLIENT_RESET
} from './types'

export default {
    [SEARCH_CLIENT_REQUEST] (state) {
        Vue.set(state, 'clientSearching', true)
        Vue.set(state, 'clientResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },
    [SEARCH_CLIENT_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientSearching', false)
        if (result.status) { // Old Customer
            Vue.set(state, 'clientResult', result.data)
        }
        Vue.set(state, 'clientSearchErrorCode', 200)
    },
    [SEARCH_CLIENT_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientSearching', false)
        Vue.set(state, 'clientSearchErrorCode', errorCode)
        Vue.set(state, 'clientSearchError', errorMessage)
    },
    [SEARCH_CLIENT_RESET] (state) {
        Vue.set(state, 'clientSearching', false)
        Vue.set(state, 'clientResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },
}