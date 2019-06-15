import ApiService from './api.service'
import { SAssetListAPI, CAssetsAPI } from '../config/backend-api'

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
            const response = await ApiService.get(SAssetListAPI)
            return response.data
        } catch (error) {
            throw AssetError(error.response.status, error.response.data)
        }
    },
    createCAsset: async function(data) {
        try {
            const response = await ApiService.post(CAssetsAPI, data)
            const CAsset = response.data
            return CAsset 
        } catch (error) {
            throw AssetError(error.response.status, error.response.data.detail)
        }
    },
    updateCAsset: async function(id, data){
        const url = `${CAssetsAPI}${id}/`
        try {
            const response = await ApiService.put(url, data)
            const CAsset = response.data
            return CAsset 
        } catch (error) {
            throw AssetError(error.response.status, error.response.data.detail)
        }
    }
}

export default AssetService

export { AssetService, AssetError }