import ApiService from '../services/api.service'
import { clientAPI } from '../config/backend-api'
import { ProfileService, CurrentBranchService } from './storage.service'

class ClientError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ClientService = {
    createClient: async function(newClientInfo) {
        const data = {
            first_name: newClientInfo.firstName,
            last_name: newClientInfo.lastName,
            created_by: ProfileService.getID(),
            primary_phone: newClientInfo.primaryPhone,
            alternative_phone: newClientInfo.alternativePhone,
            address: newClientInfo.address,
            district: newClientInfo.district,
            city: newClientInfo.city,
            date_of_birth: newClientInfo.DOB,
            national_id:newClientInfo.nationalID,
            branch: CurrentBranchService.getCurrentBranchID(),
        }

        try {
            const response = await ApiService.post(clientAPI, data)
            if (response.status == 201) {
                return response.data
            }
        } catch (error) {
            throw ClientError(error.response.status, error.response.data)
        }
    },

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