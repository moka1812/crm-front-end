export default function initialState () {
    return {
        // payment schedule
        flagSchedule: false,
        contractListRequest: false,
        contractListResult: [],
        contractListErrorCode: 0,
        contractListError: '',

        // Contract Creating Function
        contractCreatingRequest: false,
        contractCreatingResult: null,
        contractCreatingErrorCode: 0,
        contractCreatingError: '',

        contractDetailForm: false,
        contractDetail: null,
        contractDetailErrorCode: 0,
        contractDetailError: '',

        contractFindingError: '',
        contractFindingErrorCode: 0,

        documentListResult: [],
        documentListRequest: false
    }
}