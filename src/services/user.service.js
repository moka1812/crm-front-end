import { TokenService, ProfileService } from './storage.service';
import ApiService from '../services/api.service'
import { loginApi, refreshTokenApi } from '../backend_api'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    login: async function(username, password) {
        
        let requestData = {
            method: 'post',
            url: loginApi,
            data: {
                username: username,
                password: password
            },
        }
        
        try {
            let response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access)
            TokenService.saveRefreshToken(response.data.refresh)

            let profile = {name: response.data.fullname, branch: response.data.branch}
            ProfileService.saveProfile(profile)

            ApiService.setHeader()
            ApiService.mount404Interceptor()

            return {token: response.data.access, profile: profile}
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    refreshToken: async function() {
        let refreshToken = TokenService.getRefreshToken()

        let requestData = {
            method: 'post',
            url: refreshTokenApi,
            data: {
                refresh: refreshToken
            }
        }

        try {
            let response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.access)
            ApiService.setHeader()
            return response.data.access
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    logout() {
        TokenService.removeToken()
        ProfileService.removeProfile()
        ApiService.removeHeader()
        ApiService.unmount404Interceptor()
    },
}

export default UserService

export { UserService, AuthenticationError }