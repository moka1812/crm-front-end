<template>
    <v-dialog v-model="this.dialog" max-width="400px">
        <template v-slot:activator="{ on }">

        </template>
        <v-card>
            <v-card-title >
                <span class="title">Hộp thoại</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="justify-center"> Đang gọi tới {{receiver}} </v-card-text>

            <v-divider></v-divider>
            <v-card-actions class="justify-center">
                <v-btn fab dark small  color="pink" @click="this.endHandle">
                    <v-icon dark color="white">call_end</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "dialog-box",
    data() {
        return {
            dialog: true,
            receiver: ''
        }
    },
    methods: {
        endHandle() {
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>
