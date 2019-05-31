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
                                @keyup="this.search"
                                :loading="this.clientSearching"
                                :disabled="this.clientSearching"
                                ref="phone"
                                required
                                >
                            </v-text-field>
                        </v-flex>
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
                                label="Last Name"
                                :disabled="true"
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
            v-if="isContract"
            @click="this.contractHandle"
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
            v-if="!orderRequest"
            >
            OK
            </v-btn>
            <v-progress-circular
            indeterminate
            color="red"
            v-else
            ></v-progress-circular>
        </v-card-actions>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { ClientService, ClientError } from '../../services/client.service'
import { setTimeout, clearTimeout } from 'timers';

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
    },
  },
  data(){
    return {
        valid: false,
        admin: false,
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
        agentInput: this.agent,
        //for Search Client fuction
        searchTime: null,
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
    },
    isContract() {
        if (this.type == 'new') {
            return false
        }
        return true
    },
    ...mapGetters({
      clientSearching:'order/clientSearching',
      clientSearchErrorCode:'order/clientSearchErrorCode',
      clientSearchError:'order/clientSearchError',
      clientResult: 'order/clientResult',
      orderRequest: 'order/orderRequest',
      orderCreatingErrorCode: 'order/orderCreatingErrorCode',
    }),
    disabled() {
        //If Error Code == 200 then disable is false
        if (this.clientSearchErrorCode == 200){
            //PhoneInput rule is failing
            if (this.$refs['phone'].hasError) {
                return true
            } 
            return false
        
        } else if (this.clientSearchErrorCode != 0){
            this.$notify({
                group: 'foo',
                type: 'error',
                title: "Error: "+this.clientSearchErrorCode,
                text: this.clientSearchError
            });
        }
        return true
    }
  },
  watch: {
    //When clientResult changes
    clientResult() {
        if (this.clientResult != null) {
            this.firstNameInput = this.clientResult.first_name
            this.lastNameInput = this.clientResult.last_name
        } else {
            this.firstNameInput = null
            this.lastNameInput = null
        }
    },
    //When Finish Create Order
    orderCreatingErrorCode() {
        //Check Form is New Order
        if (this.type == 'new') {
            //Create Order Successful, Empty Form 
            if (this.orderCreatingErrorCode == 201) {
                this.$refs.form.reset()
            }
        }
    }
  },
  methods: {
    ...mapActions({
        clientSearch: 'order/searchClient',
        clientReset: 'order/clientReset'
    }),
    contractHandle: function() {
        this.$emit('contract')
    },
    cancleHandle: function() {
        this.$refs.form.reset()
        this.$emit('cancle')
    },
    okHandle: function() {
        let data = {
            phone: this.phoneInput,
            firstName: this.firstNameInput,
            expectedAmount: this.expectedAmountInput,
            validatorAmount: this.validatorAmountInput,
        }
        this.$emit('ok', data)
    },
    search: function() {
        if (this.timer !== null) {
            clearTimeout(this.searchTime);
            this.searchTime = null;
        }
        this.searchTime = setTimeout(() => {
            if (!this.$refs['phone'].hasError) {
                this.clientSearch({phone: this.phoneInput})
            } else {
                this.clientReset()
            }
        }, 2000)
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