import Vue from 'vue'

import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,
    
    CLIENT_CREATING_REQUEST,
    CLIENT_CREATING_SUCCESS,
    CLIENT_CREATING_ERROR,
} from './types'

export default {
    //Client Search Function
    [CLIENT_SEARCHING_REQUEST] (state) {
        Vue.set(state, 'clientSearching', true)
        Vue.set(state, 'clientResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },
    [CLIENT_SEARCHING_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientSearching', false)
        if (result.status) { // Old Customer
            //Get first client from client array
            Vue.set(state, 'clientResult', result.data[0])
        }
        Vue.set(state, 'clientSearchErrorCode', 200)
    },
    [CLIENT_SEARCHING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientSearching', false),
        Vue.set(state, 'clientSearchErrorCode', errorCode)
        Vue.set(state, 'clientSearchError', errorMessage)
    },
    [CLIENT_SEARCHING_RESET] (state) {
        Vue.set(state, 'clientSearching', false)
        Vue.set(state, 'clientResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },

    // Client Creating Function
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