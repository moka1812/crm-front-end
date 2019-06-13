import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,

    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_COUNT,
    ORDER_LIST_ERROR,

    ORDER_LIST_SHECDULE_REQUEST,
    ORDER_LIST_SHECDULE_SUCCESS,
    ORDER_LIST_SHECDULE_ERROR,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_ERROR
} from './types'

import { ClientService, ClientError } from '../../../../services/client.service'
import { OrderService, OrderError } from '../../../../services/order.service'

export default {

    async searchClient({commit}, payload) {
        commit(CLIENT_SEARCHING_REQUEST)
        try {

            let result = await ClientService.getClientByPhone(payload.phone)
            commit(CLIENT_SEARCHING_SUCCESS, {result})
            
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_SEARCHING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_SEARCHING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async clientReset({commit}) {
        commit(CLIENT_SEARCHING_RESET)
    },

    async createOrder({commit}, payload) {
        commit(ORDER_CREATING_REQUEST)
        try {
            let result = await OrderService.createOrder(payload)
            commit(ORDER_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderList({commit}) {
        commit(ORDER_LIST_REQUEST)
        try {
            let [result, count] = await OrderService.getOrderList()
            commit(ORDER_LIST_SUCCESS, {result})
            commit(ORDER_COUNT, {count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async planOrderList({commit}) {
        commit(ORDER_LIST_SHECDULE_REQUEST)
        try {
            let [result, count] = await OrderService.getOrderList()
            commit(ORDER_LIST_SHECDULE_SUCCESS, {result})
            commit(ORDER_COUNT, {count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_SHECDULE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_SHECDULE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderListFromStaff({commit}) {
        commit(ORDER_LIST_REQUEST)
        try {
            let [result, count] = await OrderService.getOrderListFromStaff()
            commit(ORDER_LIST_SUCCESS, {result})
            commit(ORDER_COUNT, {count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async planOrderListFromStaff({commit}) {
        commit(ORDER_LIST_SHECDULE_REQUEST)
        try {
            let [result, count] = await OrderService.getOrderListFromStaff()
            commit(ORDER_LIST_SHECDULE_SUCCESS, {result})
            commit(ORDER_COUNT, {count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_SHECDULE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_SHECDULE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderDetail({commit, getters}, payload) {
        commit(ORDER_DETAIL_REQUEST)
        let orderListResult = getters.orderListResult
        for (let order of orderListResult) {
            if (order.orderID == payload.orderID) {
                commit(ORDER_DETAIL_SUCCESS, {result: order})
                return true
            }
        }
        commit(ORDER_DETAIL_ERROR, {errorCode: 404, errorMessage: "Not found"})
    },

    async updateOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            let result = await OrderService.updateOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async claimOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            let result = await OrderService.claimOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async changeStage({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            let result = await OrderService.changeStage(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
}