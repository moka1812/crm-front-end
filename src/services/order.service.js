import ApiService from '../services/api.service'
import { createOrderApi } from '../backend_api'

class OrderError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const OrderService = {

    create : async function(newOrderInfo) {
        let data = {
            phone: newOrderInfo.phone,
            first_name: newOrderInfo.firstName,
            required_amount: newOrderInfo.expectedAmount,
            proposed_amount: newOrderInfo.validatorAmount,
            status: "In Progress",
        }

        try {
            let response = await ApiService.post(createOrderApi, data)
        } catch (error) {
            
        }
    }
}