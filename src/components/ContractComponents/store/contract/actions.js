import {
    CONTRACT_REPAYMENT_SCHEDULE,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_ERROR,
} from './types'
import ContractService from '../../../../services/contract.service'

const has = Object.prototype.hasOwnProperty

export default {

    async changeSchedule({commit}, payload) {
        const schedule = payload.flagSchedule;
        commit(CONTRACT_REPAYMENT_SCHEDULE, schedule)
    },

    async getContractList({commit}, payload) {
        commit(CONTRACT_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {contracts} = await ContractService.getContractList(page)
            commit(CONTRACT_LIST_SUCCESS, {contracts})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
    
}