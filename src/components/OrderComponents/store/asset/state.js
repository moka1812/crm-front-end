export default function initialState() {
    return {
        // SAsset List Getting Function
        SAssetListRequest: false,
        SAssetListResult: null,
        SAssetListErrorCode: 0,
        SAssetListError: '',

        // CAsset Updating Function
        CAssetUpdatingRequest: false,
        CAssetUpdatingResult: null,
        CAssetUpdatingErrorCode: 0,
        CAssetUpdatingError: '',
    }
}