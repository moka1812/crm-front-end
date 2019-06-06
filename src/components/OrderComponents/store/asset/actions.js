import {
    SAsset_LIST_REQUEST,
    SAsset_LIST_SUCCESS,
    SAsset_LIST_ERROR
} from './types'

import { AssetService, AssetError } from '../../../../services/asset.serivce'

export default {
    async getSAssetList({commit}) {
        commit(SAsset_LIST_REQUEST)
        try {
            let result = await AssetService.getSAssetList()
            commit(SAsset_LIST_SUCCESS, {result})
        } catch (error) {
            if (error instanceof AssetError) {
                commit(SAsset_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(SAsset_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}