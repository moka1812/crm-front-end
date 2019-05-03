import Vue from 'vue'

import {
    CHANGE_BRANCH
} from './types'

export default {
    [CHANGE_BRANCH] (state, branch) {
        Vue.set(state, 'current_branch', branch)
    }  
}