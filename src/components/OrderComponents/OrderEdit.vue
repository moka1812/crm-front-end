<template>
    <v-dialog v-model="dialog" max-width="1000px">
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
                                    ref="phone"
                                    required
                                >
                                    <template slot="append">

                                        <v-icon 
                                            v-if="!this.calling && !this.ring" 
                                            @click="callHandle"
                                            :disabled="!this.enabled"
                                            color="rgba(1, 151, 246, 1)"
                                        >
                                            call
                                        </v-icon>
                                        <v-icon 
                                            v-else-if="this.orderCallID === this.orderID"
                                            @click="terminateHandle" 
                                            color="#dd1e26"
                                        >
                                            call_end
                                        </v-icon>
                                    </template>
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
                                <date-time-picker
                                    v-model="appointmentDateTimeInput"
                                    label="Lịch hẹn giờ*"
                                    :disable="appointmentDisable"
                                    :rules="appointmentRules"
                                    :hint="appointmentDateTimeHint"
                                >
                                </date-time-picker>
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
                <v-btn
                    class="contactBtn"
                    @click="this.contractHandle"
                    v-if="contractDisable"
                    :disabled="orderUpdating"
                    color="#43425d"
                    round
                >
                    Hợp Đồng
                </v-btn>
                <v-btn
                    class="cancelBtn"
                    @click="this.cancleHandle"
                    :disabled="orderUpdating"
                    color="#fff"
                    round
                >
                    Cancel
                </v-btn>
                <v-btn
                    class="OkBtn"
                    @click="this.okHandle"
                    :disabled="okDiable"
                    :loading="orderUpdating"
                    color="#dd1e26"
                    round
                >
                OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import DateTimePicker from "@/components/OrderComponents/DateTimePicker.vue"
import getStage from './utils/stage_functions'
import sourceItems from '../../mixins/source_items'
import changeDigitToText from '../../mixins/money'
import haveAppointment from './utils/appointment'
import {translateStageFromEngToVi, translateStageFromViToEng, getStatus} from './utils/stages'
import {steps, translateStepFromEngToVi, translateStepFromViToEng} from './utils/steps'
import moment from 'moment'

