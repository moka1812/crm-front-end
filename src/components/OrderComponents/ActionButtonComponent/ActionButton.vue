<template>
    <div>
        <waiting-button v-if="orderStep == 'Waiting'" />
        <v-btn flat icon v-else-if="orderStep == 'Unclaimed'">
            <v-icon color="#70cc3b">reply</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderStep == 'Pending'">
            <v-icon color="#c122b1">contact_support</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderStep == 'Quoted'">
            <v-icon color="#f3f711">sync</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderStep == 'Contract'">
            <v-icon color="#2b56a9">call</v-icon>
        </v-btn>

        <v-btn flat icon>
            <v-icon color="#f73d3d">stars</v-icon>
        </v-btn>
    </div>
</template>

<script>
import WaitingButton from "@/components/OrderComponents/ActionButtonComponent/WaitingButton.vue"

export default {
    name: "order-table",
    components: {
        WaitingButton
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
