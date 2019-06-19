import Vue from 'vue'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_PROMISE,
    REFRESH_TOKEN_SUCCESS
} from './types'

export default {
    [LOGIN_REQUEST] (state) {
        Vue.set(state, 'authenticating', true)
        Vue.set(state, 'authenticationError', '')
        Vue.set(state, 'authenticationErrorCode', 0)
    },
    [LOGIN_SUCCESS] (state, {token, profile}) {
        Vue.set(state, 'accessToken', token)
        Vue.set(state, 'authenticating', false)
        Vue.set(state, 'name', profile.name)
        Vue.set(state, 'branch', profile.branch)
        Vue.set(state, 'authenticationError', '')
        Vue.set(state, 'authenticationErrorCode', 200)
    },
    [LOGIN_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'authenticating', false)
        Vue.set(state, 'authenticationErrorCode', errorCode)
        Vue.set(state, 'authenticationError', errorMessage)
    },
    [LOGOUT_SUCCESS] (state) {
        Vue.set(state, 'accessToken', '')
    },
    [REFRESH_TOKEN_PROMISE] (state, promise) {
        Vue.set(state, 'refreshTokenPromise', promise)
    },
    [REFRESH_TOKEN_SUCCESS] (state, accessToken) {
        Vue.set(state, 'accessToken', accessToken)
    } 
}