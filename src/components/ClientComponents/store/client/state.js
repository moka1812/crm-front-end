export default function initialState () {
    return {
        //Client Search Function
        clientSearching: false,
        clientSearchResult: null,
        clientSearchErrorCode: 0,
        clientSearchError: '',
        
        // Client Creating Function
        clientCreatingRequest: false,
        clientCreatingResult: null,
        clientCreatingErrorCode: 0,
        clientCreatingError: '',

    }
}