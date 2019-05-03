import {
    CHANGE_BRANCH
} from './types'

export default {
    async changeBranch ({ commit }, payload) {
        await commit(CHANGE_BRANCH, payload.branch)
    }
}