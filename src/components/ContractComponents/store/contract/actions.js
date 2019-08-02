import {
    CONTRACT_REPAYMENT_SCHEDULE,
} from './types'


const has = Object.prototype.hasOwnProperty

export default {

    async changeSchedule({commit}, payload) {
        const schedule = payload.flagSchedule;
        commit(CONTRACT_REPAYMENT_SCHEDULE, schedule)
    },
    
}