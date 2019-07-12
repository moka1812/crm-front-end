<template>
    <v-btn flat icon class="ma-0" @click="openDialog" :disabled="disable">
        <v-icon color="#dd1e26">phone_forwarded</v-icon>
    </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "call-button",
    props: {
        phone: String,
        name: String,
        orderID: Number,
    },
    computed: {
        ...mapGetters({
            calling: 'call/calling',
            ring: 'call/ring'
        }),
        disable() {
            if (this.calling || this.ring) {
                return true
            } return false
        }
    },
    methods: {
        ...mapActions({
            call: 'call/call',
        }),
        openDialog() {
            //this.call({phone: '0972957262', name: this.name, orderID: this.orderID})
            this.call({phone: this.phone, name: this.name, orderID: this.orderID})
        }
    },
}
</script>

<style scoped>

</style>