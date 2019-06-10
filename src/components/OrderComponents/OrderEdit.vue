<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">

        </template>
        <v-card>
            <v-card-title >
                <span class="title">Order {{orderID}}</span>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text>
                <v-form v-model="valid" ref="form">
                    <v-container>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    label="Tên"
                                    >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^$|^[+]?[0-9]{10,13}$/.test(v) || 'Phone is not valid'
                                    ]"
                                    label="Phone 2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                v-model.lazy="phone1Input"
                                :rules="[
                                    v => !!v || 'Phone is required',
                                    //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                    v => /^[+]?[0-9]{10,13}$/.test(v) || 'Phone is not valid'
                                ]"
                                label="Phone 1"
                                :loading="this.clientSearching"
                                :disabled="this.clientSearching"
                                ref="phone"
                                required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="expectedAmountInput"
                                    :rules="[
                                            v => /^$|^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá mong muốn"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="validatorAmountInput"
                                    :rules="[
                                        v => /^$|^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá thẩm định"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                v-model.lazy="assetInput"
                                :rules="[v => !!v || 'Yều cầu cần có']"
                                label="Mô tả tài sản"
                                required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                               <v-text-field
                                    v-model.lazy="noteInput"
                                    label="Note"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Source"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-select
                                    v-model="stageInput"
                                    :items="stageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Trạng thái"
                                    required
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="branchInput"
                                    label="Chi nhánh"
                                    :disabled="true"
                                    >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="agentInput"
                                    label="Người tiếp nhận"
                                    :disabled="true"
                                    >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-select
                                    v-model="stepInput"
                                    :items="statusItems"
                                    item-disabled="Pending"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                    
                                    ]"
                                    label="Giai đoạn"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="appointmentDateTimeInput"
                                    append-icon="event"
                                    label="Lịch hẹn giờ"
                                    :disabled="appointmentDisable"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                                        v => /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}$/.test(v) || 'Không hợp lệ'
                                    ]"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="contactBtn"
            @click="this.contractHandle"
            v-if="contractDisable"
        >
            Contract
        </v-btn>
        <v-btn class="cancelBtn"
            @click="this.cancleHandle"
        >
            Cancel
        </v-btn>
        <v-btn
            class="OkBtn"
            @click="this.okHandle"
            :disabled="!valid"
            v-if="!orderUpdating"
        >
        OK
        </v-btn>
        <v-progress-circular
            indeterminate
            color="red"
            v-else
        >
        </v-progress-circular>
      </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations } from 'vuex'
import {EDIT_DIALOG} from './store/order/types'
import {getStage} from './stage_functions'
import moment from 'moment'
import { async } from 'q';

