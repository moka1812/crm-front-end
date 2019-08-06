import Vue from 'vue'

import {
    CONTRACT_REPAYMENT_SCHEDULE,
    CONTRACT_LIST_SUCCESS,
} from './types'

export default {
    [CONTRACT_REPAYMENT_SCHEDULE] (state, result) {
        Vue.set(state, 'flagSchedule', result)
    },
    [CONTRACT_LIST_SUCCESS] (state, {contracts}) {
        Vue.set(state, 'contractListRequest', false)
        Vue.set(state, 'contractListResult', contracts)
        // Vue.set(state, 'orderListError', '')
        // Vue.set(state, 'orderListErrorCode', 200)
    }
}