<template>
    <div>
        <center>Khách hàng {{customerNumberPhone}}</center>
        <v-layout row>
            <v-flex justify-center sm6>
                <v-btn fab dark small  color="#008000" @click="this.imcomingAccept">
                    <v-icon dark color="white">phone_callback</v-icon>
                </v-btn>
            </v-flex>
            <v-flex justify-center sm6>
                <v-btn fab dark small  color="#dd1e26" @click="this.terminate">
                    <v-icon dark color="white">call_end</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "incoming-box",
    computed: {
        ...mapGetters({
            customerNumberPhone: 'call/customerNumberPhone',
        }),
    },
    methods: {
        ...mapActions({
            imcomingAccept: 'call/imcomingAccept',
            terminate: 'call/terminate'
        })
    }
}
</script>