export default {
    name: "order-edit",
    components: {
        DateTimePicker
    },
    data() {
        return {
            valid: false,
            detail: null,
            appointmentDateTimeHint: `Ví dụ: ${moment().format("DD/MM/YYYY HH:mm")}`,
            assetTypeItems: [],
            sourceItems: [],
        }
    },
    computed: {
        ...mapGetters({
            orderDetailForm: 'order/orderDetailForm',
            SAssetListResult: 'asset/SAssetListResult',
            orderDetail: 'order/orderDetail',
            orderUpdating: 'order/orderUpdating',
            orderUpdatingResult: 'order/orderUpdatingResult',
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
            orderUpdatingError: 'order/orderUpdatingError',
            enabled: 'call/enabled',
            calling: 'call/calling',
            ring: 'call/ring',
            orderCallID: 'call/orderID',
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
                return this.detail.supportAgentName
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
        appointmentDateTimeInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.appointment
                } return null
            },
            set (value) {
                this.detail.appointment = value
            }
        },
        stepInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.step
                } return null
            },
            set (value) {
                this.detail.step = value
            }
        },
        stageInput: {
            get () {
                if (this.detail != null) {
                    return this.detail.stage
                } return null
            },
            set (value) {
                this.detail.stage = value
            }
        },
        //Send vietnamese stages to stageItems
        stageItems() {
            if (/\S/.test(this.stepInput) && this.stepInput != null) {
                //Get English Step
                const engStep = this.translateStepFromViToEng(this.stepInput)
                const stageTotal = getStage(engStep)
                return stageTotal.map((element) => element.vi)
            }
            return []
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
        //Disable Contract Button when step is not Contact/Hợp đồng
        contractDisable() {
            if (this.stageInput === "Hợp đồng") {
                return true
            }
            return false
        },
        //Enable user input appointment date
        appointmentDisable() {
            return !haveAppointment(this.stageInput)
        },
        //Enable Rule when appointment enable
        appointmentRules() {
            if (this.appointmentDisable === false) {
                return [
                    value => {
                    if (value !== null) {
                            const date = moment(value, "DD/MM/YYYY HH:mm", true)
                            if (date.isValid()) {
                                const currentDate = moment()
                                if (date.diff(currentDate) > 0) {
                                    return true
                                } else {
                                    return 'Không được hẹn quá khứ'
                                }
                            }
                        }
                        return this.appointmentDateTimeHint
                    }
                ]
            }
            return []
        },
        //Disable when source != null
        sourceReadonly() {
            if (/^\s*$/.test(this.sourceInput) | this.sourceInput == null) {
                return false
            }   
            return true
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
                if (this.stageInput === "Hợp đồng") {
                    return true
                }

                if (this.nameInput !== this.orderDetail.name) {
                    return false
                }
                if (this.phoneInput !== this.orderDetail.phone) {
                    return false
                } 
                if (this.assetTypeInput !== this.orderDetail.asset) {
                    return false
                }
                if (this.expectedAmountInput !== this.orderDetail.expectedAmount) {
                    if (!(this.expectedAmountInput === '' && this.orderDetail.expectedAmount === null)) {
                        return false
                    }
                }
                if (this.assetInput !== this.orderDetail.assetDescription) {
                    return false
                }
                if (this.validatorAmountInput !== this.orderDetail.validatorAmount) {
                    if (!(this.validatorAmountInput === '' && this.orderDetail.validatorAmount === null)) {
                        return false
                    } 
                }
                if (this.sourceInput !== this.orderDetail.source) {
                    return false
                }
                if (this.noteInput !== this.orderDetail.note) {
                    return false
                }
                if (this.stepInput !== this.translateStepFromEngToVi(this.orderDetail.step)) {
                    return false
                }
                if (this.stageInput !== this.translateStageFromEngToVi(this.orderDetail.stage)) {
                    return false
                }
                if (this.appointmentDateTimeInput !== this.orderDetail.appointment) {
                    return false
                }
                //Not Yet Edit
                return true
            }
            return true
        },
        updateFromContract() {
            if (this.valid && this.orderDetail != null) {

                if (this.nameInput !== this.orderDetail.name) {
                    return false
                }
                if (this.phoneInput !== this.orderDetail.phone) {
                    return false
                } 
                if (this.assetTypeInput !== this.orderDetail.asset) {
                    return false
                }
                if (this.expectedAmountInput !== this.orderDetail.expectedAmount) {
                    if (!(this.expectedAmountInput === '' && this.orderDetail.expectedAmount === null)) {
                        return false
                    }
                }
                if (this.assetInput !== this.orderDetail.assetDescription) {
                    return false
                }
                if (this.validatorAmountInput !== this.orderDetail.validatorAmount) {
                    if (!(this.validatorAmountInput === '' && this.orderDetail.validatorAmount === null)) {
                        return false
                    } 
                }
                if (this.sourceInput !== this.orderDetail.source) {
                    return false
                }
                if (this.noteInput !== this.orderDetail.note) {
                    return false
                }

                //Not Yet Edit
                return true
            }
            return true
        },
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
        orderDetail: function() {
            if (this.orderDetail != null) {
                this.detail = {
                    ...this.orderDetail,
                    step: this.translateStepFromEngToVi(this.orderDetail.step),
                    stage: this.translateStageFromEngToVi(this.orderDetail.stage),
                }
                
                //sourceInput existing in sourceItem or null
                if (sourceItems.includes(this.sourceInput) || /^\s*$/.test(this.sourceInput) || this.sourceInput == null) {
                    this.sourceItems = sourceItems
                } else {
                    //Special case, Example: facebook
                    this.sourceItems = [this.sourceInput]
                }
            }
        },
        stepInput() {
            const oldStep = this.translateStepFromEngToVi(this.orderDetail.step)
            //When User go back old step
            if (this.stepInput === oldStep) {
                //Get old stage
                const oldStage = this.translateStageFromEngToVi(this.orderDetail.stage)
                //Current stage different old stage???
                if (this.stageInput !== oldStage) {
                    this.stageInput = oldStage //Emit stageInput watcher
                } else {
                    //Get old appointment from store
                    this.appointmentDateTimeInput = this.orderDetail.appointment
                }
            } else {
                //When current stage is not in new stage Items
                this.stageInput = ''
            }
        },
        stageInput() {
            const oldStep = this.translateStepFromEngToVi(this.orderDetail.step)
            const oldStage = this.translateStageFromEngToVi(this.orderDetail.stage)

            if (this.stepInput === oldStep && this.stageInput === oldStage) {
                //Get old appointment from store
                this.appointmentDateTimeInput = this.orderDetail.appointment
            } else {
                this.appointmentDateTimeInput = ''
            }
        },
        appointmentDisable() {
            //When enable input appointment Date Time
            if (this.appointmentDisable) {
                this.appointmentDateTimeInput = null
            }
        },
    },
    methods: {
        ...mapActions({
            updateOrder: 'order/updateOrder',
            turnOffDialog: 'order/turnOffDialog',
            call: 'call/call',
            terminate: 'call/terminate'
        }),
        //Find asset ID from asset description
        findAssetTypeID: function(assetType) {
            for (let item of this.SAssetListResult) {
                if (item.description === assetType) {
                    return item.id
                }
            }
        },
        callHandle: function() {
            this.call({
                phone: this.orderDetail.phone, 
                name: this.orderDetail.name, 
                orderID: this.orderDetail.orderID
            })
        },
        terminateHandle: function() {
            this.terminate()
        },
        contractHandle() {
            // No change in order detail
            if (this.updateFromContract) {
                const orderDetail = {
                    phone:  this.orderDetail.phone,
                    name: this.orderDetail.name,
                    expectedAmount: this.orderDetail.expectedAmount,
                    validatorAmount: this.orderDetail.validatorAmount,
                    assetType: this.orderDetail.asset,
                    asset: this.orderDetail.assetDescription,
                    assetID: this.assetID,
                    orderID: this.orderDetail.orderID,
                    source: this.orderDetail.source,
                }
                this.$router.push({name: 'new_contract', params: {orderDetail}})
                this.dialog = false
            } else {
                // Update order detail to create contract

                const assetTypeID = this.findAssetTypeID(this.assetTypeInput)

                let appointmentDateTime = null
                //When appointmentDateTimeInput enable
                if (this.appointmentDisable === false) {
                    //Format from 01/01/2019 12:12 to 2019/01/01 12:12
                    appointmentDateTime = moment(this.appointmentDateTimeInput, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
                }

                const data = {
                    orderID: this.orderID,
                    phone: this.phoneInput,
                    name: this.nameInput,
                    expectedAmount: this.expectedAmountInput === '' ? null : this.expectedAmountInput,
                    validatorAmount: this.validatorAmountInput === '' ? null : this.validatorAmountInput,
                    source: this.sourceInput,
                    staff: this.orderDetail.staff,
                    note: this.noteInput,
                    appointmentDateTime: appointmentDateTime,
                    CAssetID: this.assetID,
                    assetTypeID: assetTypeID,
                    assetTypeDescription: this.assetInput,
                }

                this.updateOrder(data).then(() => {
                    if (this.orderUpdatingErrorCode === 200) {
                        // Begin create Contract
                        const orderDetail = {
                            phone:  this.phoneInput,
                            name: this.nameInput,
                            expectedAmount: this.expectedAmountInput,
                            validatorAmount: this.validatorAmountInput,
                            assetType: this.assetTypeInput,
                            asset: this.assetInput,
                            assetID: this.assetID,
                            orderID: this.orderID,
                            source: this.sourceInput,
                        }
                        this.$router.push({name: 'new_contract', params: {orderDetail}})
                        this.dialog = false
                    } else {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: "Error: "+this.orderUpdatingErrorCode,
                            text: this.orderUpdatingError
                        });
                    }
                })
            }
            
        },
        cancleHandle() {
            this.dialog = false
        },
        okHandle: function() {
            const assetTypeID = this.findAssetTypeID(this.assetTypeInput)

            let appointmentDateTime = null
            //When appointmentDateTimeInput enable
            if (this.appointmentDisable === false) {
                //Format from 01/01/2019 12:12 to 2019/01/01 12:12
                appointmentDateTime = moment(this.appointmentDateTimeInput, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD HH:mm")
            }

            const data = {
                orderID: this.orderID,
                phone: this.phoneInput,
                name: this.nameInput,
                expectedAmount: this.expectedAmountInput === '' ? null : this.expectedAmountInput,
                validatorAmount: this.validatorAmountInput === '' ? null : this.validatorAmountInput,
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
                if (this.orderUpdatingErrorCode === 200) {
                    //Turn off Dialog
                    this.dialog = false
                    //Notify update Order Successfully
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Cập nhật thành công",
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
  color: #fff !important;
}

.cancelBtn {
  color: #dd1e26 !important;
}

.OkBtn {
  color: #fff !important;
}
</style>