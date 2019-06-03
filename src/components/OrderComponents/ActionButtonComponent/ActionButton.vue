<template>
    <div>
        <v-btn flat icon v-if="orderId == 'Waiting'">
            <v-icon color="#70cc3b">check_circle_outline</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderId == 'Unclaimed'">
            <v-icon color="#70cc3b">reply</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderId == 'Pending'">
            <v-icon color="#c122b1">contact_support</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderId == 'Quoted'">
            <v-icon color="#f3f711">sync</v-icon>
        </v-btn>
        <v-btn flat icon v-else-if="orderId == 'Contract'">
            <v-icon color="#2b56a9">call</v-icon>
        </v-btn>

        <v-btn flat icon>
            <v-icon color="#f73d3d">stars</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "order-table",
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
