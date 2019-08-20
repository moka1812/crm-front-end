export default function initialState () {
    return {
        // payment schedule
        flagSchedule: false,
        customerListRequest: false,
        customerListResult: [],
        customerListErrorCode: 0,
        customerListError: '',

        customerDetailForm: false,
        customerDetail: null,
        customerDetailErrorCode: 0,
        customerDetailError: '',

        customerFindingError: '',
        customerFindingErrorCode: 0,

        documentListResult: [],
        documentListRequest: false,

        scheduleListResult: [],
        scheduleListRequest: false,

        transactionListResult: [],
        transactionListRequest: false,

        customerTotalResult: null,
        customerTotalSummaryResult: null,

        summaryListResult: [],
        summaryListRequest: false,

    }
}