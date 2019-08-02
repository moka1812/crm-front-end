import Vue from 'vue'

import {
    CONTRACT_REPAYMENT_SCHEDULE,
} from './types'

export default {
    [CONTRACT_REPAYMENT_SCHEDULE] (state, result) {
        Vue.set(state, 'flagSchedule', result)
    },
}