<template>
    <v-btn flat icon class="ma-0" @click="openDialog">
        <v-icon color="#FF0000">call</v-icon>
    </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "call-button",
    props: {
        phone: String
    },
    methods: {
        ...mapActions({
            call: 'call/call',
        }),
        openDialog() {
            //this.call({phone: '0972957262'})
            this.call({phone: this.phone})
        }
    },
}
</script>

<style scoped>

</style>
