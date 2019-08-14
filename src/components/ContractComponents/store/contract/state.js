export default function initialState () {
    return {
        // payment schedule
        flagSchedule: false,
        contractListRequest: false,
        contractListResult: [],
        contractListErrorCode: 0,
        contractListError: '',

        contractDetailForm: false,
        contractDetail: null,
        contractDetailErrorCode: 0,
        contractDetailError: '',

        contractFindingError: '',
        contractFindingErrorCode: 0,

        documentListResult: [],
        documentListRequest: false,

        scheduleListResult: [],
        scheduleListRequest: false,

        transactionListResult: [],
        transactionListRequest: false,

    }
}