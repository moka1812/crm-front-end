import ApiService from '../services/api.service'
import { clientAPI } from '../config/backend-api'
import { ProfileService, CurrentBranchService } from './storage.service'
import moment from 'moment'

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
            throw new ClientError(error.response.status, error.response.data)
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
                    data: this.filterRawClientList(response.data)
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
                    data: this.filterRawClientList(response.data)
                }
            }

        } catch (error) {
            throw new ClientError(error.response.status, error.response.data)
        }
    },

    filterRawClientList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")

                let dateOfBirth = null
                if (item.date_of_birth !== null) {
                    dateOfBirth = new moment(item.date_of_birth, "YYYY-MM-DD").format("DD/MM/YYYY")
                } 
                

                data.push({
                    id: item.id,
                    firstName: item.first_name,
                    lastName: item.last_name,
                    fullName: item.full_name,
                    fulladdress: item.fulladdress,
                    email: item.email,
                    created: created,
                    created_By: item.created_by,
                    createdName: item.created_name,
                    primaryPhone: item.primary_phone,
                    alternativePhone: item.alternative_phone,
                    address: item.address,
                    district: item.district,
                    city: item.city,
                    gender: item.gender,
                    dateOfBirth: dateOfBirth,
                    country: item.country,
                    nationalId: item.national_id,
                    occupation: item.occupation,
                    status: item.status,
                    lastUpdateBy: item.last_update_by,
                    note: item.note,
                    branch: item.branch,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default ClientService

export { ClientService, ClientError }