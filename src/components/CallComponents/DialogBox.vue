<template>
    <div class="center">
        <v-avatar
          :tile="false"
          :size="100"
          color="grey lighten-4"
          class="ma-3"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>

        <br/>
        
        <h3>{{this.customerName}}</h3>
        ({{this.customerPhone}})

        <p v-if="this.ring==true"> Đang gọi <img src="../../assets/ring-animation.svg" alt="Loading"> </p>
        <p v-else-if="this.callErrorCode==1">{{minutes}}:{{seconds}}</p>
        <p v-else>
            {{this.callError}}
        </p>

        <v-btn fab dark small  color="#dd1e26" @click="this.terminate">
            <v-icon dark color="white">call_end</v-icon>
        </v-btn>

        <br class="margin"/>

        <p class="client">Thông tin khách hàng</p>

        <audio ref="player" autoplay>
            <source src="../../audio/waiting.mp3" type="audio/mpeg">
        </audio>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers';

export default {
    name: "dialog-box",
    data() {
        return {
            timer: null,
            totalTime: 0,
        }
    },
    computed: {
        ...mapGetters({
            customerPhone: 'call/customerPhone',
            customerName: 'call/customerName',
            calling: 'call/calling',
            ring: 'call/ring',
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
            //Not Ring
            if (this.callErrorCode != 0) {
                this.$refs.player.pause()
            }
            //End Call
            if (this.callErrorCode != 1) {
                clearInterval(this.timer)
            }
        }
    }
}
</script>

<style>
.center {
    text-align: center;
}
.margin {
    margin-top: 15px;
}
.client {
    margin-top: 15px;
    cursor: pointer;
    color: blue;
    font-size: 16px;
}
</style>
