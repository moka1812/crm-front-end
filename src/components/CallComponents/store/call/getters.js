export default  {
    enabled: (state) => {
        return state.enabled
    },

    session: (state) => {
        return state.session
    },
    
    windowOpen: (state) => {
        return state.windowOpen
    },
    
    callBox: (state) => {
        return state.callBox
    },

    dialPad: (state) => {
        return state.dialPad
    },

    calling: (state) => {
        return state.calling
    },

    ring: (state) => {
        return state.ring
    },

    step: (state) => {
        return state.step
    },

    error: (state) => {
        return state.error
    },

    callID: (state) => {
        return state.callID
    },

    callUpdating: (state) => {
        return state.callUpdating
    },

    orderID: (state) => {
        return state.orderID
    },

    customerPhone: (state) => {
        return state.customerPhone
    },

    customerName: (state) => {
        return state.customerName
    },

    requestType: (state) => {
        return state.requestType
    },

}
