import ApiService from '../services/api.service'
import { ProfileService } from './storage.service'
import { newNotificationFromUserIDAPI, notificationFromUserIDAPI, notificationAPI } from '../config/backend-api'

class NotificationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const NotificationService = {
    getNewNotification: async function () {

        const id = ProfileService.getID()

        const url = newNotificationFromUserIDAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return response.data.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    getNotification: async function () {

        const id = ProfileService.getID()

        const url = notificationFromUserIDAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return response.data.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    readNotification: async function (id) {

        const url = `${notificationAPI}${id}/`
        const data = {
            readable: true
        }

        try {

            const response = await ApiService.patch(url, data)
            return response.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
        
    }
}

export default NotificationService

export { NotificationService, NotificationError }