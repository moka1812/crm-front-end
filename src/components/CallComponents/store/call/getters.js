export default  {
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

    callErrorCode: (state) => {
        return state.callErrorCode
    },

    callError: (state) => {
        return state.callError
    },

    customerNumberPhone: (state) => {
        return state.customerNumberPhone
    },

    requestType: (state) => {
        return state.requestType
    },

}
