<template>
    <v-btn icon @click="this.openDialPad">
        <v-icon>dialpad</v-icon>
    </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "dial-pad-menu",
    methods: {
        ...mapActions({
            openDialPad: 'call/openDialPad'
        })
    },
}
</script>

<style scoped>

</style>