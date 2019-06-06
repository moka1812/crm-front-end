import ApiService from './api.service'
import { ProfileService } from './storage.service'
import { orderApi, CAssetsAPI } from '../config/backend_api'
import moment from 'moment'

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
        let CAssetData = {
            asset: newOrderInfo.assetTypeID,
            description: newOrderInfo.assetTypeDescription
        }
        let CAsset;
        try {
            let response = await ApiService.post(CAssetsAPI, CAssetData)
            CAsset = response.data 
        } catch (error) {
            throw OrderError(error.response.status, error.response.data.detail)
        }
        let data = {
            phone: newOrderInfo.phone,
            first_name: newOrderInfo.firstName,
            staff: ProfileService.getID(),
            required_amount: newOrderInfo.expectedAmount,
            proposed_amount: newOrderInfo.validatorAmount,
            source: newOrderInfo.source,
            asset: CAsset.id,
            branch: newOrderInfo.branchID,
            date_claim: moment().format("YYYY-MM-DD HH:mm"),
            status: "In Progress",
            step: "Pending",
            stage: "Order Claimed",
        }
        try {
            let response = await ApiService.post(orderApi, data)
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
                let created = new moment(item.created).format("DD-MM-YYYY HH:MM")
                let lastModify = new moment(item.last_modify).format("DD-MM-YYYY HH:MM")
    
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
                    supporter: item.support_agent,
                    createdDate: created,
                    appointment: item.appointment,
                    dateClaim: item.date_claim,
                    lastModify: lastModify,
                    tagId: item.tag_id,
                    status: item.status,
                    asset: item.asset_type,
                    stage: item.stage,
                    step: item.step
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
        
    },

    getOrderList: async function() {
        try {

            let response = await ApiService.get(orderApi)

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