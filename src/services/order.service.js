import ApiService from '../services/api.service'
import {ProfileService} from '../services/storage.service'
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

    createOrder : async function(newOrderInfo) {
        let data = {
            phone: newOrderInfo.phone,
            first_name: newOrderInfo.firstName,
            staff: ProfileService.getID(),
            required_amount: newOrderInfo.expectedAmount,
            proposed_amount: newOrderInfo.validatorAmount,
            status: "In Progress",
        }
        try {
            let response = await ApiService.post(createOrderApi, data)
            if (response.status == 201) {
                return response.data
            }
        } catch (error) {
            throw OrderError(error.response.status, error.response.data.detail)
        }
    }
}

export default OrderService

export { OrderService, OrderError }