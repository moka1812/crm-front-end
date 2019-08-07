import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { AssetService, AssetError } from './asset.serivce'
import { orderApi, orderFromStaffAPI, contractApi, contractById } from '../config/backend-api'
import moment from 'moment'

class ContractError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ContractService = {

    getContractList: async function(page) {
        try {

            let url = contractApi
            if (page !== null && page !== 1) {
                url = `${contractApi}?page=${page}`
            }

            const response = await ApiService.get(url)

            const data = this.filterRawContractList(response.data)
            
            return {
                contracts: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractByContractId: async function(id) {
        try {

            const url = contractById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContract(response.data)
            
            return {
                contract: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw ContractError(error.response.status, error.response.data.detail)
        }
    },

    filterRawContract: function(item) {
        const data = []
        try {
            //Example created: "2019-05-31T14:16:03.932314+07:00"   
            const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            const closedDate = new moment(item.close_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

            data.push({
                contractID: item.id,
                createdDate: created,
                closedDate: closedDate,
                loanStatus: item.status,
                client: item.client,
                asset: item.asset,
                loanBalance: item.agent,
                interest: item.market_amount,
                storageID: item.branch,
                storageLocation: item.closed_branch,
            })
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    filterRawContractList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const closedDate = new moment(item.close_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    contractID: item.id,
                    createdDate: created,
                    closedDate: closedDate,
                    loanStatus: item.status,
                    client: item.client,
                    asset: item.asset,
                    loanBalance: item.agent,
                    interest: item.market_amount,
                    storageID: item.branch,
                    storageLocation: item.closed_branch,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export default ContractService

export { ContractService, ContractError }