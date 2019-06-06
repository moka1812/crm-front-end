import ApiService from './api.service'
import { SAssetListAPI } from '../config/backend_api'

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
    }
}

export default AssetService

export { AssetService, AssetError }