export default {
    name: "order-edit",
    data() {
        return {
            valid: false,
            orderID: '',
            nameInput: '',
            agentInput: '',
            phone1Input: '',
            phone2Input: '',
            assetInput: '',
            expectedAmountInput: '',
            assetTypeInput: '',
            assetTypeItems: [],
            validatorAmountInput: '',
            sourceInput: '',
            sourceItems:[
                'Chat',
                'Fanpage',
                'Hotline',
                'Online',
                'Walk-in',
                'Referral'
            ],
            noteInput: '',
            branchInput: '',
            agentInput: '',
            stepInput: '',
            statusItems: [
                'Unclaimed',
                'Pending',
                'Contact',
                'Quoted',
                'Appointment',
                'Contract'
            ],
            stageInput: '',
            menu: false,
            appointmentDateTimeInput: '',
            assetID: '',
        }
    },
    computed: {
        ...mapGetters({
            orderDetailForm: 'order/orderDetailForm',
            clientSearching:'order/clientSearching',
            SAssetListResult: 'asset/SAssetListResult',
            orderDetail: 'order/orderDetail',
            orderUpdating: 'order/orderUpdating',
            orderUpdatingResult: 'order/orderUpdatingResult',
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
            orderUpdatingError: 'order/orderUpdatingError'
        }),
        dialog: {
            get () { return this.orderDetailForm },
            set (value) { this.editDialog(value) }
        },
        //Get stage when step changes
        stageTotal() {
            if (/\S/.test(this.stepInput)) {
                return getStage(this.stepInput)
            }
            return []  
        },
        //Send vietnamese stages to stageItems
        stageItems() {
            let array = []
            for (let item of this.stageTotal) {
                array.push(item.vi)
            }
            return array
        },
        //Disable Contract Button when step is not Contact
        contractDisable(){
            if (this.stepInput == 'Contract') {
                return true
            }
            return false
        },
        appointmentDisable() {
            if (this.stepInput == 'Appointment' && /Appointment #/.test(this.stageInput)) {
                return true
            } return false
        }
    },
    watch: {
        //Update assetTypeItem when SAssetList changes
        SAssetListResult() {
            let asset = []
            for (let item of this.SAssetListResult) {
                asset.push(item.description)
            }
            this.assetTypeItems = asset
        },
        //Update Order Detail to Input
        orderDetail: async function() {
            if (this.orderDetail != null) {

                this.orderID = this.orderDetail.orderID
                this.nameInput = this.orderDetail.name
                this.phone1Input = this.orderDetail.phone
                this.expectedAmountInput = this.orderDetail.expectedAmount
                this.validatorAmountInput = this.orderDetail.validatorAmount
                this.sourceInput = this.orderDetail.source

                this.stepInput = this.orderDetail.step
                this.stageInput = await this.translateStageToVi(this.orderDetail.stage)
                this.agentInput = this.orderDetail.agent
                this.branchInput = this.orderDetail.branch
                this.noteInput = this.orderDetail.note

                if (this.orderDetail.appointment !== null) {
                    this.appointmentDateTimeInput = moment(this.orderDetail.appointment, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")
                } else {
                    this.appointmentDateTimeInput = ''
                    //this.appointmentDateTimeInput = moment().format("DD/MM/YYYY HH:mm")
                }

                this.assetID = this.orderDetail.assetID
                this.assetTypeInput = this.orderDetail.asset
                this.assetInput = this.orderDetail.assetDescription
            }
        },
        stageItems() {
            if (!this.statusItems.includes(this.stageInput)) {
                this.stageInput = ''
            }
        }
    },
    methods: {
        ...mapMutations({
            //Turn off Dialog
            editDialog: `order/${EDIT_DIALOG}`
        }),
        ...mapActions({
            updateOrder: 'order/updateOrder',
            getOrderList: 'order/getOrderList',
        }),
        //Find asset ID from asset description
        findAssetTypeID(assetType) {
            for (let item of this.SAssetListResult) {
                if (item.description == assetType) {
                    return item.id
                }
            }
        },
        contractHandle: async function () {

        },
        cancleHandle: async function() {
            this.dialog = false
        },
        okHandle: async function() {
            let assetTypeID = await this.findAssetTypeID(this.assetTypeInput)

            let data = {
                orderID: this.orderID,
                phone: this.phone1Input,
                name: this.nameInput,
                expectedAmount: this.expectedAmountInput,
                validatorAmount: this.validatorAmountInput,
                source: this.sourceInput,
                step: this.stepInput,
                stage: this.translateStageFromViToEng(this.stageInput),
                note: this.noteInput,
                branch: this.branchInput,
                appointmentDateTime: moment(this.appointmentDateTimeInput, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm"),

                CAssetID: this.assetID,
                assetTypeID: assetTypeID,
                assetTypeDescription: this.assetInput,
            }

            this.updateOrder(data).then(() => {
                if (this.orderUpdatingErrorCode == 200) {
                    //Turn off Dialog
                    this.dialog = false
                    //Notify update Order Successfully
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Update Order Successfully",
                        text: ''
                    });
                    //Update Order Table
                    this.getOrderList()
                    this.dialog=false
                } else {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: "Error: "+this.orderUpdatingErrorCode,
                        text: this.orderUpdatingError
                    });
                }
            })
        },
        translateStageToVi: function(stage) {
            for (let item of this.stageTotal) {
                if (item.eng == stage) {
                    return item.vi
                }
            }
            return null
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
.contactBtn {
  background-color: #43425d !important;
  color: #fff !important;
}

.cancelBtn {
  background-color: #fff !important;
  color: #dd1e26 !important;
}

.OkBtn {
  background-color: #dd1e26 !important;
  color: #fff !important;
}
</style>
