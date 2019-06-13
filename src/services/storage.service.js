const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const PROFILE = 'profile'
const CURRENT_BRANCH = 'current_branch'
const CURRENT_BRANCH_ID = 'current_branch_id'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through window instace.
**/
const TokenService = {
    getToken() {
        return window.$cookies.get(TOKEN_KEY);
        //return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        window.$cookies.set(TOKEN_KEY, accessToken);
        //localStorage.setItem(TOKEN_KEY, accessToken)
    },

    removeToken() {
        window.$cookies.remove(TOKEN_KEY);
        //localStorage.removeItem(TOKEN_KEY)
    },

    getRefreshToken() {
        return window.$cookies.get(REFRESH_TOKEN_KEY);
        //return localStorage.getItem(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        window.$cookies.set(REFRESH_TOKEN_KEY, refreshToken);
        //localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        window.$cookies.remove(REFRESH_TOKEN_KEY);
        //localStorage.removeItem(REFRESH_TOKEN_KEY)
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

    setID(id) {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.id = id
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getID() {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? parseInt(profile.id) : null
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

    setBranchID(branchID) {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.branchID = branchID
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getBranchID() {
        let profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? parseInt(profile.branchID) : null
    },

}

const CurrentBranchService = {
    getCurrentBranch() {
        return localStorage.getItem(CURRENT_BRANCH);
    },

    saveCurrentBranch(currentBranch) {
        localStorage.setItem(CURRENT_BRANCH, currentBranch)
    },
    removeCurrentBranch() {
        localStorage.removeItem(CURRENT_BRANCH);
    },
    getCurrentBranchID() {
        return localStorage.getItem(CURRENT_BRANCH_ID);
    },

    saveCurrentBranchID(currentBranchID) {
        localStorage.setItem(CURRENT_BRANCH_ID, currentBranchID)
    },
    removeCurrentBranchID() {
        localStorage.removeItem(CURRENT_BRANCH_ID);
    },
}

export { TokenService, ProfileService, CurrentBranchService }
