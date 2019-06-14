const baseURL = "http://127.0.0.1:8000/api"

export const loginApi = `${baseURL}/auth/token/`
export const refreshTokenApi = `${baseURL}/auth/token/refresh/`

export const getBranchAPI = `${baseURL}/branches/`

export const SAssetListAPI = `${baseURL}/sassets/`

export const CAssetsAPI = `${baseURL}/cassets/`

export const getClientByPhoneApi = `${baseURL}/client/get-client-by-phone/`

export const orderApi = `${baseURL}/orders/`

export const getOrderApi = `${baseURL}/orders/custom_list/`

export const orderFromStaffAPI = `${baseURL}/staffs/:id/orders/`

export const newNotificationAPI = `${baseURL}/staffs/:id/new_notification/`

export const notificationAPI = `${baseURL}/staffs/:id/notification/`