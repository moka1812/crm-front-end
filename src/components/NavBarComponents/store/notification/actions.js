import {
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_ERROR,

    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR,

    NOTIFICATION_UPDATING_REQUEST,
    NOTIFICATION_UPDATING_SUCCESS,
    NOTIFICATION_UPDATING_ERROR,
} from './types'

import { NotificationService, NotificationError } from '../../../../services/notification.service'

export default {
    async getNewNotification({commit}) {
        commit(NEW_NOTIFICATION_REQUEST)
        try {
            const result = await NotificationService.getNewNotification()
            commit(NEW_NOTIFICATION_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    async getNotification({commit}) {
        commit(NOTIFICATION_REQUEST)
        try {
            const result = await NotificationService.getNotification()
            commit(NOTIFICATION_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async readNotification({commit}, payload) {
        commit(NOTIFICATION_UPDATING_REQUEST)
        try {
            const result = await NotificationService.readNotification(payload.id)
            commit(NOTIFICATION_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
}