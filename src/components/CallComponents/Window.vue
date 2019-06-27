<template>
    <hsc-window-style-metal>
        <hsc-window 
            :title="title"
            :isOpen.sync="isOpen"
            :closeButton="true"
            positionHint="center"
            :width="300"
            :height="350"
            id="window"
        >
            <dialog-box v-if="callBox" />
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
            requestType: 'call/requestType',
        }),
        title() {
            if (this.requestType == 'outcoming') {
                return "Cuộc gọi đi"
            } else if (this.requestType == 'incoming') {
                return "Cuộc gọi về"
            } return 'Hộp số'
        },
        isOpen: {
            get() {return this.windowOpen},
            set(value) {this.closeWindow()}
        }
    },
    methods: {
        ...mapActions({
            closeWindow: 'call/closeWindow',
        })
    }
}
</script>

<style scoped>
#window {
    background: linear-gradient(white, white) !important;
    position: fixed;
    z-index: 2 !important;
}
</style>
