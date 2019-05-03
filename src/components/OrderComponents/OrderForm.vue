<template>
    <div>
        <v-card-title >
            <span class="title">{{nameForm}}</span>
        </v-card-title>

        <hr class="divider"/>

        <v-card-text>
            <v-form v-model="valid" ref="form">
                <v-container>
                    <v-layout>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="phoneInput"
                                :rules="[
                                    v => !!v || 'Phone is required',
                                    //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                    v => /^[+]?[0-9]{10,13}$/.test(v) || 'Phone is not valid'
                                ]"
                                label="Phone"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="IDCardInput"
                                :rules="[
                                        v => !!v || 'ID Card is required',
                                        //Validate ID Card or Passport number
                                        v => /^[+]?[0-9]{9,13}$|^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(v) || 'ID Card is not valid',
                                    ]"
                                label="ID Card"
                                >
                            </v-text-field>
                        </v-flex> 
                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="firstNameInput"
                                :rules="[v => !!v || 'First name is required']"
                                label="First Name"
                                :disabled="disabled"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="lastNameInput"
                                :rules="[v => !!v || 'Last name is required']"
                                label="Last Name"
                                :disabled="disabled"
                                required
                                >
                            </v-text-field>
                        </v-flex>

                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="assetInput"
                                :rules="[v => !!v || 'Asset is required']"
                                label="Asset"
                                :disabled="disabled"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6>
                                <v-text-field
                                v-model.lazy="expectedAmountInput"
                                :rules="[
                                        v => !!v || 'Expected Amount is required',
                                        v => /^-?\d*(\.\d+)?$/.test(v) || 'Expected Amount is not valid'
                                    ]"
                                label="Expected Amount"
                                :disabled="disabled"
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
                                :rules="[v => !!v || 'Asset Type is required']"
                                label="Asset Type"
                                :disabled="disabled"
                                required
                                >
                            </v-select>
                        </v-flex>
                        <v-flex sm6>
                                <v-text-field
                                v-model.lazy="validatorAmountInput"
                                :rules="[
                                        v => !!v || 'Validator Amount is required',
                                        v => /^-?\d*(\.\d+)?$/.test(v) || 'Validator Amount is not valid'
                                    ]"
                                label="Validator's Amount"
                                :disabled="disabled"
                                required
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                                <v-select
                                v-model="sourceInput"
                                :items="sourceItems"
                                :rules="[v => !!v || 'Source is required']"
                                label="Source"
                                :disabled="disabled"
                                required
                                >
                            </v-select>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="noteInput"
                                label="Note"
                                :disabled="disabled"
                                >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                            <v-select
                                v-model="branchInput"
                                :items="branchItems"
                                :rules="[v => !!v || 'Branch is required']"
                                label="Branch"
                                :disabled="disabled"
                                required
                                >
                            </v-select>
                        </v-flex>
                        <v-flex sm6 v-if="admin">
                            <v-select
                                v-model="agentInput"
                                :items="agentItems"
                                :rules="[v => !!v || 'Agent is required']"
                                label="Agent"
                                :disabled="disabled"
                                required
                                >
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card-text>

        <hr class="divider"/>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="contactBtn"
            @click="turnOffDialog"
            >
            Contract
            </v-btn>
            <v-btn class="cancelBtn"
            @click="turnOffDialog"
            >
            Cancel
            </v-btn>
            <v-btn
            class="OkBtn"
            @click="turnOffDialog"
            :disabled="!valid"
            >
            OK
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "order-form",
  props: {
    type: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    asset: {
        type: String,
        default: ''
    },
    assetType: {
        type: String,
        default: ''
    },
    source: {
        type: String,
        default: ''
    },
    branch: {
        type: String,
        default: ''
    },
    IDCard: {
        type: String,
        default: ''
    },
    expectedAmount: {
        type: Number,
        default: null
    },
    validatorAmount: {
        type: Number,
        default: null
    },
    note: {
        type: String,
        default: ''
    },
    agent: {
        type: String,
        default: ''
    }
  },
  data(){
    return {
        valid: false,
        admin: false,
        disabled: true,
        assetTypeItems: [
            'Laptop',
            'Camera',
            'Phone',
            'Car',
            'Bike',
            'Truck',
            'Watch'
        ],
        sourceItems: [
            'Chat',
            'Fanpage',
            'Hotline',
            'Online',
            'Walk-in',
            'Referral'
        ],
        branchItems: [
            'DTH',
            'CMT8',
            'Can Tho'
        ],
        agentItems: [
            'Linh',
            'Hong',
            'Thao'
        ],
        firstNameInput: this.firstName,
        lastNameInput: this.lastName,
        phoneInput: this.phone,
        assetInput: this.asset,
        assetTypeInput: this.assetType,
        sourceInput: this.source,
        branchInput: this.branch,
        IDCardInput: this.IDCard,
        expectedAmountInput: this.expectedAmount,
        validatorAmountInput: this.validatorAmount,
        noteInput: this.note,
        agentInput: this.agent
    }
  },
  computed: {
    nameForm() {
        switch(this.type) {
            case 'new':
                return 'New Order'
            case 'detail':
                return 'Order Detail'
            default:
                return 'Form'
        }
    }
  },
  methods: {
    ...mapActions({
      changeDialog: 'order/changeDialog'
    }),
    turnOffDialog: function() {
        this.$refs.form.reset()
        this.changeDialog({dialog: false})
    }
  }
}
</script>

<style>
.title {
  font-size: 30px !important;
  font-weight: bold;
}

.divider {
  margin-bottom: 0px;
  margin-top: 0px;
}

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
.top-content {
    padding-top: 20px;
}

.order-border {
  border-radius: 2px;
  padding: 60px 0px 50px 100px;
  background-color: #fff;
}

.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}
</style>