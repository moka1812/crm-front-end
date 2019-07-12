import ApiService from './api.service'
import { ProfileService } from './storage.service'
import { callAPI } from '../config/backend-api'
import moment from 'moment'

class CallError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CallService = {
    createCall: async function(newCall) {
        const data = {
            order: newCall.orderID,
            agent: ProfileService.getID(),
            call_type: newCall.callType,
            call_status: newCall.callStatus,
            start_time: newCall.startTime,
        }

        try {
            const response = await ApiService.post(callAPI, data)
            return response.data
        } catch (error) {
            throw CallError(error.response.status, error.response.data)
        }
    },

    updateCall: async function(callInfo) {

        const data = {
            call_status: callInfo.callStatus
        }

        const callID = callInfo.callID

        const has = Object.prototype.hasOwnProperty

        if (has.call(callInfo, 'talkTime')) {
            data.talk_time = callInfo.talkTime
        }

        if (has.call(callInfo, 'ringTime')) {
            data.ring_time = callInfo.ringTime
        }

        if (has.call(callInfo, 'endTime')) {
            data.end_time = callInfo.endTime
        }

        const url = `${callAPI}${callID}/`

        try {
            const response = await ApiService.patch(url, data)
            return response.data
        } catch (error) {
            throw CallError(error.response.status, error.response.data)
        }
    }
}

export default CallService
export { CallService, CallError }