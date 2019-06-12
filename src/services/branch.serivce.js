import ApiService from './api.service'
import { getBranchAPI } from '../config/backend-api'

class BranchError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const BranchService = {
    getAllBranch: async function () {
        try {
            let response = await ApiService.get(getBranchAPI)
            let result = await this.filterRawBranchList(response.data)
            return result
        } catch (error) {
            throw new BranchError(error.response.status, error.response.data)
        }
    },

    filterRawBranchList: function(rawData) {
        let data = []
        try {
            for (let item of rawData) {
                data.push({
                    id: item.id,
                    name: item.branch_name,
                    address: item.branch_address,
                })
            }
            return data
        } catch (error) {
            throw error
        }
    }
}

export default BranchService

export { BranchService, BranchError }