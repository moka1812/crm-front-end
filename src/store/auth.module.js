import { UserService, AuthenticationError } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'

const state =  {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: ''
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    }
}

const actions = {
    async login({commit}, payload) {
        commit('loginRequest')
        try {
            let token = await UserService.login(payload.google_token)
            commit('loginSuccess', token)
            return true
        } catch (error) {
            if (error instanceof AuthenticationError) {
                commit('loginError', {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit('loginError', {errorCode: 500, errorMessage: "Undefined"})
            }
            return false
        }
    },

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('login')
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },
    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorCode == 400 ? 'User not defined' : errorMessage
    },
    logoutSuccess(state) {
        state.accessToken = ''
    }
}


export const moduleAuth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}