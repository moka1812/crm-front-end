export default  {
    contractRepaymentSchedule: (state) => {
        return state.flagSchedule
    },
    contractListRequest: (state) => {
        return state.contractListRequest
    },
    contractListResult: (state) => {
        return state.contractListResult
    },
    contractListErrorCode: (state) => {
        return state.contractListErrorCode
    },

    contractListError: (state) => {
        return state.contractListError
    },
    contractDetailForm: (state) => {
        return state.contractDetailForm
    },

    contractDetail: (state) => {
        return state.contractDetail
    },

    contractDetailErrorCode: (state) => {
        return state.contractDetailErrorCode
    },

    contractDetailError: (state) => {
        return state.contractDetailError
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

    contractTotalResult: (state) => {
        return state.contractTotalResult
    },

    summaryListResult: (state) => {
        return state.summaryListResult
    },

    summaryListRequest: (state) => {
        return state.summaryListRequest
    },

    contractTotalSummaryResult: (state) => {
        return state.contractTotalSummaryResult
    }

}
