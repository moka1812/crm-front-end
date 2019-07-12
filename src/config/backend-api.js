const baseURL = process.env.VUE_APP_BASE_URL

export const loginApi = `${baseURL}/auth/token/`

export const refreshTokenApi = `${baseURL}/auth/token/refresh/`

export const getBranchAPI = `${baseURL}/branches/`

export const SAssetListAPI = `${baseURL}/sassets/`

export const CAssetsAPI = `${baseURL}/cassets/`

export const getClientByPhoneApi = `${baseURL}/client/get-client-by-phone/`

export const orderApi = `${baseURL}/orders/`

export const getOrderApi = `${baseURL}/orders/custom_list/`

export const orderFromStaffAPI = `${baseURL}/staffs/:id/orders/`

export const newNotificationFromUserIDAPI = `${baseURL}/staffs/:id/new_notification/`

export const notificationFromUserIDAPI = `${baseURL}/staffs/:id/notification/`

export const notificationAPI = `${baseURL}/notifications/`

export const callAPI = `${baseURL}/calls/`