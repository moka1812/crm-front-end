import ApiService from './api.service'
import { SAssetListAPI, CAssetsAPI } from '../config/backend_api'

class AssetError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const AssetService = {
    getSAssetList: async function() {
        try {
            let response = await ApiService.get(SAssetListAPI)
            return response.data
        } catch (error) {
            throw AssetError(error.response.status, error.response.data)
        }
    },
    createCAsset: async function(data) {
        try {
            let response = await ApiService.post(CAssetsAPI, data)
            let CAsset = response.data
            return CAsset 
        } catch (error) {
            throw AssetError(error.response.status, error.response.data.detail)
        }
    },
    updateCAsset: async function(id, data){
        let url = `${CAssetsAPI}${id}/`
        try {
            let response = await ApiService.put(url, data)
            let CAsset = response.data
            return CAsset 
        } catch (error) {
            throw AssetError(error.response.status, error.response.data.detail)
        }
    }
}

export default AssetService

export { AssetService, AssetError }