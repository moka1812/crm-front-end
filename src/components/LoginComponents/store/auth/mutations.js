import Vue from 'vue'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_PROMISE
} from './types'

export default {
    [LOGIN_REQUEST] (state) {
        Vue.set(state, 'authenticating', true)
        Vue.set(state, 'authenticationError', '')
        Vue.set(state, 'authenticationErrorCode', 0)
    },
    [LOGIN_SUCCESS] (state, tokenAndProfile) {
        Vue.set(state, 'accessToken', tokenAndProfile.token)
        Vue.set(state, 'authenticating', false)
        Vue.set(state, 'name', tokenAndProfile.profile.name)
        Vue.set(state, 'branch', tokenAndProfile.profile.branch)
    },
    [LOGIN_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'authenticating', false)
        Vue.set(state, 'authenticationErrorCode', errorCode)
        Vue.set(state, 'authenticationError', errorCode == 400 ? 'User not defined' : errorMessage)
    },
    [LOGOUT_SUCCESS] (state) {
        Vue.set(state, 'accessToken', '')
    },
    [REFRESH_TOKEN_PROMISE] (state, promise) {
        Vue.set(state, 'refreshTokenPromise', promise)
    } 
}