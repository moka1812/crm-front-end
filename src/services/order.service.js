import ApiService from './api.service'
import { ProfileService } from './storage.service'
import { createOrderApi, orderListApi } from '../backend_api'

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
    },

    filterRawOrderList: function(rawData) {
        let data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"
                let createdYear = item.created.substring(0,4)
                let createMonth = item.created.substring(5,7)
                let createDay   = item.created.substring(8,10)
    
                let created = `${createDay}/${createMonth}/${createdYear}`
    
                data.push({
                    orderID: item.id,
                    phone: item.phone,
                    name: item.first_name,
                    client: item.client,
                    staff: item.staff,
                    staffName: item.staff_name,
                    requiredAmount: item.required_amount,
                    marketAmount: item.market_amount,
                    proposedAmount: item.proposed_amount,
                    approvedAmount: item.approved_amount,
                    createdDate: created,
                    appointment: item.appointment,
                    dateClaim: item.date_claim,
                    lastModify: item.last_modify,
                    tagId: item.tag_id,
                    status: item.status,
                    asset: item.asset,
                    stage: item.stage,
                    step: item.step
                })
            }
            return data
        } catch (error) {
            console.log(error)
        }
        
    },

    getOrderList: async function() {
        try {

            let response = await ApiService.get(orderListApi)

            let unclaimedPromise = new Promise((resolve, reject) => {
                let data = this.filterRawOrderList(response.data["unclaimed"])
                resolve(data)
            })

            let inprogressPromise = new Promise((resolve, reject) => {
                let data = this.filterRawOrderList(response.data["inprogress"])
                resolve(data)
            })

            let [unclaimed, inprogress] = await Promise.all([
                unclaimedPromise,
                inprogressPromise
            ])

            return unclaimed.concat(inprogress)

        } catch (error) {

            throw OrderError(error.response.status, error.response.data.detail)
        }
    }
}

export default OrderService

export { OrderService, OrderError }