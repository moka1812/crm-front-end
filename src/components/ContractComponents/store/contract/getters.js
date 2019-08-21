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
    
    contractCreatingRequest: (state) => {
        return state.contractCreatingRequest
    },

    contractCreatingResult: (state) => {
        return state.contractCreatingResult
    },

    contractCreatingErrorCode: (state) => {
        return state.contractCreatingErrorCode
    },

    contractCreatingError: (state) => {
        return state.contractCreatingError
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
    }

}
