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
    validate:  function(newOrderInfo) {
        
    },

    create : async function(newOrderInfo) {
        let requestData = {
            method: 'post',
            url: createOrderApi,
            data: newOrderInfo
        }

        try {
            let response = await ApiService.customRequest(requestData)
        } catch (error) {
            
        }
    }
}