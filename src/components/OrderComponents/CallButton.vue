<template>
    <v-btn flat icon class="ma-0" @click="openDialog">
        <v-icon color="#FF0000">call</v-icon>
    </v-btn>
</template>

<script>
export default {
    name: "call-button",
    props: {
        phone: String
    },
    data() {
        return {
            window: null,
        }
    },
    methods: {
        openDialog() {
            this.window = window.open(`/dialog?phone=${this.phone}`, "myWindow", "width=400, height=100");
        }
    },
}
</script>

<style scoped>

</style>
