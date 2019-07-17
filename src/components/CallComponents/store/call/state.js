export default function initialState() {
    return {
        windowOpen: false,
        callBox: false,
        dialPad: false,
        
        session: null,
        calling: false,
        ring: false,
        byEmployee: false,
        step: 'rest',
        error: '',
        
        //For update call table
        callUpdating: false,
        callID: null,

        orderID: null,
        customerPhone: '',
        customerName: '',
        requestType: '',
    }
}