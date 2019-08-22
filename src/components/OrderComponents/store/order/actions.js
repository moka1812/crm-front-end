import {
    TURN_OFF_DIALOG,

    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_COUNT,
    ORDER_LIST_ERROR,

    ORDER_FINDING_REQUEST,
    ORDER_FINDING_SUCCESS,
    ORDER_FINDING_ERROR,

    ORDER_LIST_SHECDULE_REQUEST,
    ORDER_LIST_SHECDULE_SUCCESS,
    ORDER_LIST_SHECDULE_ERROR,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_ERROR,

    TEMPORARY_ORDER_SAVING_REQUEST,
} from './types'

import { OrderService, OrderError } from '../../../../services/order.service'

const has = Object.prototype.hasOwnProperty

export default {

    async createOrder({commit}, payload) {
        commit(ORDER_CREATING_REQUEST)
        try {
            const result = await OrderService.createOrder(payload)
            commit(ORDER_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async turnOffDialog({commit}) {
        commit(TURN_OFF_DIALOG)
    },

    async resetOrderList({commit}) {
        commit(ORDER_LIST_RESET)
    },

    async findOrderByPhone({commit}, payload) {
        if (/^\s*$/.test(payload.phone)) {
            //Refresh Order
            commit(ORDER_FINDING_ERROR, {errorCode: 1, errorMessage: ''})
        } else {
            commit(ORDER_FINDING_REQUEST)
            try {
                const result = await OrderService.findOrderByPhone(payload.phone)
                commit(ORDER_FINDING_SUCCESS, {result})
                commit(ORDER_COUNT, {count: null})
            } catch (error) {
                if (error instanceof OrderError) {
                    commit(ORDER_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
                } else {
                    commit(ORDER_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
                }
            }
        }
    },

    async getOrderList({commit}, payload) {
        commit(ORDER_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {orders, count} = await OrderService.getOrderList(page)
            commit(ORDER_LIST_SUCCESS, {orders})
            commit(ORDER_COUNT, {count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async planOrderList({commit}, payload) {
        commit(ORDER_LIST_SHECDULE_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {orders, count} = await OrderService.getOrderList(page)
            commit(ORDER_LIST_SHECDULE_SUCCESS, {orders})
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
            const {orders, count} = await OrderService.getOrderListFromStaff()
            commit(ORDER_LIST_SUCCESS, {orders})
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
            const {orders, count} = await OrderService.getOrderListFromStaff()
            commit(ORDER_LIST_SHECDULE_SUCCESS, {orders})
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
        const orderListResult = getters.orderListResult
        for (let order of orderListResult) {
            if (order.orderID == payload.orderID) {
                commit(ORDER_DETAIL_SUCCESS, {order})
                return true
            }
        }
        commit(ORDER_DETAIL_ERROR, {errorCode: 404, errorMessage: "Not found"})
    },

    async getOrderDetailFromNotification({commit}, payload) {
        commit(ORDER_DETAIL_REQUEST)
        try {
            const order = await OrderService.getOrderDetail(payload.id)
            commit(ORDER_DETAIL_SUCCESS, {order})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
        
    },

    async updateOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.updateOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async claimOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.claimOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async changeStage({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.changeStage(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    saveOrderTemporarily({commit}, payload) {
        commit(TEMPORARY_ORDER_SAVING_REQUEST, {orderDetail: payload.orderDetail})
    },

    removeTemporaryOrder({commit}) {
        commit(TEMPORARY_ORDER_SAVING_REQUEST, {orderDetail: null})
    },
}