import Vue from 'vue'

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
    CONTRACT_FINDING_SUCCESS,
    CONTRACT_FINDING_ERROR,

    CONTRACT_DOCUMENT_REQUEST,
    CONTRACT_DOCUMENT_SUCCESS,
    CONTRACT_SCHEDULE_REQUEST,
    CONTRACT_SCHEDULE_LIST_SUCCESS,
    CONTRACT_TRANSACTION_REQUEST,
    CONTRACT_TRANSACTION_LIST_SUCCESS,
    CONTRACT_SCHEDULE_TOTAL,
    CONTRACT_SUMMARY_RESULT,
    CONTRACT_SUMMARY_REQUEST,
    CONTRACT_SUMMARY_TOTAL,
} from './types'

export default {
    [CONTRACT_REPAYMENT_SCHEDULE] (state, result) {
        Vue.set(state, 'flagSchedule', result)
    },
    [CONTRACT_LIST_REQUEST] (state) {
        Vue.set(state, 'contractListRequest', true)
        Vue.set(state, 'contractListResult', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_LIST_SUCCESS] (state, {contracts}) {
        Vue.set(state, 'contractListRequest', false)
        Vue.set(state, 'contractListResult', contracts)
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'contractListRequest', false)
        Vue.set(state, 'contractListError', errorMessage)
        Vue.set(state, 'contractListErrorCode', errorCode)
    },
    //Contract Creating Function
    [CONTRACT_CREATING_REQUEST] (state) {
        Vue.set(state, 'contractCreatingRequest', true)
        Vue.set(state, 'contractCreatingResult', null)
        Vue.set(state, 'contractCreatingError', '')
        Vue.set(state, 'contractCreatingErrorCode', 0)
    },
    [CONTRACT_CREATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'contractCreatingRequest', false)
        Vue.set(state, 'contractCreatingResult', result)
        Vue.set(state, 'contractCreatingErrorCode', 201)
    },
    [CONTRACT_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'contractCreatingRequest', false)
        Vue.set(state, 'contractCreatingError', errorMessage)
        Vue.set(state, 'contractCreatingErrorCode', errorCode)
    },
    [CONTRACT_CREATING_RESET] (state) {
        Vue.set(state, 'contractCreatingRequest', false)
        Vue.set(state, 'contractCreatingResult', null)
        Vue.set(state, 'contractCreatingError', '')
        Vue.set(state, 'contractCreatingErrorCode', 0)
    },
    [CONTRACT_DETAIL_SUCCESS] (state, {contract}) {
        Vue.set(state, 'contractDetailForm', true)
        Vue.set(state, 'contractDetail', contract)
        Vue.set(state, 'contractDetailErrorCode', 200)
        Vue.set(state, 'contractDetailError', '')
    },
    [CONTRACT_DETAIL_REQUEST] (state) {
        Vue.set(state, 'contractDetailForm', false)
        Vue.set(state, 'contractDetail', null)
        Vue.set(state, 'contractDetailErrorCode', 0)
        Vue.set(state, 'contractDetailError', '')
    },
    //contract Finding Function
    [CONTRACT_FINDING_REQUEST] (state) {
        Vue.set(state, 'contractListRequest', true)
        Vue.set(state, 'contractDetail', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 0)
        Vue.set(state, 'contractFindingError', '')
        Vue.set(state, 'contractFindingErrorCode', 0)
    },
    [CONTRACT_FINDING_SUCCESS] (state, {contract}) {
        Vue.set(state, 'contractListRequest', false)
        Vue.set(state, 'contractDetail', contract[0])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
        Vue.set(state, 'contractFindingError', '')
        Vue.set(state, 'contractFindingErrorCode', 200)
    },
    [CONTRACT_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'contractListRequest', false)
        Vue.set(state, 'contractListError', errorMessage)
        Vue.set(state, 'contractListErrorCode', errorCode)
        Vue.set(state, 'contractFindingError', errorMessage)
        Vue.set(state, 'contractFindingErrorCode', errorCode)
    },
    [CONTRACT_DOCUMENT_REQUEST] (state) {
        Vue.set(state, 'documentListRequest', true)
        Vue.set(state, 'documentListResult', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_DOCUMENT_SUCCESS] (state, {docs}) {
        Vue.set(state, 'documentListRequest', false)
        Vue.set(state, 'documentListResult', docs)
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_SCHEDULE_REQUEST] (state) {
        Vue.set(state, 'scheduleListRequest', true)
        Vue.set(state, 'scheduleListResult', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_SCHEDULE_LIST_SUCCESS] (state, {contracts}) {
        Vue.set(state, 'scheduleListRequest', false)
        Vue.set(state, 'scheduleListResult', contracts)
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_TRANSACTION_REQUEST] (state) {
        Vue.set(state, 'transactionListRequest', true)
        Vue.set(state, 'transactionListResult', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_TRANSACTION_LIST_SUCCESS] (state, {contracts}) {
        Vue.set(state, 'transactionListRequest', false)
        Vue.set(state, 'transactionListResult', contracts)
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_SCHEDULE_TOTAL] (state, {total}) {
        Vue.set(state, 'contractTotalResult', total)
    },
    [CONTRACT_SUMMARY_TOTAL] (state, {total}) {
        Vue.set(state, 'contractTotalSummaryResult', total)
    },
    [CONTRACT_SUMMARY_REQUEST] (state) {
        Vue.set(state, 'summaryListRequest', true)
        Vue.set(state, 'summaryListResult', [])
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
    [CONTRACT_SUMMARY_RESULT] (state, {contracts}) {
        Vue.set(state, 'summaryListRequest', false)
        Vue.set(state, 'summaryListResult', contracts)
        Vue.set(state, 'contractListError', '')
        Vue.set(state, 'contractListErrorCode', 200)
    },
}