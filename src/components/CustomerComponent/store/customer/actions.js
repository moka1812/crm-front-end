import {
    CUSTOMER_REPAYMENT_SCHEDULE,
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,
    CUSTOMER_DETAIL_REQUEST,
    CUSTOMER_DETAIL_SUCCESS,
    CUSTOMER_DETAIL_ERROR,
    CUSTOMER_FINDING_REQUEST,
    CUSTOMER_FINDING_ERROR,
    CUSTOMER_DOCUMENT_REQUEST,
    CUSTOMER_DOCUMENT_SUCCESS,
    CUSTOMER_SCHEDULE_REQUEST,
    CUSTOMER_SCHEDULE_LIST_SUCCESS,
    CUSTOMER_TRANSACTION_REQUEST,
    CUSTOMER_TRANSACTION_LIST_SUCCESS,
    CUSTOMER_SCHEDULE_TOTAL,
    CUSTOMER_SUMMARY_REQUEST,
    CUSTOMER_SUMMARY_RESULT,
    CUSTOMER_SUMMARY_TOTAL,
} from './types'
import {CustomerService, CustomerError} from '../../../../services/customer.service'

const has = Object.prototype.hasOwnProperty

export default {

    async changeSchedule({commit}, payload) {
        const schedule = payload.flagSchedule;
        commit(CUSTOMER_REPAYMENT_SCHEDULE, schedule)
    },

    async getCustomerList({commit}, payload) {
        commit(CUSTOMER_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {customers} = await CustomerService.getCustomerList(page)
            commit(CUSTOMER_LIST_SUCCESS, {customers})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerDetail({commit, getters}, payload) {
        commit(CUSTOMER_DETAIL_REQUEST)
        const customerListResult = getters.customerListResult
        for (let customer of customerListResult) {
            if (customer.customerID == payload.customerID) {
                commit(CUSTOMER_DETAIL_SUCCESS, {customer})
                return true
            }
        }
        commit(CUSTOMER_DETAIL_ERROR, {errorCode: 404, errorMessage: "Not found"})
    },

    async getCustomerByCustomerId({commit}, payload) {
        commit(CUSTOMER_FINDING_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customer} = await CustomerService.getCustomerByCustomerId(id)
            commit(CUSTOMER_DETAIL_SUCCESS, {customer})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerDocument({commit}, payload) {
        commit(CUSTOMER_DOCUMENT_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await CustomerService.getCustomerDoucument(id)
            commit(CUSTOMER_DOCUMENT_SUCCESS, {docs})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteCustomerDoucument({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await CustomerService.deleteCustomerDocument(id)
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async uploadCustomerDocument({commit}, data) {

        try {
            const {docs} = await CustomerService.uploadCustomerDocument(data)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerRepaymentSchedule({commit}, payload) {
        commit(CUSTOMER_SCHEDULE_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customers, total} = await CustomerService.getCustomerRepaymentSchedule(id)
            commit(CUSTOMER_SCHEDULE_LIST_SUCCESS, {customers})
            commit(CUSTOMER_SCHEDULE_TOTAL, {total})
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerTransactionLog({commit}, payload) {
        commit(CUSTOMER_TRANSACTION_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customers} = await CustomerService.getCustomerTransactionLog(id)
            commit(CUSTOMER_TRANSACTION_LIST_SUCCESS, {customers})
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerSummary({commit}, payload) {
        commit(CUSTOMER_SUMMARY_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customers, total} = await CustomerService.getCustomerSummary(id)
            commit(CUSTOMER_SUMMARY_RESULT, {customers})
            commit(CUSTOMER_SUMMARY_TOTAL, {total})
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    
}