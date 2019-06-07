import stages from './ActionButtonComponent/stages'

const UNCLAIMED = "Unclaimed"
const PENDING = "Pending"
const CONTACT = "Contact"
const QUOTED = "Quoted"
const APPOINTMENT = "Appointment"
const CONTRACT = "Contract"

export default (step) => {
    switch(step) {
        case UNCLAIMED:
            return [
                stages.NOT_ELIGIBLE,
                stages.SPAM,
                stages.UNCLAIMED
            ]
        case PENDING:
            return [
                stages.WINDOW_SHOPPING,
                stages.DUPLICATE,
                stages.SPAM,
                stages.ORDER_CLAIMED
            ]
        case CONTACT:
            return [
                stages.NOT_ELIGIBLE,
                stages.NOT_IN_SERVICE_REGION,
                stages.NO_PICK_UP,
                stages.WINDOW_SHOPPING,
                stages.UNABLE_TO_APPRAISE_LIQUIDATED,
                stages.RATE_DISAGREEMENT,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.TERMS_DISAGREEMENT,
                stages.CALL_AGAIN_LATER,
                stages.WAITING_FOR_MORE_INFO,
                stages.WRONG_INFO
            ]
        case QUOTED:
            return [
                stages.UNABLE_TO_APPRAISE_LIQUIDATED,
                stages.RATE_DISAGREEMENT,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.TERMS_DISAGREEMENT,
                stages.CALL_AGAIN_LATER,
                stages.WAITING_FOR_MORE_INFO,
                stages.CONSIDERING,
                stages.WAITING_FOR_RATE,
                stages.FRAUD
            ]
        case APPOINTMENT:
            return [
                stages.NO_PICK_UP,
                stages.NO_SHOW,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.CALL_AGAIN_LATER,
                stages.CONSIDERING,
                stages.APPOINTMENT_1,
                stages.APPOINTMENT_2,
                stages.APPOINTMENT_3,
                stages.APPOINTMENT_4,
                stages.CUSTOMER_PENDING
            ]
        case CONTRACT:
            return [
                stages.NOT_ELIGIBLE,
                stages.RATE_DISAGREEMENT,
                stages.TERMS_DISAGREEMENT,
                stages.FRAUD,
                stages.ACTIVE_CONTRACT
            ]
    }
}