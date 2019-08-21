import {
    CLIENT_CREATING_REQUEST,
    CLIENT_CREATING_SUCCESS,
    CLIENT_CREATING_ERROR,
} from './types'
import {ClientService, ClientError} from '../../../../services/client.service'

const has = Object.prototype.hasOwnProperty

export default {
    async createClient({commit}, payload) {
        commit(CLIENT_CREATING_REQUEST)
        try {
            const result = await ClientService.createClient(payload)
            commit(CLIENT_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}