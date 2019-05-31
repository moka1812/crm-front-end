import Vue from 'vue'

import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,
    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR
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
            Vue.set(state, 'clientResult', result.data)
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

    //Order Creating Function
    [ORDER_CREATING_REQUEST] (state) {
        Vue.set(state, 'orderRequest', true)
        Vue.set(state, 'orderCreating', true)
        Vue.set(state, 'orderCreatingResult', null)
        Vue.set(state, 'orderCreatingErrorCode', '')
        Vue.set(state, 'orderCreatingError', 0)
    },
    [ORDER_CREATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderRequest', false)
        Vue.set(state, 'orderCreating', false)
        Vue.set(state, 'orderCreatingResult', result)
        Vue.set(state, 'orderCreatingErrorCode', 201)
    },
    [ORDER_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderRequest', false)
        Vue.set(state, 'orderCreating', false)
        Vue.set(state, 'orderCreatingError', errorMessage)
        Vue.set(state, 'orderCreatingErrorCode', errorCode)
    },
}