export default  {
    currentBranch: (state) => {
        return state.currentBranch
    },
    currentBranchID: (state) => {
        return state.currentBranchID
    },
    branchListRequest: (state) => {
        return state.branchListRequest
    },
    branchListResult: (state) => {
        return state.branchListResult
    },
    branchListErrorCode: (state) => {
        return state.branchListErrorCode
    },
    branchListError: (state) => {
        return state.branchListError
    },
}