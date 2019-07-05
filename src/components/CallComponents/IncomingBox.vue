<template>
    <audio ref="player" muted="muted">
        <source src="../../audio/iphone.mp3" type="audio/mpeg">
    </audio>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "incoming-box",
    data() {
        return {
            toast: null
        }
    },
    computed: {
        ...mapGetters({
            customerNumberPhone: 'call/customerNumberPhone',
            ring: 'call/ring',
            requestType: 'call/requestType',
        }),
    },
    methods: {
        ...mapActions({
            imcomingAccept: 'call/imcomingAccept',
            terminate: 'call/terminate'
        })
    },
    watch: {
        ring() {
            if (this.ring === true && this.requestType === "incoming") {
                const playPromise = this.$refs.player.play()
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        // Automatic playback started!
                    }).catch(function(error) {
                        // Automatic playback failed.
                        // Show a UI element to let the user manually start playback.
                        console.log(error.message)
                    });
                }

                this.toast = this.$snotify.simple(
                    `Lê Bảo Châu (${this.customerNumberPhone})`, 
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
