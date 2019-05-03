import {
    CHANGE_DIALOG
} from './types'

export default {
    async changeDialog ({ commit }, payload) {
        await commit(CHANGE_DIALOG, payload)
    }
}