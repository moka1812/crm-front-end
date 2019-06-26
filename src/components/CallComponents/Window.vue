<template>
    <hsc-window-style-metal>
        <hsc-window 
            title="Dialog"
            :isOpen.sync="isOpen"
            :closeButton="true"
            positionHint="center"
            :width="300"
            :height="100"
            id="window"
        >
            <incoming-box v-if="incomingRequest"/>
            <dialog-box v-else-if="callBox" />
        </hsc-window>
    </hsc-window-style-metal>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DialogBox from "@/components/CallComponents/DialogBox.vue"
import IncomingBox from "@/components/CallComponents/IncomingBox.vue"

export default {
    components: {
        DialogBox,
        IncomingBox
    },
    data() {
        return {
        
        }
    },
    computed: {
        ...mapGetters({
            windowOpen: 'call/windowOpen',
            callBox: 'call/callBox',
            incomingRequest: 'call/incomingRequest',
        }),
        isOpen: {
            get() {return this.windowOpen},
            set(value) {this.terminate()}
        }
    },
    methods: {
        ...mapActions({
            terminate: 'call/terminate',
        })
    }
}
</script>

<style scoped>
#window {
    background: linear-gradient(white, white) !important;
}
</style>
