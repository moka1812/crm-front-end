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

        <p v-if="this.ring===true"> Đang gọi <img src="../../assets/ring-animation.svg" alt="Loading"> </p>
        <p v-else-if="this.step.includes('confirmed')">{{minutes}}:{{seconds}}</p>
        <p v-else>
            {{this.vietnameseError}}
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
import { mapActions, mapGetters } from 'vuex'
import { setInterval, clearInterval } from 'timers';
import {getVietnameseError} from "./utils/call_errors"
import moment from 'moment'

export default {
    name: "dialog-box",
    data() {
        return {
            ringTimer: null,
            talkTimer: null,
            ringTime: 0,
            talkTime: 0,
        }
    },
    computed: {
        ...mapGetters({
            customerPhone: 'call/customerPhone',
            customerName: 'call/customerName',
            calling: 'call/calling',
            ring: 'call/ring',
            step: 'call/step',
            error: 'call/error'
        }),
        minutes() {
            const minutes = Math.floor(this.talkTime / 60);
            return this.padTime(minutes);
        },
        seconds() {
            const seconds = this.talkTime - (this.minutes * 60);
            return this.padTime(seconds);
        },
        vietnameseError() {
            return getVietnameseError(this.error)
        }
    },
    methods: {
        ...mapActions({
            terminate: 'call/terminate',
            updateCall: 'call/updateCall',
        }),
        padTime: function(time) {
            return (time < 10 ? '0' : '') + time;
        },
    },
    watch: {
        calling() {
            //Begin calling
            if (this.calling === true) {
                this.talkTimer = setInterval(() => {this.talkTime++}, 1000)
            }
        },
        ring() {
            if (this.ring === false) {
                this.$refs.player.pause()
            }
        },
        step() {
            switch(this.step) {
                case 'progress':
                    this.ringTimer = setInterval(() => {this.ringTime++}, 1000)
                    this.updateCall({callStatus: 'Ring'})
                    break
                case 'client confirmed': //Case only call out
                    clearInterval(this.ringTimer)
                    this.updateCall({
                        callStatus: 'In call', 
                        ringTime: this.ringTime,
                    })
                    this.ringTime = 0
                    break
                case 'ended':
                    clearInterval(this.talkTimer)
                    this.updateCall({
                        callStatus: this.error, 
                        talkTime: this.talkTime, 
                        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    })
                    this.talkTime = 0
                    break
                case 'failed':
                    clearInterval(this.ringTimer)
                    this.updateCall({
                        callStatus: this.error, 
                        ringTime: this.ringTime,
                        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    })
                    this.ringTime = 0
                    break
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
