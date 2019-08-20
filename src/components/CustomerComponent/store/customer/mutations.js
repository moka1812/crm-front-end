import Vue from 'vue'

import {
    CUSTOMER_REPAYMENT_SCHEDULE,
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,
    CUSTOMER_DETAIL_SUCCESS,
    CUSTOMER_DETAIL_REQUEST,
    CUSTOMER_FINDING_ERROR,
    CUSTOMER_FINDING_SUCCESS,
    CUSTOMER_FINDING_REQUEST,
    CUSTOMER_DOCUMENT_REQUEST,
    CUSTOMER_DOCUMENT_SUCCESS,
    CUSTOMER_SCHEDULE_REQUEST,
    CUSTOMER_SCHEDULE_LIST_SUCCESS,
    CUSTOMER_TRANSACTION_REQUEST,
    CUSTOMER_TRANSACTION_LIST_SUCCESS,
    CUSTOMER_SCHEDULE_TOTAL,
    CUSTOMER_SUMMARY_RESULT,
    CUSTOMER_SUMMARY_REQUEST,
    CUSTOMER_SUMMARY_TOTAL,
} from './types'

export default {
    [CUSTOMER_REPAYMENT_SCHEDULE] (state, result) {
        Vue.set(state, 'flagSchedule', result)
    },
    [CUSTOMER_LIST_REQUEST] (state) {
        Vue.set(state, 'CUSTOMERListRequest', true)
        Vue.set(state, 'customerListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_LIST_SUCCESS] (state, {customers}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListError', errorMessage)
        Vue.set(state, 'customerListErrorCode', errorCode)
    },
    [CUSTOMER_DETAIL_SUCCESS] (state, {customer}) {
        Vue.set(state, 'customerDetailForm', true)
        Vue.set(state, 'customerDetail', customer)
        Vue.set(state, 'customerDetailErrorCode', 200)
        Vue.set(state, 'customerDetailError', '')
    },
    [CUSTOMER_DETAIL_REQUEST] (state) {
        Vue.set(state, 'customerDetailForm', false)
        Vue.set(state, 'customerDetail', null)
        Vue.set(state, 'customerDetailErrorCode', 0)
        Vue.set(state, 'customerDetailError', '')
    },
    //customer Finding Function
    [CUSTOMER_FINDING_REQUEST] (state) {
        Vue.set(state, 'customerListRequest', true)
        Vue.set(state, 'customerDetail', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 0)
        Vue.set(state, 'customerFindingError', '')
        Vue.set(state, 'customerFindingErrorCode', 0)
    },
    [CUSTOMER_FINDING_SUCCESS] (state, {customer}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerDetail', customer[0])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
        Vue.set(state, 'customerFindingError', '')
        Vue.set(state, 'customerFindingErrorCode', 200)
    },
    [CUSTOMER_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListError', errorMessage)
        Vue.set(state, 'customerListErrorCode', errorCode)
        Vue.set(state, 'customerFindingError', errorMessage)
        Vue.set(state, 'customerFindingErrorCode', errorCode)
    },
    [CUSTOMER_DOCUMENT_REQUEST] (state) {
        Vue.set(state, 'documentListRequest', true)
        Vue.set(state, 'documentListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_DOCUMENT_SUCCESS] (state, {docs}) {
        Vue.set(state, 'documentListRequest', false)
        Vue.set(state, 'documentListResult', docs)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_REQUEST] (state) {
        Vue.set(state, 'scheduleListRequest', true)
        Vue.set(state, 'scheduleListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_LIST_SUCCESS] (state, {customers}) {
        Vue.set(state, 'scheduleListRequest', false)
        Vue.set(state, 'scheduleListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_TRANSACTION_REQUEST] (state) {
        Vue.set(state, 'transactionListRequest', true)
        Vue.set(state, 'transactionListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_TRANSACTION_LIST_SUCCESS] (state, {customers}) {
        Vue.set(state, 'transactionListRequest', false)
        Vue.set(state, 'transactionListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_TOTAL] (state, {total}) {
        Vue.set(state, 'customerTotalResult', total)
    },
    [CUSTOMER_SUMMARY_TOTAL] (state, {total}) {
        Vue.set(state, 'customerTotalSummaryResult', total)
    },
    [CUSTOMER_SUMMARY_REQUEST] (state) {
        Vue.set(state, 'summaryListRequest', true)
        Vue.set(state, 'summaryListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SUMMARY_RESULT] (state, {customers}) {
        Vue.set(state, 'summaryListRequest', false)
        Vue.set(state, 'summaryListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
}