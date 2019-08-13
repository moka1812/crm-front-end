import ApiService from '../services/api.service'
import { clientAPI } from '../config/backend-api'

class ClientError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ClientService = {
    getClientByPhone: async function (phone) {

        try {
            const url = `${clientAPI}?phone=${phone}`

            const response = await ApiService.get(url)

            if (response.data.length === 0) { //New Client
                return {
                    status: false,
                    data: null
                }
            } else {
                return {
                    status: true,
                    data: response.data
                }
            }

        } catch (error) {
            throw new ClientError(error.response.status, error.response.data)
        }
    },
    getClientByNationalID: async function (nationalID) {

        try {
            const url = `${clientAPI}?nationalid=${nationalID}`

            const response = await ApiService.get(url)

            if (response.data.length === 0) { //New Client
                return {
                    status: false,
                    data: null
                }
            } else {
                return {
                    status: true,
                    data: response.data
                }
            }

        } catch (error) {
            throw new ClientError(error.response.status, error.response.data)
        }
    },
}

export default ClientService

export { ClientService, ClientError }