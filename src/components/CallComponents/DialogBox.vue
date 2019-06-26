<template>
    <div>
        <center>Đang gọi tới {{receiver}}</center>
        <center>{{minutes}}:{{seconds}}</center>
        <center>
            <v-btn fab dark small  color="#dd1e26" @click="this.terminate">
                <v-icon dark color="white">call_end</v-icon>
            </v-btn>
        </center>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers';

export default {
    name: "dialog-box",
    data() {
        return {
            receiver: this.$route.query.phone,
            timer: null,
            totalTime: 0,
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
    computed: {
        ...mapGetters({
            calling: 'call/calling',
            callErrorCode: 'call/callErrorCode',
            callError: 'call/callError'
        }),
        minutes() {
            const minutes = Math.floor(this.totalTime / 60);
            return this.padTime(minutes);
        },
        seconds() {
            const seconds = this.totalTime - (this.minutes * 60);
            return this.padTime(seconds);
        }
    },
    methods: {
        ...mapActions({
            call: 'call/call',
            terminate: 'call/terminate'
        }),
        padTime: function(time) {
            return (time < 10 ? '0' : '') + time;
        },
    },
    watch: {
        calling() {
            //Begin calling
            if (this.calling == true) {
                this.timer = setInterval(() => {this.totalTime ++ }, 1000)
            }
        },
        callErrorCode() {
            //End Call
            if (this.callErrorCode == 200) {
                clearInterval(this.timer)
            }
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
