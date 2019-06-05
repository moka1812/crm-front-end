<template>
    <div>
        <unclaimed-button v-if="orderStep == 'Unclaimed'" />
        <pending-buton v-else-if="orderStep == 'Pending'" />
        <appointment-button v-else-if="orderStep == 'Appointment'" />
        <contact-button v-else-if="orderStep == 'Contact'" />
        <quoted-button v-else-if="orderStep == 'Quoted'" />
        <contract-button v-else-if="orderStep == 'Contract'" />

        <v-btn flat icon>
            <v-icon color="#f73d3d">stars</v-icon>
        </v-btn>
    </div>
</template>

<script>
import UnclaimedButton from "@/components/OrderComponents/ActionButtonComponent/UnclaimedButton.vue"
import PendingButon from "@/components/OrderComponents/ActionButtonComponent/UnclaimedButton.vue"
import AppointmentButton from "@/components/OrderComponents/ActionButtonComponent/AppointmentButton.vue"
import ContactButton from "@/components/OrderComponents/ActionButtonComponent/ContactButton.vue"
import QuotedButton from "@/components/OrderComponents/ActionButtonComponent/QuotedButton.vue"
import ContractButton from "@/components/OrderComponents/ActionButtonComponent/ContractButton.vue"

export default {
    name: "order-table",
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
    }
}
</script>

<style scoped>

</style>
