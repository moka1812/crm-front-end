import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,

    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_ERROR
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
            let result = OrderService.createOrder(payload)
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
            let result = await OrderService.getOrderList()
            commit(ORDER_LIST_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
}