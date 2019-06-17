import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { AssetService, AssetError } from './asset.serivce'
import { orderApi, orderFromStaffAPI, getOrderApi } from '../config/backend-api'
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
        const CAssetData = {
            asset: newOrderInfo.assetTypeID,
            description: newOrderInfo.assetTypeDescription
        }
        let CAsset;

        try {
            CAsset = await AssetService.createCAsset(CAssetData)
        } catch (error) {
            if (error instanceof AssetError) {
                throw OrderError(error.errorCode, error.message)
            }
        }
        const data = {
            phone: newOrderInfo.phone,
            first_name: newOrderInfo.firstName,
            staff: ProfileService.getID(),
            source: newOrderInfo.source,
            asset: CAsset.id,
            branch: CurrentBranchService.getCurrentBranchID(),
            date_claim: moment().format("YYYY-MM-DD HH:mm"),
            status: "In Progress",
            step: "Pending",
            stage: "Order Claimed",
        }

        if (newOrderInfo.expectedAmount != null) {
            data.required_amount = newOrderInfo.expectedAmount
        }

        if (newOrderInfo.validatorAmount != null) {
            data.proposed_amount = newOrderInfo.validatorAmount
        }

        try {
            const response = await ApiService.post(orderApi, data)
            if (response.status == 201) {
                return response.data
            }
        } catch (error) {
            console.log(error.response.data)
            throw OrderError(error.response.status, error.response.data.detail)
        }
    },

    updateOrder: async function(orderInfo) {

        let CAssetID = orderInfo.CAssetID
        let CAssetData = {
            asset: orderInfo.assetTypeID,
            description: orderInfo.assetTypeDescription
        }

        AssetService.updateCAsset(CAssetID, CAssetData)

        let orderID = orderInfo.orderID

        let orderData = {
            phone: orderInfo.phone,
            first_name: orderInfo.name,
            asset: orderInfo.CAssetID,
            source: orderInfo.source,
            step: orderInfo.step,
            stage: orderInfo.stage,
            note: orderInfo.note,
            status: orderInfo.status,
            appointment: orderInfo.appointmentDateTime,
        }

        let currentUserID = ProfileService.getID()

        if (currentUserID != orderInfo.staff) {
            orderData.support_agent = currentUserID
        }

        if (orderInfo.expectedAmount != null) {
            orderData.required_amount = orderInfo.expectedAmount
        }

        if (orderInfo.validatorAmount != null) {
            orderData.proposed_amount = orderInfo.validatorAmount
        }

        let url = `${orderApi}${orderID}/`
        try {
            let response = await ApiService.put(url, orderData)
            return response.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data)
            throw OrderError(error.response.status, error.response.data)
        }
        
    },

    claimOrder: async function(data) {
        const orderID = data.orderID

        const orderData = {
            staff: ProfileService.getID(),
            phone: data.phone,
            branch: CurrentBranchService.getCurrentBranchID(),
            asset: data.assetID,
            step: "Pending",
            stage: "Order Claimed",
            status: "In Progress",
        }

        const url = `${orderApi}${orderID}/`
        try {
            const response = await ApiService.patch(url, orderData)
            return response.data
        } catch (error) {
            console.log( error.response.data)
            throw OrderError(error.response.status, error.response.data)
        }
    },

    changeStage: async function(data) {
        let orderID = data.orderID

        let orderData = {
            phone: data.phone,
            asset: data.assetID,
            stage: data.stage,
            status: data.status
        }

        let currentUserID = ProfileService.getID()

        if (currentUserID != data.staff) {
            orderData.support_agent = currentUserID
        }

        let url = `${orderApi}${orderID}/`
        try {
            let response = await ApiService.put(url, orderData)
            return response.data
        } catch (error) {
            console.log( error.response.data)
            throw OrderError(error.response.status, error.response.data)
        }
    },

    getOrderList: async function() {
        try {

            let response = await ApiService.get(getOrderApi)

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

            return [unclaimed.concat(inprogress), response.data['count']]

        } catch (error) {

            throw OrderError(error.response.status, error.response.data.detail)
        }
    },
    getOrderListFromStaff: async function() {
        const id = ProfileService.getID()

        const url = orderFromStaffAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)

            const result = await this.filterRawOrderList(response.data.data) 

            return [result, response.data['count']]

        } catch (error) {

            throw OrderError(error.response.status, error.response.data)
        }
    },
    getOrderDetail: async function (id) {
        const orderUrl = `${orderApi}${id}/`
        
        try {
            const response = await ApiService.get(orderUrl)
            const result = await this.filterRawOrderList([response.data]) 
            return result[0]
        } catch (error) {
            throw OrderError(error.response.status, error.response.data)
        }
    },

    findOrderByPhone: async function(phone) {
        const orderUrl = `${orderApi}?phone=${phone}`

        try {
            const response = await ApiService.get(orderUrl)
            const data = this.filterRawOrderList(response.data)
            return data
        } catch (error) {
            throw OrderError(error.response.status, error.response.data.detail)
        }
    },

    filterRawOrderList: function(rawData) {
        let data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const lastModify = new moment(item.last_modify.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    orderID: item.id,
                    phone: item.phone,
                    name: item.first_name,
                    client: item.client,
                    staff: item.staff,
                    agent: item.staff_name,
                    expectedAmount: item.required_amount,
                    branchName: item.branch_name,
                    marketAmount: item.market_amount,
                    validatorAmount: item.proposed_amount,
                    approvedAmount: item.approved_amount,
                    supporter: item.support_agent,
                    support_agent_name: item.support_agent_name,
                    createdDate: created,
                    appointment: item.appointment,
                    dateClaim: item.date_claim,
                    lastModify: lastModify,
                    tagId: item.tag_id,
                    assetID: item.asset,
                    asset: item.asset_type,
                    assetDescription: item.asset_description,
                    stage: item.stage,
                    step: item.step,
                    source: item.source,
                    note: item.note
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
        
    },

}

export default OrderService

export { OrderService, OrderError }