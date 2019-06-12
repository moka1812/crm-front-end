import stages from './stages'
import steps from './step_items'

const getStage = (step) => {
    switch(step) {
        case steps.UNCLAIMED:
            return [
                stages.NOT_ELIGIBLE,
                stages.SPAM,
                stages.UNCLAIMED
            ]
        case steps.PENDING:
            return [
                stages.SPAM,
                stages.DUPLICATE,
                stages.ORDER_CLAIMED
            ]
        case steps.CONTACT:
            return [
                stages.WAITING_FOR_MORE_INFO,
                stages.FRAUD,
                stages.CALL_AGAIN_LATER,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.WINDOW_SHOPPING,
                stages.UNABLE_TO_APPRAISE_LIQUIDATED,
                stages.NOT_ELIGIBLE,
                stages.NO_PICK_UP,
                stages.RATE_DISAGREEMENT,
                stages.TERMS_DISAGREEMENT,
                stages.NOT_IN_SERVICE_REGION
            ]
        case steps.QUOTED:
            return [
                stages.WAITING_FOR_RATE,
                stages.WAITING_FOR_MORE_INFO,
                stages.FRAUD,
                stages.CALL_AGAIN_LATER,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.UNABLE_TO_APPRAISE_LIQUIDATED,
                stages.NO_PICK_UP,
                stages.RATE_DISAGREEMENT,
                stages.TERMS_DISAGREEMENT,
                stages.NOT_IN_SERVICE_REGION,
            ]
        case steps.APPOINTMENT:
            return [
                stages.CALL_AGAIN_LATER,
                stages.MONEY_FROM_DIFFERENT_CHANNEL,
                stages.APPOINTMENT_1,
                stages.APPOINTMENT_2,
                stages.APPOINTMENT_3,
                stages.APPOINTMENT_4,
                stages.NO_SHOW,
                stages.NO_PICK_UP,
            ]
        case steps.CONTRACT:
            return [
                stages.FRAUD,
                stages.ACTIVE_CONTRACT,
                stages.NOT_ELIGIBLE,
                stages.RATE_DISAGREEMENT,
                stages.TERMS_DISAGREEMENT
            ]
    }
}

export {getStage}