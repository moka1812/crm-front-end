import Vue from 'vue'

import {
    CHANGE_DIALOG
} from './types'

export default {
    [CHANGE_DIALOG] (state, payload) {
        Vue.set(state,'dialog', payload.dialog)
    }
}