const baseURL = "http://127.0.0.1:8000/api"

export const loginApi = `${baseURL}/auth/token/`
export const refreshTokenApi = `${baseURL}/auth/token/refresh/`

export const getBranchAPI = `${baseURL}/branches/`

export const getClientByPhoneApi = `${baseURL}/client/get-client-by-phone/`

export const createOrderApi = `${baseURL}/orders/`
export const orderListApi = `${baseURL}/listorders/`
