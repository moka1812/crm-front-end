import Vue from 'vue'

import {
    SASSET_LIST_REQUEST,
    SASSET_LIST_SUCCESS,
    SASSET_LIST_ERROR
} from './types'

export default {
    //SAsset List Getting Function
    [SASSET_LIST_REQUEST] (state) {
        Vue.set(state, 'SAssetListRequest', true)
        Vue.set(state, 'SAssetListResult', [])
        Vue.set(state, 'SAssetListError', '')
        Vue.set(state, 'SAssetListErrorCode', 0)
    },
    [SASSET_LIST_SUCCESS] (state, {result}) {
        Vue.set(state, 'SAssetListRequest', false)
        Vue.set(state, 'SAssetListResult', result)
        Vue.set(state, 'SAssetListError', '')
        Vue.set(state, 'SAssetListErrorCode', 200)
    },
    [SASSET_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'SAssetListRequest', false)
        Vue.set(state, 'SAssetListError', errorMessage)
        Vue.set(state, 'SAssetListErrorCode', errorCode)
    },
}