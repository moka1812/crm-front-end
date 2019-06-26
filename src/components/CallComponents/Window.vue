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
            <dialog-box v-if="callBox" />
        </hsc-window>
    </hsc-window-style-metal>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DialogBox from "@/components/CallComponents/DialogBox.vue"

export default {
    components: {
        DialogBox
    },
    data() {
        return {
        
        }
    },
    computed: {
        ...mapGetters({
            windowOpen: 'call/windowOpen',
            callBox: 'call/callBox',
            closeWindow: 'call/closeWindow'
        }),
        isOpen: {
            get() {return this.windowOpen},
            set(value) {closeWindow()}
        }
    },
    methods: {

    }
}
</script>

<style scoped>
#window {
    background: linear-gradient(white, white) !important;
}
</style>
