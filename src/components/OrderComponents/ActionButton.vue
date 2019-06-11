<template>
    <v-btn flat icon v-if="orderStep == 'Unclaimed'" @click="this.unclaimedButtonHandle">
        <v-icon color="#70cc3b">reply</v-icon>
    </v-btn>
    <v-menu v-else top>
        <template v-slot:activator="{ on }">
            <v-btn flat icon v-on="on">
                <v-icon v-if="orderStep == 'Pending'" color="#70cc3b">check_circle_outline</v-icon>
                <v-icon v-else-if="orderStep == 'Appointment'" color="#70cc3b">check_circle_outline</v-icon>
                <v-icon v-else-if="orderStep == 'Contact'" color="#0000FF">call</v-icon>
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
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
               
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import {getStage} from './utils/stage_functions'
import {translateViToEng, getStatus} from './utils/stages'

export default {
    name: "action-button",
    props: {
        orderID: Number,
        step: String,
        phone: String,
        assetID: Number
    },
    data() {
        return {
            orderStep: this.step,
            stageTotal: getStage(this.step)
        }
    },
    computed: {
        ...mapGetters({
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode'
        }),
        //Get Vietnamese Stages
        stages() {

            let result = []
            
            if (this.stageTotal != undefined) {
                for (let stage of this.stageTotal) {
                    result.push({
                        title: stage.vi
                    })
                }
            }

            return result
        }
    },
    methods: {
        ...mapActions({
            claimOrder: 'order/claimOrder',
            changeStage: 'order/changeStage',
            getOrderList: 'order/getOrderList'
        }),
        unclaimedButtonHandle: function() {
            let payload = {
                orderID: this.orderID,
                phone: this.phone,
                assetID: this.assetID
            }
            this.claimOrder(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.getOrderList()
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Claim Order Successfully",
                        text: ''
                    });
                }
            })
        },
        StageChangingHandle: function(vietnameseStage) {
            let newStage = this.translateStageFromViToEng(vietnameseStage)
            let newStatus = this.getStatus(vietnameseStage)
            let payload = {
                orderID: this.orderID,
                phone: this.phone,
                assetID: this.assetID,
                stage: newStage,
                status: newStatus
            }
            this.changeStage(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.getOrderList()
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Update Successfully",
                        text: ''
                    });
                }
            })
        },
        //Get English Stage to Update Order
        translateStageFromViToEng: function(vietnameseStage) {
            return translateViToEng(vietnameseStage)
        },
        getStatus: function(stage) {
            return getStatus(stage)
        }

    }
}
</script>

<style scoped>

</style>
 