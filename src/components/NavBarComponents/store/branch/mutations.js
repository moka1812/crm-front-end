import Vue from 'vue'

import {
    CHANGE_BRANCH,
    BRANCH_LIST_REQUEST,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_ERROR
} from './types'

export default {
    [CHANGE_BRANCH] (state, branch) {
        Vue.set(state, 'currentBranch', branch)
    },
    [BRANCH_LIST_REQUEST] (state) {
        Vue.set(state, 'branchListRequest', true)
        Vue.set(state, 'branchListResult', null)
        Vue.set(state, 'branchListErrorCode', 0)
        Vue.set(state, 'branchListError', '')
    },
    [BRANCH_LIST_SUCCESS] (state, {result}) {
        Vue.set(state, 'branchListRequest', true)
        Vue.set(state, 'branchListResult', result)
        Vue.set(state, 'branchListErrorCode', 200)
        Vue.set(state, 'branchListError', '')
    },
    [BRANCH_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'branchListRequest', true)
        Vue.set(state, 'branchListErrorCode', errorCode)
        Vue.set(state, 'branchListError', errorMessage)
    },
}