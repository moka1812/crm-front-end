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
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                >
                                </v-textarea>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="validatorAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá thẩm định"
                                    :hint="this.validatorAmountHint"
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
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    :readonly="this.sourceReadonly"
                                    label="Source*"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    label="Note"
                                    rows="1"
                                    auto-grow
                                >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="agentInput"
                                    label="Người tiếp nhận"
                                    :readonly="true"
                                    >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="supporterInput"
                                    label="Người hỗ trợ"
                                    :readonly="true"
                                    >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="branchInput"
                                    label="Chi nhánh"
                                    :readonly="true"
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
                                    :hint="this.appointmentDateTimeHint"
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
        <v-card-text 
          :style="{
            'color': 'red'
          }"
        >
            * Bắt buộc phải điền
        </v-card-text>
        <v-spacer></v-spacer>
        <v-btn class="contactBtn"
            @click="this.contractHandle"
            v-if="contractDisable"
        >
            Hợp Đồng
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
import {mapActions, mapGetters } from 'vuex'
import {getStage} from './utils/stage_functions'
import sourceItems from './utils/source_items'
import changeDigitToText from './utils/money'
import {translateStageFromEngToVi, translateStageFromViToEng, getStatus} from './utils/stages'
import {steps, translateStepFromEngToVi, translateStepFromViToEng} from './utils/steps'
import moment from 'moment'

