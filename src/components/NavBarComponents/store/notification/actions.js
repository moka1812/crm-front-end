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

    SET_APPOINTMENT,
} from './types'

import { NotificationService, NotificationError } from '../../../../services/notification.service'
import vue from '../../../../main'
import moment from 'moment'

export default {
    async getNewNotification({commit, getters}) {
        const oldNotificationResult = getters.newNotificationResult
        const oldNotificationResultID = oldNotificationResult.map((item) => item.id)
        let newNotificationResultFilter

        commit(NEW_NOTIFICATION_REQUEST)
        try {
            const result = await NotificationService.getNewNotification()
            commit(NEW_NOTIFICATION_SUCCESS, {result})
            newNotificationResultFilter = result.filter((item) => {
                return !oldNotificationResultID.includes(item.id)
            })
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        newNotificationResultFilter.forEach((element) => {
            vue.$notify({
              group: 'new-notification',
              type: 'error',
              title: element.order,
              text: {
                message: element.message,
                id: element.id
              },
              id: 100,
              speed: 2000
            });
        })
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

    async readNotification({commit}, {id}) {
        commit(NOTIFICATION_UPDATING_REQUEST)
        try {
            const result = await NotificationService.readNotification(id)
            commit(NOTIFICATION_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NOTIFICATION_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NOTIFICATION_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async setAppointment({commit, getters}, {orderAppointments}) {
        const oldAppointments = getters.appointments
        const has = Object.prototype.hasOwnProperty

        //[{orderID: id1, appointment:.., isRead:.., }, {orderID: id2, appointment:.., isRead:.., }] => {id1: index, id2:index}
        const oldAppointmentID = oldAppointments.reduce((obj, item, index) => (obj[item.key] = index, obj) ,{});

        for (let orderAppointment of orderAppointments) {
            let appointmentDate = null

            if (has.call(oldAppointmentID, orderAppointment.orderID)) {
                const index = oldAppointmentID[orderAppointment.orderID]

                const oldAppointment = oldAppointments[index]

                //Showed
                if (oldAppointment.isShowed) {
                    continue
                }
                //Get new Appointment Date when has changed
                if (oldAppointment.appointment != orderAppointment.appointment) {
                    appointmentDate = new moment(orderAppointment.appointment, "DD/MM/YYYY HH:mm")
                } else {
                    //Get old Appointment Date
                    appointmentDate = new moment(oldAppointment.appointment, "DD/MM/YYYY HH:mm")
                }
            //New Order Appoinment
            } else {
                if (orderAppointment.appointment !== null) {
                    appointmentDate = new moment(orderAppointment.appointment, "DD/MM/YYYY HH:mm")
                }
            }
            
            if (appointmentDate !== null) {
                //Get Current DateTime
                const currentDateTime = new moment()

                const duration = currentDateTime.diff(appointmentDate, 'minutes');

                //Less than 30 minutes, can show notification
                if (duration <= 30) {
                    appointment.shouldShow = true
                }
            }
        }

        for (let appointment of orderAppointments) {
            if (appointment.shouldShow == true && appointment.isShowed == false) {
                vue.$notify({
                    group: 'new-notification',
                    type: 'error',
                    title: appointment.orderID,
                    text: {
                      message: "Có lịch hẹn",
                      id: null
                    },
                    id: 100,
                    speed: 2000
                });
                appointment.isShowed = true
            }
        }

        commit(SET_APPOINTMENT, {appointments: orderAppointments})
    }
}