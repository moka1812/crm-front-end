import Vue from 'vue'

import {
    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_COUNT,
    ORDER_LIST_ERROR,

    ORDER_FINDING_REQUEST,
    ORDER_FINDING_SUCCESS,
    ORDER_FINDING_ERROR,

    ORDER_LIST_SHECDULE_REQUEST,
    ORDER_LIST_SHECDULE_SUCCESS,
    ORDER_LIST_SHECDULE_ERROR,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    TURN_OFF_DIALOG,
    ORDER_DETAIL_ERROR,

    TEMPORARY_ORDER_SAVING_REQUEST,
} from './types'

export default {

    //Order Creating Function
    [ORDER_CREATING_REQUEST] (state) {
        Vue.set(state, 'orderCreating', true)
        Vue.set(state, 'orderCreatingResult', null)
        Vue.set(state, 'orderCreatingErrorCode', 0)
        Vue.set(state, 'orderCreatingError', '')
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
        Vue.set(state, 'orderUpdatingErrorCode', 0)
        Vue.set(state, 'orderUpdatingError', '')
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
    [ORDER_LIST_SUCCESS] (state, {orders}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListResult', orders)
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 200)
    },
    [ORDER_LIST_RESET] (state) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListResult', [])
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 0)
    },
    [ORDER_COUNT] (state, {count}) {
        Vue.set(state, 'orderCountResult', count)
    },
    [ORDER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListError', errorMessage)
        Vue.set(state, 'orderListErrorCode', errorCode)
    },

    //Order Finding Function
    [ORDER_FINDING_REQUEST] (state) {
        Vue.set(state, 'orderListRequest', true)
        Vue.set(state, 'orderListResult', [])
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 0)
        Vue.set(state, 'orderFindingError', '')
        Vue.set(state, 'orderFindingErrorCode', 0)
    },
    [ORDER_FINDING_SUCCESS] (state, {result}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListResult', result)
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 200)
        Vue.set(state, 'orderFindingError', '')
        Vue.set(state, 'orderFindingErrorCode', 200)
    },
    [ORDER_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderListRequest', false)
        Vue.set(state, 'orderListError', errorMessage)
        Vue.set(state, 'orderListErrorCode', errorCode)
        Vue.set(state, 'orderFindingError', errorMessage)
        Vue.set(state, 'orderFindingErrorCode', errorCode)
    },

    //Order List Getting Function
    [ORDER_LIST_SHECDULE_REQUEST] (state) {
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 0)
    },
    [ORDER_LIST_SHECDULE_SUCCESS] (state, {orders}) {
        Vue.set(state, 'orderListResult', orders)
        Vue.set(state, 'orderListError', '')
        Vue.set(state, 'orderListErrorCode', 200)
    },
    [ORDER_LIST_SHECDULE_ERROR] (state, {errorCode, errorMessage}) {
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
    [ORDER_DETAIL_SUCCESS] (state, {order}) {
        Vue.set(state, 'orderDetailForm', true)
        Vue.set(state, 'orderDetail', order)
        Vue.set(state, 'orderDetailErrorCode', 200)
        Vue.set(state, 'orderDetailError', '')
    },
    [TURN_OFF_DIALOG] (state) {
        Vue.set(state, 'orderDetailForm', false)
    },
    [ORDER_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'orderDetail', '')
        Vue.set(state, 'orderDetailErrorCode', errorCode)
        Vue.set(state, 'orderDetailError', errorMessage)
    },

    [TEMPORARY_ORDER_SAVING_REQUEST] (state, {orderDetail}) {
        Vue.set(state, 'temporaryOrderDetail', orderDetail)
    },
}