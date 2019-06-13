<template>
    <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">

        </template>
        <v-card>
            <v-card-title >
                <span class="title">Order #{{orderID}}</span>
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
                                    v-model.lazy="phoneInput"
                                    :rules="[
                                        v => !!v || 'Phone is required',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Phone is not valid'
                                    ]"
                                    label="Phone*"
                                    :loading="this.clientSearching"
                                    :disabled="this.clientSearching"
                                    ref="phone"
                                    required
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
                                    label="Loại tài sản*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="expectedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá mong muốn"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                v-model.lazy="assetInput"
                                :rules="[v => !!v || 'Yều cầu cần có']"
                                label="Mô tả tài sản*"
                                required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="validatorAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá thẩm định"
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
                                    label="Source*"
                                    required
                                >
                                </v-select>
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
                                    v-model="stepInput"
                                    :items="stepItems"
                                    item-disabled="Pending"
                                    :rules="[
                                        v => !!v || 'Yều cầu cần có',
                    
                                    ]"
                                    label="Giai đoạn*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-select
                                    v-model="stageInput"
                                    :items="stageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Trạng thái*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="agentInput"
                                    label="Người tiếp nhận"
                                    :disabled="true"
                                    >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="supporterInput"
                                    label="Người hỗ trợ"
                                    :disabled="true"
                                    >
                                </v-text-field>
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
                                    v-model.lazy="appointmentDateTimeInput"
                                    append-icon="event"
                                    label="Lịch hẹn giờ*"
                                    :disabled="this.appointmentDisable"
                                    :rules="this.appointmentRules"
                                    hint="Ví dụ: 01/01/2019 10:20"
                                    :persistent-hint="true"
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
            :disabled="okDiable"
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
import {getStage} from './utils/stage_functions'
import sourceItems from './utils/source_items'
import {stepItems} from './utils/step_items'
import {translateEngToVi, translateViToEng, getStatus} from './utils/stages'
import moment from 'moment'

export default {
    name: "order-edit",
    data() {
        return {
            valid: false,
            orderID: '',
            nameInput: '',
            agentInput: '',
            supporterInput: '',
            phoneInput: '',
            assetInput: '',
            expectedAmountInput: '',
            assetTypeInput: '',
            assetTypeItems: [],
            validatorAmountInput: '',
            sourceInput: '',
            sourceItems: sourceItems,
            noteInput: '',
            branchInput: '',
            stepInput: '',
            stepItems: [
                "Pending",
                "Contact",
                "Quoted",
                "Appointment",
                "Contract"
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
        //Enable user input apponitment date
        appointmentDisable() {
            if (this.stepInput == 'Appointment' && /Khách hẹn lên #/.test(this.stageInput)) {
                return false
            } return true
        },
        appointmentRules() {
            if (this.appointmentDisable == false) {
                return [
                    v => /^\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}$/.test(v) || 'Không hợp lệ'
                ]
            }
            return []
        },
        okDiable() {
            if (this.valid && this.orderDetail != null) {
                if (this.nameInput != this.orderDetail.name) {
                    return false
                }
                if (this.phoneInput != this.orderDetail.phone) {
                    return false
                } 
                if (this.assetTypeInput != this.orderDetail.asset) {
                    return false
                }
                if (this.expectedAmountInput != this.orderDetail.expectedAmount) {
                    if (!(this.expectedAmountInput == '' && this.orderDetail.expectedAmount == null)) {
                        return false
                    }
                }
                if (this.assetInput != this.orderDetail.assetDescription) {
                    return false
                }
                if (this.validatorAmountInput != this.orderDetail.validatorAmount) {
                    if (!(this.validatorAmountInput == '' && this.orderDetail.validatorAmount == null)) {
                        return false
                    } 
                }
                if (this.sourceInput != this.orderDetail.source) {
                    return false
                }
                if (this.noteInput != this.orderDetail.note) {
                    return false
                }
                if (this.stepInput != this.orderDetail.step) {
                    return false
                }
                if (this.stageInput != this.translateStageFromEngToVi(this.orderDetail.stage)) {
                    return false
                }
                //Check null vs null
                if (this.appointmentDateTimeInput != this.orderDetail.appointment) {
                    if (this.appointmentDateTimeInput != moment(this.orderDetail.appointment, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")) {
                        return false
                    }
                }
                
                console.log(5)
                //Not Yet Edit
                return true
            }
            return true
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
                this.phoneInput = this.orderDetail.phone
                //Change null to ''
                this.expectedAmountInput = this.orderDetail.expectedAmount == null ? '' : this.orderDetail.expectedAmount 
                this.validatorAmountInput = this.orderDetail.validatorAmount == null ? '' : this.orderDetail.validatorAmount 
                this.sourceInput = this.orderDetail.source

                this.stepInput = this.orderDetail.step
                this.stageInput = this.translateStageFromEngToVi(this.orderDetail.stage)
                this.agentInput = this.orderDetail.agent
                this.supporterInput = this.orderDetail.support_agent_name
                this.branchInput = this.orderDetail.branchName
                this.noteInput = this.orderDetail.note

                if (this.orderDetail.appointment !== null) {
                    this.appointmentDateTimeInput = moment(this.orderDetail.appointment, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")
                } else {
                    this.appointmentDateTimeInput = null
                }

                this.assetID = this.orderDetail.assetID
                this.assetTypeInput = this.orderDetail.asset
                this.assetInput = this.orderDetail.assetDescription
            }
        },
        stageItems() {
            let oldStep = this.orderDetail.step
            //When User go back old step
            if (this.stepInput == oldStep) {
                //Get old stage
                this.stageInput = this.translateStageFromEngToVi(this.orderDetail.stage)
            } else if (!this.stageItems.includes(this.stageInput)) {
                //When current stage is not in new stage Items
                this.stageInput = ''
            }
        },
        appointmentDisable() {
            //When enable input appointment Date Time
            if (this.appointmentDisable == true) {
                //Check appointment exist in orderDetail
                if (this.orderDetail.appointment !== null) {
                    this.appointmentDateTimeInput = moment(this.orderDetail.appointment, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")
                }
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

            let appointmentDateTime
            //When appointmentDateTimeInput enable
            if (this.appointmentDisable == false) {
                //Format from 01/01/2019 12:12 to 2019/01/01 12:12
                appointmentDateTime = moment(this.appointmentDateTimeInput, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
            } else {
                appointmentDateTime = null
            }

            let data = {
                orderID: this.orderID,
                phone: this.phoneInput,
                name: this.nameInput,
                expectedAmount: this.expectedAmountInput == '' ? null : this.expectedAmountInput,
                validatorAmount: this.validatorAmountInput == '' ? null : this.validatorAmountInput,
                source: this.sourceInput,
                step: this.stepInput,
                stage: this.translateStageFromViToEng(this.stageInput),
                staff: this.orderDetail.staff,
                note: this.noteInput,
                appointmentDateTime: appointmentDateTime,
                status: this.getStatus(this.stageInput),
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
        translateStageFromEngToVi: function(englishStage) {
            return translateEngToVi(englishStage)
        },
        //Get English Stage to Update Order
        translateStageFromViToEng: function(vietnameseStage) {
            return translateViToEng(vietnameseStage)
        },
        getStatus: function(stage){
            return getStatus(stage)
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