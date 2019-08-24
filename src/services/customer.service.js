import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { AssetService, AssetError } from './asset.serivce'
import { deleteCustomerDocument, customerDoucument, customerBankAccout, customerSummary,
customerApi, customerById, customerDocumentApi, contractActive, contractClose, uploadBankAccout
,deleteBankAccout, updateBankAcout} from '../config/backend-api'
import moment from 'moment'

class CustomerError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CustomerService = {

    getCustomerList: async function(page) {
        try {

            let url = customerApi

            const response = await ApiService.get(url)

            const data = this.filterRawCustomerList(response.data)
            
            return {
                customers: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerByCustomerId: async function(id) {
        try {

            const url = customerById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCustomer(response.data)
            
            return {
                customer: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerDoucument: async function(id) {
        try {

            const url = customerDoucument.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawDocumnetList(response.data)
            
            return {
                docs: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    deleteCustomerDocument:  async function(id) {
        try {

            const url = deleteCustomerDocument.replace(":id", id)

            const responsedelete = await ApiService.delete(url)
            
            return {
                docs: responsedelete.data,
            }

        } catch (error) {

            throw new CustomerError(error.responsedelete.status, error.responsedelete.data.detail)
        }
    },

    uploadCustomerDocument: async function(data) {
        try {
            const currentUserID = ProfileService.getID()
            data.append('uploader', currentUserID)

            const response = await ApiService.post(customerDocumentApi, data)
            
            return {
                docs: response.data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerSummary: async function(id) {
        try {

            const url = customerSummary.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawSummary(response.data)

            const total = this.filterTotalSummary(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getContractActive: async function(id) {
        try {

            const url = contractActive.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContractActive(response.data)

            return {
                cus: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getContractClose: async function(id) {
        try {

            const url = contractClose.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContractClose(response.data)

            return {
                cus: data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerCollectoralInfo: async function(id) {
        try {

            const url = customerCollectoralInfo.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCollectoralInfo(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },
    // get bank accout
    getBankAccout: async function(id) {

        try {

            const url = customerBankAccout.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawBankAccout(response.data)
            
            return {
                cus: data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }

    },

    // upload client bank
    deleteBankAccout: async function(id) {
        try {
            const url = deleteBankAccout.replace(":id", id)

            const response = await ApiService.delete(url)
            
            return {
                cus: response.data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    // delete client bank
    uploadBankAccout: async function(data) {
        try {

            const response = await ApiService.post(uploadBankAccout, data)
            
            return {
                cus: response.data,
            }

        } catch (error) {

            throw CustomerError(error.response.status, error.response.data.detail)
        }
    },

    // delete client bank
    updateBankAccout: async function(id, data) {
    try {

        const url = updateBankAcout.replace(":id", id)


        const response = await ApiService.put(url, data)
        
        return {
            cus: response.data,
        }

    } catch (error) {

        throw CustomerError(error.response.status, error.response.data.detail)
    }
    },

    filterRawBankAccout: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                data.push({
                    id: item.id,
                    name: item.bank_account_name,
                    bank: item.bank_name,
                    bank_accout: item.bank_account_no,
                    branch: item.bank_branch,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawCustomer: function(item) {
        let data = null;
        try {
            data = {
                id: item.id,
                fullName: item.full_name,
                primaryPhone: item.primary_phone,
                alternativePhone: item.alternative_phone,
                address: item.address + " " + item.district+ " " + item.city,
            };
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    filterRawCustomerList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")
                const closedDate = new moment(item.close_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD/MM/YYYY")

                data.push({
                    id: item.id,
                    customerId: item.mifos_id,
                    customerName: item.first_name +' '+ item.last_name,
                    externalId: closedDate,
                    status: item.status,
                    office: item.client,
                    lastContact: item.asset,
                    matures_date: item.agent,
                    activeLoan: item.market_amount,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawDocumnetList: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    id: item.id,
                    uploader: item.uploader_name,
                    create_date: created,
                    last_update: item.status,
                    link: item.s3_path,
                    document: item.doc_type
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractActive: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                // Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.due_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const type = item.acssetId === null ? '' : item.asset_description
                data.push({
                    contractId: item.mifos_id,
                    loan_accout: item.interest_value,
                    paid_date: created,
                    assset_type:  '',
                    storage_location: item.branch_name,
                    status: item.status,
                    loan_balance: item.approved_amount
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractClose: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                // Example created: "2019-05-31T14:16:03.932314+07:00"   
                const dueDate = new moment(item.due_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const type = item.asset_type === null ? '' : item.asset_description
                if (type.length > 30) {
                    type = type.substring(0, 30) + '...'
                }
                const store = item.storage_id === null ? '' : item.branch_name
                data.push({
                    contractId: item.mifos_id,
                    loan_accout: item.interest_value,
                    paid_date: dueDate,
                    assset_type:  type,
                    storage_location: store,
                    status: item.status,
                    loan_balance: item.approved_amount
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

}

export default CustomerService

export { CustomerService, CustomerError }