import { TokenService, ProfileService, CurrentBranchService } from './storage.service';
import ApiService from '../services/api.service'
import { loginApi, refreshTokenApi } from '../config/backend-api'

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

            let profile = {
                name: response.data.name,
                id: response.data.id,
                branch: response.data.branch,
                branchID: response.data.branch_id,
            }
            ProfileService.saveProfile(profile)

            ApiService.setHeader()
            ApiService.mount403Interceptor()

            return {token: response.data.access, profile: profile}
        } catch (error) {
            if (error.response.data.hasOwnProperty("non_field_errors")) {
                if (error.response.data.non_field_errors == "Invalid username or password") {
                    throw new AuthenticationError(error.response.status, "Tài khoản hoặc mật khẩu không hợp lệ")
                }
            }
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
            },
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
        ApiService.unmount403Interceptor()
        CurrentBranchService.removeCurrentBranch()
        CurrentBranchService.removeCurrentBranchID()
    },
}

export default UserService

export { UserService, AuthenticationError }