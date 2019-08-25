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

        customerTHForm: false,
        customerTH: null,
        customerTHErrorCode: 0,
        customerTHError: '',

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

 		contractActiveListResult:  [],
        contractActiveListRequest: false,

        contractCloseListResult:  [],
        contractCloseListRequest: false,

        contractCloseListResult:  [],
        contractCloseListRequest: false,

        bankAccoutListRequest: false,
        bankAccoutListResult:  [],
    }
}