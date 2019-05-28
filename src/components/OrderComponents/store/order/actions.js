import {
    SEARCH_CLIENT_REQUEST,
    SEARCH_CLIENT_SUCCESS,
    SEARCH_CLIENT_ERROR,
    SEARCH_CLIENT_RESET
} from './types'

import { ClientService, ClientError } from '../../../../services/client.service'

export default {

    async searchClient({commit}, payload) {
        commit(SEARCH_CLIENT_REQUEST)
        try {

            let result = await ClientService.getClientByPhone(payload.phone)
            commit(SEARCH_CLIENT_SUCCESS, {result})
            
        } catch (error) {
            if (error instanceof ClientError) {
                commit(SEARCH_CLIENT_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(SEARCH_CLIENT_ERROR, {errorCode: 500, errorMessage: "Undefined"})
            }
        }
    },

    async clientReset({commit}) {
        commit(SEARCH_CLIENT_RESET)
    }

}