export default {
    name: "order-edit",
    data() {
        return {
            valid: false,
            detail: null,
            assetTypeItems: [],
            sourceItems: [],
            menu: false,
            stepInput: '',
            stageInput: '',
            appointmentDateTimeInput: '',
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
            set (value) { if (!value) {this.turnOffDialog()} }
        },
        orderID() {
            if (this.detail != null) {
                return this.detail.orderID
            } return null
        },
        nameInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.name
                } return null
            },
            set (value) {
                this.detail.name = value
            }
        },
        phoneInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.phone
                }
            },
            set (value) {
                this.detail.phone = value
            }
        },
        expectedAmountInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.expectedAmount == null ? '' : this.detail.expectedAmount 
                } return null
            },
            set (value) {
                this.detail.expectedAmount = value
            }
        },
        validatorAmountInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.validatorAmount == null ? '' : this.detail.validatorAmount  
                } return null
            },
            set (value) {
                this.detail.validatorAmount = value
            }
        },
        sourceInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.source
                } return null
            },
            set (value) {
                this.detail.source = value
            }
        },
        agentInput() {
            if (this.detail != null) {
                return this.detail.agent
            } return null
        },
        supporterInput() {
            if (this.detail != null) {
                return this.detail.support_agent_name
            } return null
        },
        branchInput() {
            if (this.detail != null) {
                return this.detail.branchName
            } return null
        },
        noteInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.note
                } return null
            },
            set (value) {
                this.detail.note = value
            }
        },
        assetID() {
            if (this.detail != null) {
                return this.detail.assetID
            } return null
        },
        assetTypeInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.asset
                } return null
            },
            set (value) {
                this.detail.asset = value
            }
        },
        assetInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.assetDescription
                } return null
            },
            set (value) {
                this.detail.assetDescription = value
            }
        },
        //Get stage when step changes
        stageTotal() {
            if (/\S/.test(this.stepInput)) {
                //Get English Step
                const engStep = this.translateStepFromViToEng(this.stepInput)
                return getStage(engStep)
            }
            return []  
        },
        //Send vietnamese stages to stageItems
        stageItems() {
            return this.stageTotal.map((element) => element.vi)
        },
        //Send vietnamese steps to stepItems, except "Chưa nhận"/Unclaimed
        stepItems() {
            return Object.keys(steps).filter(key => {
                if (steps[key].vi !== "Chưa nhận") {
                    return true
                } 
                return false
            }).map(key => steps[key].vi)
        },
        //Disable Contract Button when step is not Contact
        contractDisable(){
            if (this.stageInput == "Hợp đồng") {
                return true
            }
            return false
        },
        //Enable user input apponitment date
        appointmentDisable() {
            if (this.stepInput == 'Hẹn khách' && /Khách hẹn lên #/.test(this.stageInput)) {
                return false
            } else if(this.stepInput == 'Liên hệ' && this.stageInput=='Gọi lại cho khách hàng') {
                return false
            } return true
        },
        //Disable when soure != null
        sourceReadonly() {
            if (/^\s*$/.test(this.sourceInput) | this.sourceInput == null) {
                return false
            }   
            return true
        },
        //Enable Rule when appointment enable
        appointmentRules() {
            if (this.appointmentDisable == false) {
                return [
                    v => /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[13578]|1[02]))|((0[1-9]|[1-2][0-9]|30)\/((0[469]|11))|((0[1-9]|1[0-9]|2[0-8])\/(02)))\/\d{4}\s([01]\d|2[0-3]):([0-5]\d)$/.test(v) || this.appointmentDateTimeHint
                ]
            }
            return []
        },
        //Hint for current time
        appointmentDateTimeHint() {
            const date = moment().format("DD/MM/YYYY HH:mm")
            return `Ví dụ: ${date}`
        },
        expectedAmountHint() {
            return changeDigitToText(this.expectedAmountInput)
        },
        validatorAmountHint() {
            return changeDigitToText(this.validatorAmountInput)
        },
        okDiable() {
            if (this.valid && this.orderDetail != null) {
                //Change to Contract Button
                if (this.stageInput == "Hợp đồng") {
                    return true
                }

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
                if (this.stepInput != this.translateStepFromEngToVi(this.orderDetail.step)) {
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
                //Not Yet Edit
                return true
            }
            return true
        }
    },
    watch: {
        //Update assetTypeItem when SAssetList changes
        SAssetListResult() {
            const asset = []
            for (let item of this.SAssetListResult) {
                asset.push(item.description)
            }
            this.assetTypeItems = asset
        },
        //Update Order Detail to Input
        orderDetail: async function() {
            if (this.orderDetail != null) {
                this.detail = {...this.orderDetail}
                
                //sourceInput existing in sourceItem or null
                if (sourceItems.includes(this.sourceInput) || /^\s*$/.test(this.sourceInput) || this.sourceInput == null) {
                    this.sourceItems = sourceItems
                } else {
                    //Special case, Example: facebook
                    this.sourceItems = [this.sourceInput]
                }

                this.stepInput = this.translateStepFromEngToVi(this.orderDetail.step)
                this.stageInput = this.translateStageFromEngToVi(this.orderDetail.stage)

                if (this.orderDetail.appointment !== null) {
                    this.appointmentDateTimeInput = moment(this.orderDetail.appointment, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")
                } else {
                    this.appointmentDateTimeInput = null
                }
            }
        },
        stageItems() {
            const oldStep = this.translateStepFromEngToVi(this.orderDetail.step)
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
        },
    },
    methods: {
        ...mapActions({
            updateOrder: 'order/updateOrder',
            turnOffDialog: 'order/turnOffDialog'
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
            const assetTypeID = await this.findAssetTypeID(this.assetTypeInput)

            let appointmentDateTime
            //When appointmentDateTimeInput enable
            if (this.appointmentDisable == false) {
                //Format from 01/01/2019 12:12 to 2019/01/01 12:12
                appointmentDateTime = moment(this.appointmentDateTimeInput, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
            } else {
                appointmentDateTime = null
            }

            const data = {
                orderID: this.orderID,
                phone: this.phoneInput,
                name: this.nameInput,
                expectedAmount: this.expectedAmountInput == '' ? null : this.expectedAmountInput,
                validatorAmount: this.validatorAmountInput == '' ? null : this.validatorAmountInput,
                source: this.sourceInput,
                step: this.translateStepFromViToEng(this.stepInput),
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
            return translateStageFromEngToVi(englishStage)
        },
        translateStageFromViToEng: function(vietnameseStage) {
            return translateStageFromViToEng(vietnameseStage)
        },
        translateStepFromEngToVi: function(englishStep) {
            return translateStepFromEngToVi(englishStep)
        },
        translateStepFromViToEng: function(vietnameseStep) {
            return translateStepFromViToEng(vietnameseStep)
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