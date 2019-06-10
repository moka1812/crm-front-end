<template>
    <v-container fluid>
        <v-layout>
            <v-flex sm6>
                <unclaimed-button v-if="orderStep == 'Unclaimed'" :stages="this.stages"/>
                <pending-buton v-else-if="orderStep == 'Pending'" :stages="this.stages"/>
                <appointment-button v-else-if="orderStep == 'Appointment'" :stages="this.stages"/>
                <contact-button v-else-if="orderStep == 'Contact'" :stages="this.stages"/>
                <quoted-button v-else-if="orderStep == 'Quoted'" :stages="this.stages"/>
                <contract-button v-else-if="orderStep == 'Contract'" :stages="this.stages"/>
            </v-flex>
            <v-flex sm6>
                <v-btn flat icon>
                    <v-icon color="#f73d3d">stars</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import UnclaimedButton from "@/components/OrderComponents/ActionButtonComponent/UnclaimedButton.vue"
import PendingButon from "@/components/OrderComponents/ActionButtonComponent/PendingButton.vue"
import AppointmentButton from "@/components/OrderComponents/ActionButtonComponent/AppointmentButton.vue"
import ContactButton from "@/components/OrderComponents/ActionButtonComponent/ContactButton.vue"
import QuotedButton from "@/components/OrderComponents/ActionButtonComponent/QuotedButton.vue"
import ContractButton from "@/components/OrderComponents/ActionButtonComponent/ContractButton.vue"

import {getStage} from '../stage_functions'

export default {
    name: "action-button",
    components: {
        UnclaimedButton,
        PendingButon,
        AppointmentButton,
        ContactButton,
        QuotedButton,
        ContractButton
    },
    props: {
        id: Number,
        step: String
    },
    data() {
        return {
            orderId: this.id,
            orderStep: this.step
        }
    },
    computed: {
        stages() {
            let stages = getStage(this.step)
            
            let result = []
            for (let stage of stages) {
                result.push({
                    title: stage.vi
                })
            }

            return result
        }
    }
}
</script>

<style scoped>

</style>
 