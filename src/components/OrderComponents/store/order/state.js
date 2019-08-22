export default function initialState () {
    return {
        
        //Order Creating Function
        orderCreating: false,
        orderCreatingResult: null,
        orderCreatingErrorCode: 0,
        orderCreatingError: '',

        //Order Detail
        orderUpdating: false,
        orderUpdatingResult: null,
        orderUpdatingErrorCode: 0,
        orderUpdatingError: '',

        //Order List Getting Function
        orderListRequest: false,
        orderListResult: [],
        orderListErrorCode: 0,
        orderListError: '',

        //Order Count
        orderCountResult: null,

        //Find order by phone
        orderFindingErrorCode: 0,
        orderFindingError: '',

        //Order Detail
        orderDetailForm: false,
        orderDetail: null,
        orderDetailErrorCode: 0,
        orderDetailError: '',

        //Temporary Saved Order
        temporaryOrderDetail: null,
    }
}