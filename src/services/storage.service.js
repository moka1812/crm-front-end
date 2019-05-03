const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const PROFILE = 'profile'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        localStorage.removeItem(REFRESH_TOKEN_KEY)
    }

}

const ProfileService = {
    saveProfile(profile) {
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getProfile() {
        return JSON.parse(localStorage.getItem(PROFILE))
    },

    removeProfile() {
        localStorage.removeItem(PROFILE)
    },

    setName(name) {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.name = name
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getName() {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? profile.name : null
    },

    setBranch(branch) {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.branch = branch
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getBranch() {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? profile.branch : null
    },
    
}

export { TokenService, ProfileService }
