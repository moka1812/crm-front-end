import {
    CONTRACT_REPAYMENT_SCHEDULE,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_ERROR,

    CONTRACT_CREATING_REQUEST,
    CONTRACT_CREATING_SUCCESS,
    CONTRACT_CREATING_ERROR,
    CONTRACT_CREATING_RESET,

    CONTRACT_DETAIL_REQUEST,
    CONTRACT_DETAIL_SUCCESS,
    CONTRACT_DETAIL_ERROR,

    CONTRACT_FINDING_REQUEST,
    CONTRACT_FINDING_ERROR,

    CONTRACT_DOCUMENT_REQUEST,
    CONTRACT_DOCUMENT_SUCCESS,

    CONTRACT_SCHEDULE_REQUEST,
    CONTRACT_SCHEDULE_LIST_SUCCESS,

    CONTRACT_TRANSACTION_REQUEST,
    CONTRACT_TRANSACTION_LIST_SUCCESS,
    CONTRACT_SCHEDULE_TOTAL,
    
    CONTRACT_SUMMARY_REQUEST,
    CONTRACT_SUMMARY_RESULT,
    CONTRACT_SUMMARY_TOTAL,
} from './types'
import {ContractService, ContractError} from '../../../../services/contract.service'

const has = Object.prototype.hasOwnProperty

export default {

    async changeSchedule({commit}, payload) {
        const schedule = payload.flagSchedule;
        commit(CONTRACT_REPAYMENT_SCHEDULE, schedule)
    },

    async createContract({commit}, payload) {
        commit(CONTRACT_CREATING_REQUEST)

        try {
            const result = await ContractService.createContract(payload)
            commit(CONTRACT_CREATING_SUCCESS, {result})            
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetContractCreatingResult({commit}) {
        commit(CONTRACT_CREATING_RESET)
    },

    async getContractList({commit}, payload) {
        commit(CONTRACT_LIST_REQUEST)
        try {
            const {contracts} = await ContractService.getContractList()
            commit(CONTRACT_LIST_SUCCESS, {contracts})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractByContractId({commit}, payload) {
        commit(CONTRACT_FINDING_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contract} = await ContractService.getContractByContractId(id)
            commit(CONTRACT_DETAIL_SUCCESS, {contract})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractDocument({commit}, payload) {
        commit(CONTRACT_DOCUMENT_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await ContractService.getContractDoucument(id)
            commit(CONTRACT_DOCUMENT_SUCCESS, {docs})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteContractDoucument({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await ContractService.deleteContractDocument(id)
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async uploadContractDocument({commit}, data) {

        try {
            const {docs} = await ContractService.uploadContractDocument(data)
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractRepaymentSchedule({commit}, payload) {
        commit(CONTRACT_SCHEDULE_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contracts, total} = await ContractService.getContractRepaymentSchedule(id)
            commit(CONTRACT_SCHEDULE_LIST_SUCCESS, {contracts})
            commit(CONTRACT_SCHEDULE_TOTAL, {total})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractTransactionLog({commit}, payload) {
        commit(CONTRACT_TRANSACTION_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contracts} = await ContractService.getContractTransactionLog(id)
            commit(CONTRACT_TRANSACTION_LIST_SUCCESS, {contracts})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractSummary({commit}, payload) {
        commit(CONTRACT_SUMMARY_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contracts, total} = await ContractService.getContractSummary(id)
            commit(CONTRACT_SUMMARY_RESULT, {contracts})
            commit(CONTRACT_SUMMARY_TOTAL, {total})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    
    async updateNote({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const data = has.call(payload, 'data') ? payload.data : null
            const {cus} = await ContractService.updateNote(id, data)
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}