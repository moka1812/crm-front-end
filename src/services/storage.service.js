const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const PROFILE = 'profile'
const CURRENT_BRANCH = 'current_branch'
const VOIP_ACCOUNT = 'voip_account'
const VOIP_PASSWORD = 'voip_password'

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

const VOIPUserService = {
    saveUsername(username) {
        window.$cookies.set(VOIP_ACCOUNT, username)
    },

    getUsername() {
        return window.$cookies.get(VOIP_ACCOUNT)
    },

    removeUsername() {
        window.$cookies.remove(VOIP_ACCOUNT);
    },

    savePassword(password) {
        window.$cookies.set(VOIP_PASSWORD, password)
    },

    getPassword() {
        return window.$cookies.get(VOIP_PASSWORD)
    },

    removePassword() {
        window.$cookies.remove(VOIP_PASSWORD);
    },
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
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.name = name
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getName() {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? profile.name : null
    },

    setID(id) {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.id = id
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getID() {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? parseInt(profile.id) : null
    },

    setBranch(branch) {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.branch = branch
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getBranch() {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? profile.branch : null
    },

    setBranchID(branchID) {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        profile.branchID = branchID
        localStorage.setItem(PROFILE, JSON.stringify(profile))
    },

    getBranchID() {
        const profile = JSON.parse(localStorage.getItem(PROFILE))
        return profile ? parseInt(profile.branchID) : null
    },

}

const CurrentBranchService = {
    getCurrentBranch() {
        return JSON.parse(localStorage.getItem(CURRENT_BRANCH));
    },

    saveCurrentBranch(currentBranch) {
        localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
    },
    removeCurrentBranch() {
        localStorage.removeItem(CURRENT_BRANCH);
    },

    getCurrentBranchID() {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        return currentBranch ? currentBranch.id : null
    },

    saveCurrentBranchID(currentBranchID) {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        currentBranch.id = currentBranchID
        localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
    },

    getCurrentBranchName() {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        return currentBranch ? currentBranch.name : null
    },

    saveCurrentBranchName(currentBranchName) {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        currentBranch.name = currentBranchName
        localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
    },
}

VOIPUserService.saveUsername(1002)
VOIPUserService.savePassword('.Z!T$^x*^A')
export { TokenService, ProfileService, CurrentBranchService, VOIPUserService }