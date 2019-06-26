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
    data() {
        return {
            //window: null,
        }
    },
    methods: {
        ...mapActions({
            openCallBox: 'call/openCallBox'
        }),
        openDialog() {
            //this.window = window.open(`/dialog?phone=${this.phone}`, "myWindow", "width=400, height=130");
            this.openCallBox()
        }
    },
}
</script>

<style scoped>

</style>
