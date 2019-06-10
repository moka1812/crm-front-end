<template>
    <v-container fluid>
        <v-layout>
            <v-flex sm6>
                <v-btn flat icon v-if="orderStep == 'Unclaimed'" @click="this.unclaimedButtonHandle">
                    <v-icon color="#70cc3b">reply</v-icon>
                </v-btn>
                <v-menu v-else top>
                    <template v-slot:activator="{ on }">
                        <v-btn flat icon v-on="on">
                            <v-icon v-if="orderStep == 'Pending'" color="#70cc3b">check_circle_outline</v-icon>
                            <v-icon v-else-if="orderStep == 'Appointment'" color="#70cc3b">check_circle_outline</v-icon>
                            <v-icon v-else-if="orderStep == 'Contact'" color="#0000FF">call</v-icon>
                            <v-icon v-else-if="orderStep == 'Quoted'" color="#f3f711">sync</v-icon>
                            <v-icon v-else-if="orderStep == 'Contract'" color="#f3f711">assignment_turned_in</v-icon>
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
               
            </v-flex>
            <v-flex sm6>
                <v-btn flat icon>
                    <v-icon color="#f73d3d">stars</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import {getStage} from './stage_functions'

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
            for (let stage of this.stageTotal) {
                result.push({
                    title: stage.vi
                })
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
            console.log(vietnameseStage)
            let newStage = this.translateStageFromViToEng(vietnameseStage)
            let payload = {
                orderID: this.orderID,
                phone: this.phone,
                assetID: this.assetID,
                stage: newStage
            }
            console.log(payload)
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
            for (let item of this.stageTotal) {
                if (item.vi == vietnameseStage) {
                    return item.eng
                }
            }
            return null
        }
    }
}
</script>

<style scoped>

</style>
 