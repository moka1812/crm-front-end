import ApiService from '../services/api.service'
import { ProfileService } from './storage.service'
import { newNotificationAPI } from '../config/backend-api'

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

        const url = newNotificationAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return response.data.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    getNotification: async function () {

        const id = ProfileService.getID()

        const url = newNotificationAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return response.data.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    }
}

export default NotificationService

export { NotificationService, NotificationError }