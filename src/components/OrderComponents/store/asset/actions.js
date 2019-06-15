import {
    SASSET_LIST_REQUEST,
    SASSET_LIST_SUCCESS,
    SASSET_LIST_ERROR
} from './types'

import { AssetService, AssetError } from '../../../../services/asset.serivce'

export default {
    async getSAssetList({commit}) {
        commit(SASSET_LIST_REQUEST)
        try {
            let result = await AssetService.getSAssetList()
            commit(SASSET_LIST_SUCCESS, {result})
        } catch (error) {
            if (error instanceof AssetError) {
                commit(SASSET_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(SASSET_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}