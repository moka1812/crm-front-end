<template>
    <v-btn flat icon v-if="orderStep == 'Unclaimed'" @click="this.unclaimedButtonHandle" class="ma-0">
        <v-icon color="#70cc3b">reply</v-icon>
    </v-btn>
    <v-menu v-else top>
        <template v-slot:activator="{ on }">
            <v-btn flat icon v-on="on" class="ma-0">
                <v-icon v-if="orderStep == 'Pending'" color="#70cc3b">check_circle_outline</v-icon>
                <v-icon v-else-if="orderStep == 'Appointment'" color="#CD853F">meeting_room</v-icon>
                <v-icon v-else-if="orderStep == 'Contact'" color="#0000FF">perm_contact_calendar</v-icon>
                <v-icon v-else-if="orderStep == 'Quoted'" color="#FF8C00">sync</v-icon>
                <v-icon v-else-if="orderStep == 'Contract'" color="#00008B">assignment_turned_in</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-tile
            v-for="(item, index) in stages"
            :key="index"
            @click="StageChangingHandle(item.title)"
            >
                <v-list-tile-title class="ma-2">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
               
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import {getStage} from './utils/stage_functions'
import {translateStageFromViToEng, getStatus} from './utils/stages'
import haveAppointment from './utils/appointment'

export default {
    name: "action-button",
    props: {
        orderID: Number,
        step: String,
        phone: String,
        staff: Number,
        stage: String,
        assetID: Number
    },
    computed: {
        ...mapGetters({
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode'
        }),
        orderStep() {
            return this.step
        },
        stageTotal() {
            return getStage(this.step)
        },
        //Get Vietnamese Stages
        stages() {

            const result = []
            
            if (this.stageTotal != undefined) {
                for (let stage of this.stageTotal) {
                    if (stage.vi != this.stage && !haveAppointment(stage.vi)) {
                        result.push({
                            title: stage.vi
                        })
                    }
                }
            }

            return result
        }
    },
    methods: {
        ...mapActions({
            claimOrder: 'order/claimOrder',
            changeStage: 'order/changeStage',
        }),
        unclaimedButtonHandle: function() {
            const payload = {
                orderID: this.orderID,
                phone: this.phone,
                assetID: this.assetID
            }
            this.claimOrder(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "nhận Order thành công",
                        text: ''
                    });
                }
            })
        },
        StageChangingHandle: function(vietnameseStage) {
            const newStage = this.translateStageFromViToEng(vietnameseStage)
            const newStatus = this.getStatus(vietnameseStage)
            const payload = {
                orderID: this.orderID,
                phone: this.phone,
                staff: this.staff,
                assetID: this.assetID,
                stage: newStage,
                status: newStatus
            }
            this.changeStage(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "cập nhật trạng thái thành công",
                        text: ''
                    });
                }
            })
        },
        //Get English Stage to Update Order
        translateStageFromViToEng: function(vietnameseStage) {
            return translateStageFromViToEng(vietnameseStage)
        },
        getStatus: function(stage) {
            return getStatus(stage)
        }

    }
}
</script>

<style scoped>

</style>
 