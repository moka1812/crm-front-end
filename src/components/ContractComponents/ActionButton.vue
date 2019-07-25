<template>
    <div>
        <v-btn fab dark small icon class="ma-0" color="rgba(76, 185, 99, 0.17)">
            <v-icon color="rgba(76, 185, 99, 1)">hourglass_full</v-icon>
        </v-btn>
        <v-btn fab dark small icon class="ma-0" color="rgba(234, 82, 111, 0.17)">
            <v-icon color="rgba(234, 82, 111, 1)">check_circle</v-icon>
        </v-btn>
    </div> 
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: "action-button",
    props: {
        orderID: Number,
        step: String,
        phone: String,
        staff: Number,
        stage: String,
        assetID: Number
    },
    computed: {
    },
    methods: {

    }
}
</script>

<style scoped>

</style>
 