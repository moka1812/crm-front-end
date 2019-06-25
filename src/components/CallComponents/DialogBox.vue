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
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "dialog-box",
    data() {
        return {
            receiver: this.$route.query.phone
        }
    },
    beforeCreate() {
        window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '1231312';
        });
    },
    mounted() {
      this.call({phone: '0972957262'})
    },
    methods: {
        ...mapActions({
            call: 'call/call'
        }),
        handler: function handler(event) {
            alert(12312312)
        }
    },
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
