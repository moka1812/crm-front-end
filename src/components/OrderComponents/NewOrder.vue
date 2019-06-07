<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn round v-on="on" class="new-order">
        <div class="back-white plus">
          <i class="fas fa-plus"></i>
        </div>
            New order
      </v-btn>
    </template>
    <v-card>
        <v-card-title >
            <span class="title">New Order</span>
        </v-card-title>

        <v-divider></v-divider>

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
                              v-model="sourceInput"
                              :items="sourceItems"
                              :rules="[v => !!v || 'Yều cầu cần có']"
                              label="Source"
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
                                label="Tên"
                                :disabled="disabled"
                                >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="lastNameInput"
                                label="Họ"
                                :disabled="true"
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
                                :disabled="disabled"
                                required
                            >
                            </v-select>
                        </v-flex>
                        <v-flex sm6>
                          <v-text-field
                            v-model.lazy="expectedAmountInput"
                            :rules="[
                                    v => /^$|^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                ]"
                            label="Giá mong muốn"
                            :disabled="disabled"
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
                              :disabled="disabled"
                              required
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                              v-model.lazy="validatorAmountInput"
                              :rules="[
                                      v => /^$|^-?\d*(\.\d+)?$/.test(v) || 'Dữ liệu không hợp lệ'
                                  ]"
                              label="Giá thẩm định"
                              :disabled="disabled"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                            <v-text-field
                                v-model.lazy="noteInput"
                                label="Note"
                                :disabled="disabled"
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
    </v-card>
  </v-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import { ClientService, ClientError } from '../../services/client.service'
import { setTimeout, clearTimeout } from 'timers';

export default {
  name: "new-order",
  data(){
    return {
      dialog: false,
      valid: false,
      sourceItems: [
          'Chat',
          'Fanpage',
          'Hotline',
          'Online',
          'Walk-in',
          'Referral'
      ],
      assetTypeItems: [],
      firstNameInput: '',
      lastNameInput: '',
      phoneInput: '',
      assetTypeInput: '',
      assetInput: '',
      sourceInput: '',
      IDCardInput: '',
      expectedAmountInput: '',
      validatorAmountInput: '',
      noteInput: '',
      agentInput: '',
      //for Search Client fuction
      searchTime: null,
    }
  },
  computed: {
    ...mapGetters({
      orderCreatingErrorCode: 'order/orderCreatingErrorCode',
      orderCreatingError: 'order/orderCreatingError',
      currentBranchID: 'branch/currentBranchID',
      clientSearching:'order/clientSearching',
      clientSearchErrorCode:'order/clientSearchErrorCode',
      clientSearchError:'order/clientSearchError',
      clientResult: 'order/clientResult',
      orderRequest: 'order/orderRequest',
      SAssetListResult: 'asset/SAssetListResult',
    }),
    disabled() {
        //If Error Code == 200 then disable is false
        if (this.clientSearchErrorCode == 200){
            //PhoneInput rule is failing
            if (this.$refs['phone'].hasError) {
                return true
            } 
            return false
        
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
            this.firstNameInput = ''
            this.lastNameInput = ''
        }
    },
    SAssetListResult() {
      let asset = []
      for (let item of this.SAssetListResult) {
          asset.push(item.description)
      }
      return this.assetTypeItems = asset
    },
    clientSearchErrorCode() {
      if (this.clientSearchErrorCode != 0 && this.clientSearchErrorCode != 200){
          this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: "+this.clientSearchErrorCode,
              text: this.clientSearchError
          });
      }
    }
  },
  methods: {
    ...mapActions({
        createOrder: 'order/createOrder',
        getOrderList: 'order/getOrderList',
        clientSearch: 'order/searchClient',
        clientReset: 'order/clientReset'
    }),
    findAssetTypeID(assetType) {
        for (let item of this.SAssetListResult) {
            if (item.description == assetType) {
                return item.id
            }
        }
    },
    //Create new order
    okHandle: async function() {
      let assetTypeID = await this.findAssetTypeID(this.assetTypeInput)
      
      let data = {
        phone: this.phoneInput,
        firstName: this.firstNameInput,
        expectedAmount: this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput,
        assetTypeID: assetTypeID,
        assetTypeDescription: this.assetInput,
        source: this.sourceInput,
        branchID: this.currentBranchID
      }

      this.createOrder(data).then(() => {
        //Create New Order Successfully, Close Dialog
        if (this.orderCreatingErrorCode == 201) {
          //Turn off Dialog
          this.dialog = false
          //Notify create Order Successfully
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Create Order Successfully",
            text: ''
          });
          this.getOrderList()
        //Error
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: "Error: "+this.orderCreatingErrorCode,
            text: this.orderCreatingError
          });
        }

      })
    },

    cancleHandle: function() {
      this.$refs.form.reset()
      this.dialog = false
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
    },
  }
}
</script>

<style scoped>
.new-order {
  background-color: #dd1e26 !important;
  color: #fff !important;
}

.back-white {
  background-color: #fff;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.back-white i {
  color: #dd1e26; 
  font-size: 25px;
  padding: 10px;
}

.plus {
  background-color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 5px;
}

.plus i {
  color: #dd1e26;
  font-size: 10px;
  padding: 8px;
}

.title {
  font-size: 30px !important;
  font-weight: bold;
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