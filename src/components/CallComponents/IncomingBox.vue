<template>
    <audio ref="player" muted="muted">
        <source src="../../audio/iphone.mp3" type="audio/mpeg">
    </audio>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'

export default {
    name: "incoming-box",
    data() {
        return {
            toast: null,
            ringTimer: null,
            ringTime: 0,
        }
    },
    computed: {
        ...mapGetters({
            customerPhone: 'call/customerPhone',
            customerName: 'call/customerName',
            ring: 'call/ring',
            step: 'call/step',
            error: 'call/error',
            requestType: 'call/requestType',
        }),
    },
    methods: {
        ...mapActions({
            imcomingAccept: 'call/imcomingAccept',
            terminate: 'call/terminate',
            updateCall: 'call/updateCall',
        })
    },
    watch: {
        ring() {
            if (this.ring === true && this.requestType === "incoming") {
                //Begin count ring time
                this.ringTimer = setInterval(() => {this.ringTime++}, 1000)

                //Play music
                const playPromise = this.$refs.player.play()
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        // Automatic playback started!
                    }).catch(function(error) {
                        // Automatic playback failed.
                        // Show a UI element to let the user manually start playback.
                    });
                }

                this.toast = this.$snotify.simple(
                    `${this.customerName} (${this.customerPhone})`, 
                    'Cuộc gọi đến', 
                    {
                        showProgressBar: false,
                        timeout: null,
                        closeOnClick: false,
                        pauseOnHover: true,
                        buttons: [
                            {
                                text: 'Chấp nhận', 
                                className: 'acceptButton',
                                action: (toast) => {
                                    this.imcomingAccept()
                                    this.$snotify.remove(toast.id)
                                }
                            },
                            {
                                text: 'Từ chối', 
                                className: 'denyButton',
                                action: (toast) => {
                                    this.terminate()
                                    this.$snotify.remove(toast.id)
                                }
                            },
                        ]
                    }
                );
            //Case client terminated
            } else if (this.toast !== null) {
                this.$snotify.remove(this.toast.id)
                this.$refs.player.load()
            }
        },
        step() {
            console.log(this.step)
            switch(this.step) {
                case 'user confirmed': //Case only call in
                    clearInterval(this.ringTimer)
                    this.updateCall({
                        callStatus: 'In call', 
                        ringTime: this.ringTime,
                    })
                    this.ringTime = 0
                    break
                case 'failed':
                    clearInterval(this.ringTimer)
                    //Update Call Status
                    console.log(123)
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
.acceptButton {
    background-color: green !important
}
.denyButton {
    background-color: #dd1e26 !important
}
</style>
