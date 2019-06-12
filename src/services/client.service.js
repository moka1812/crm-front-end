import ApiService from '../services/api.service'
import { getClientByPhoneApi } from '../config/backend-api'

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
            let url = `${getClientByPhoneApi}?phone=${phone}`

            let response = await ApiService.get(url)

            if (response.status == 200) { //Response Success
                return {
                    status: true,
                    data: response.data
                }
            } 

        } catch (error) {
            if (error.response.status == 400) { //New Client
                return {
                    status: false,
                    data: error.response.data[0]
                }
            }
            
            throw new ClientError(error.response.status, error.response.data)
        }
    }
}

export default ClientService

export { ClientService, ClientError }