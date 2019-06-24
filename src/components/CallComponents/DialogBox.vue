<template>
    <v-card>
        <v-card-text class="justify-center"> <center>Đang gọi tới {{receiver}}</center> </v-card-text>

        <v-card-actions class="justify-center">
            <v-btn fab dark small  color="#dd1e26">
                <v-icon dark color="white">call_end</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    name: "dialog-box",
    data() {
        return {
            receiver: this.$route.query.phone
        }
    }
}
</script>

<style>
#d1{
    border: 1px solid black !important;
}
.dialog-drag .dialog-header {
    background-color: #dd1e26 !important;
}
.title {
    font-family: "Avenir", Helvetica, Arial, sans-serif !important;
}
</style>
