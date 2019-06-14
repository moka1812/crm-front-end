import Vue from 'vue'

import {
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_ERROR,

    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR
} from './types'

export default {
    [NEW_NOTIFICATION_REQUEST] (state) {
        Vue.set(state, 'newNotificationErrorCode', 0)
        Vue.set(state, 'newNotificationError', '')
    },
    [NEW_NOTIFICATION_SUCCESS] (state, {result}) {
        Vue.set(state, 'newNotificationResult', result)
        Vue.set(state, 'newNotificationErrorCode', 200)
        Vue.set(state, 'newNotificationError', '')
    },
    [NEW_NOTIFICATION_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'newNotificationErrorCode', errorCode)
        Vue.set(state, 'newNotificationError', errorMessage)
    },

    [NOTIFICATION_REQUEST] (state) {
        Vue.set(state, 'notificationErrorCode', 0)
        Vue.set(state, 'notificationError', '')
    },
    [NOTIFICATION_SUCCESS] (state, {result}) {
        Vue.set(state, 'notificationResult', result)
        Vue.set(state, 'notificationErrorCode', 200)
        Vue.set(state, 'notificationError', '')
    },
    [NOTIFICATION_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'notificationErrorCode', errorCode)
        Vue.set(state, 'notificationError', errorMessage)
    },
}