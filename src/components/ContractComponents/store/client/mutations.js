import Vue from 'vue'

import {
    CLIENT_CREATING_REQUEST,
    CLIENT_CREATING_SUCCESS,
    CLIENT_CREATING_ERROR,
} from './types'

export default {
    // Cloent Creating Function
    [CLIENT_CREATING_REQUEST] (state) {
        Vue.set(state, 'clientCreatingRequest', true)
        Vue.set(state, 'clientCreatingResult', null)
        Vue.set(state, 'clientCreatingError', '')
        Vue.set(state, 'clientCreatingErrorCode', 0)
    },
    [CLIENT_CREATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientCreatingRequest', false)
        Vue.set(state, 'clientCreatingResult', result)
        Vue.set(state, 'clientCreatingErrorCode', 201)
    },
    [CLIENT_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientCreatingRequest', false)
        Vue.set(state, 'clientCreatingError', errorMessage)
        Vue.set(state, 'clientCreatingErrorCode', errorCode)
    },
}