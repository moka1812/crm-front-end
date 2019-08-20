export default  {
    customerRepaymentSchedule: (state) => {
        return state.flagSchedule
    },
    customerListRequest: (state) => {
        return state.customerListRequest
    },
    customerListResult: (state) => {
        return state.customerListResult
    },
    customerListErrorCode: (state) => {
        return state.customerListErrorCode
    },

    customerListError: (state) => {
        return state.customerListError
    },
    customerDetailForm: (state) => {
        return state.customerDetailForm
    },

    customerDetail: (state) => {
        return state.customerDetail
    },

    customerDetailErrorCode: (state) => {
        return state.customerDetailErrorCode
    },

    customerDetailError: (state) => {
        return state.customerDetailError
    },

    documentListResult: (state) => {
        return state.documentListResult
    },

    documentListRequest: (state) => {
        return state.documentListRequest
    },

    scheduleListResult: (state) => {
        return state.scheduleListResult
    },

    scheduleListRequest: (state) => {
        return state.scheduleListRequest
    },

    transactionListResult: (state) => {
        return state.transactionListResult
    },

    transactionListRequest: (state) => {
        return state.transactionListRequest
    },

    customerTotalResult: (state) => {
        return state.customerTotalResult
    },

    summaryListResult: (state) => {
        return state.summaryListResult
    },

    summaryListRequest: (state) => {
        return state.summaryListRequest
    },

    customerTotalSummaryResult: (state) => {
        return state.customerTotalSummaryResult
    }

}
