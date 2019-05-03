import axios from 'axios'
import { TokenService } from './storage.service'
import store from '../store/store'
import { refreshTokenApi } from '../backend_api'

const PREFIX_TOKEN = 'Bearer'

const ApiService = {

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `${PREFIX_TOKEN} ${TokenService.getToken()}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        return axios.post(resource, data)
    },

    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    customRequest(data) {
        return axios(data)
    },

    // Stores the 404 interceptor position so that it can be later ejected when needed
    _404interceptor: null,

    mount404Interceptor() {
        this._404interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request.status == 404) {
                    
                    if (error.config.url.includes(refreshTokenApi)) {
                        
                        // Refresh token has failed. Logout the user
                        store.dispatch("auth/logout")
                        throw error

                    } else {

                        try {
                           //Refresh the access token
                           await store.dispatch("auth/refreshToken")

                           //Retry the original request
                           return this.customRequest({
                               method: error.config.method,
                               url: error.config.url,
                               data: error.config.data,
                           })
                        
                        } catch (error) {
                            // Refresh has failed - reject the original request
                            throw error
                        }
                        
                    }
                }
                // If error was not 404 just reject as is
                throw error
            }
        )
    },

    unmount404Interceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._404interceptor)
    }
}

export default ApiService