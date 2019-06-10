import Vue from 'vue'

import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,

    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_ERROR,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    EDIT_DIALOG,
    ORDER_DETAIL_ERROR
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
        Vue.set(state, 'orderCreating', true)
        Vue.set(state, 'orderCreatingResult', null)
        Vue.set(state, 'orderCreatingErrorCode', '')
        Vue.set(state, 'orderCreatingError', 0)
    },
    [ORDER_CREATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderCreating', false)
        Vue.set(state, 'orderCreatingResult', result)
        Vue.set(state, 'orderCreatingErrorCode', 201)
    },
    [ORDER_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderCreating', false)
        Vue.set(state, 'orderCreatingError', errorMessage)
        Vue.set(state, 'orderCreatingErrorCode', errorCode)
    },

    //Order Updating Function
    [ORDER_UPDATING_REQUEST] (state) {
        Vue.set(state, 'orderUpdating', true)
        Vue.set(state, 'orderUpdatingResult', null)
        Vue.set(state, 'orderUpdatingErrorCode', '')
        Vue.set(state, 'orderUpdatingError', 0)
    },
    [ORDER_UPDATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderUpdating', false)
        Vue.set(state, 'orderUpdatingResult', result)
        Vue.set(state, 'orderUpdatingErrorCode', 200)
    },
    [ORDER_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderUpdating', false)
        Vue.set(state, 'orderUpdatingErrorCode', errorCode)
        Vue.set(state, 'orderUpdatingError', errorMessage)
    },
    //Order List Getting Function
    [ORDER_LIST_REQUEST] (state) {
        Vue.set(state, 'orderListRequest', true)
        Vue.set(state, 'orderListResult', [])
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 0)
    },
    [ORDER_LIST_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListResult', result)
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 200)
    },
    [ORDER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListError', errorMessage)
        Vue.set(state, 'orderListErrorCode', errorCode)
    },

    //Get Order Detail
    [ORDER_DETAIL_REQUEST] (state) {
        Vue.set(state, 'orderDetailForm', false)
        Vue.set(state, 'orderDetail', null)
        Vue.set(state, 'orderDetailErrorCode', 0)
        Vue.set(state, 'orderDetailError', '')
    },
    [ORDER_DETAIL_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderDetailForm', true)
        Vue.set(state, 'orderDetail', result)
        Vue.set(state, 'orderDetailErrorCode', 200)
        Vue.set(state, 'orderDetailError', '')
    },
    [EDIT_DIALOG] (state) {
        Vue.set(state, 'orderDetailForm', false)
    },
    [ORDER_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderDetail', '')
        Vue.set(state, 'orderDetailErrorCode', errorCode)
        Vue.set(state, 'orderDetailError', errorMessage)
    },
}