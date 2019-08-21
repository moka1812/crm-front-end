<template>
  <v-dialog v-model="dialog" persistent max-width="1000px">
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
                                v => !!v || 'Yêu cầu cần có',
                                //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                            ]"
                            label="Phone*"
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
                              label="Source*"
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
                                label="Loại tài sản*"
                                :disabled="disabled"
                                required
                            >
                            </v-select>
                        </v-flex>
                        <v-flex sm6>
                          <v-text-field
                            v-model="expectedAmountInput"
                            :rules="[
                                    v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                ]"
                            label="Giá mong muốn"
                            :disabled="disabled"
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
                                :disabled="disabled"
                                required
                            >
                            </v-textarea>
                        </v-flex>
                        <v-flex sm6>
                            <v-text-field
                              v-model="validatorAmountInput"
                              :rules="[
                                      v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                  ]"
                              label="Giá thẩm định"
                              :disabled="disabled"
                              :hint="this.validatorAmountHint"
                            >
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex sm6>
                            <v-textarea
                                v-model.lazy="noteInput"
                                label="Note"
                                rows="1"
                                auto-grow
                                :disabled="disabled"
                                >
                            </v-textarea>
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
        <v-btn class="cancelBtn"
          @click="this.cancleHandle"
          :disabled="orderCreating"
          color="#fff"
          round
        >
          Cancel
        </v-btn>
        <v-btn
          class="TemporarySavingBtn"
          @click="this.temporarySavingHandle"
          :disabled="orderCreating"
          color="#43425d"
          round
        >
          Tạm lưu
        </v-btn>
        <v-btn
          class="TemporarySavingBtn"
          @click="this.newContractHandle"
          :disabled="!valid || orderCreating"
          color="#43425d"
          round
        >
          New Contract
        </v-btn>
        <v-btn
          class="OkBtn"
          @click="this.okHandle"
          :disabled="!valid"
          :loading="orderCreating"
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
import { ClientService, ClientError } from '../../services/client.service'
import { setTimeout, clearTimeout } from 'timers';
import sourceItems from '../../mixins/source_items'
import changeDigitToText from '../../mixins/money'

export default {
  name: "new-order",
  data(){
    return {
      dialog: false,
      valid: false,
      sourceItems: sourceItems,
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
  mounted() {
    this.getSAssetList()
  },
  computed: {
    ...mapGetters({
      orderCreating: 'order/orderCreating',
      orderCreatingResult: 'order/orderCreatingResult',
      orderCreatingErrorCode: 'order/orderCreatingErrorCode',
      orderCreatingError: 'order/orderCreatingError',
      clientSearching:'order/clientSearching',
      clientSearchErrorCode:'order/clientSearchErrorCode',
      clientSearchError:'order/clientSearchError',
      clientResult: 'order/clientResult',
      temporaryOrderDetail: 'order/temporaryOrderDetail',
      SAssetListResult: 'asset/SAssetListResult',
    }),
    disabled() {
      //If Error Code == 200 then disable is false
      if (this.clientSearchErrorCode == 200){
        
        try {
          //PhoneInput rule is failing
          if (this.$refs['phone'].hasError) {
              return true
          } 
        } catch (error) { }
        
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
  },
  watch: {
    //When clientResult changes
    clientResult() {
      if (this.clientResult !== null) {
        this.firstNameInput = this.clientResult.firstName
        this.lastNameInput = this.clientResult.lastName
      } else {
        this.firstNameInput = ''
        this.lastNameInput = ''
      }
    },
    //When finish call API get SAsset, Update assetTypeItems
    SAssetListResult() {
      const asset = []
      for (let item of this.SAssetListResult) {
        asset.push(item.description)
      }
      this.assetTypeItems = asset
    },
    //When finish call API search client
    clientSearchErrorCode() {
      if (this.clientSearchErrorCode != 0 && this.clientSearchErrorCode != 200){
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.clientSearchErrorCode,
          text: this.clientSearchError,
        });
      }
    },
    dialog() {
      if (this.temporaryOrderDetail !== null && this.dialog === true) {
        this.phoneInput = this.temporaryOrderDetail.phone
        this.firstNameInput = this.temporaryOrderDetail.firstName
        this.lastNameInput = this.temporaryOrderDetail.lastName
        this.expectedAmountInput = this.temporaryOrderDetail.expectedAmount
        this.validatorAmountInput = this.temporaryOrderDetail.validatorAmount
        this.assetTypeInput = this.temporaryOrderDetail.assetType
        this.assetInput = this.temporaryOrderDetail.asset
        this.sourceInput = this.temporaryOrderDetail.source
        this.noteInput = this.temporaryOrderDetail.note
        this.clientSearch({phone: this.phoneInput})
      }
    },
  },
  methods: {
    ...mapActions({
      createOrder: 'order/createOrder',
      createOrderForContract: 'order/createOrderForContract',
      getOrderList: 'order/getOrderList',
      getSAssetList: 'asset/getSAssetList',
      clientSearch: 'order/searchClient',
      saveOrderTemporarily: 'order/saveOrderTemporarily',
      removeTemporaryOrder: 'order/removeTemporaryOrder',
    }),
    reset() {
      //Reset Form
      this.$refs.form.resetValidation()
      this.firstNameInput = ''
      this.lastNameInput = ''
      this.phoneInput = ''
      this.assetTypeInput = ''
      this.assetInput = ''
      this.sourceInput = ''
      this.IDCardInput = ''
      this.expectedAmountInput = ''
      this.validatorAmountInput = ''
      this.noteInput = ''
      this.agentInput = ''
      this.removeTemporaryOrder()
    },
    //Get ID Asset Type From Description
    findAssetTypeID(assetType) {
      for (let item of this.SAssetListResult) {
        if (item.description == assetType) {
          return item.id
        }
      }
    },
    temporarySavingHandle() {
      const orderDetail = {
        phone: this.phoneInput,
        firstName: this.firstNameInput,
        lastName: this.lastNameInput,
        expectedAmount: this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput,
        assetType: this.assetTypeInput,
        asset: this.assetInput,
        source: this.sourceInput,
        note: this.noteInput,
      }
      this.saveOrderTemporarily({orderDetail})
      this.dialog = false
    },
    newContractHandle: async function() {
      const assetTypeID = await this.findAssetTypeID(this.assetTypeInput)

      const data = {
        phone: this.phoneInput,
        firstName: this.firstNameInput,
        expectedAmount: this.expectedAmountInput == '' ? null : this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput == '' ? null : this.validatorAmountInput,
        assetTypeID: assetTypeID,
        assetTypeDescription: this.assetInput,
        source: this.sourceInput,
        note: this.noteInput,
      }

      this.createOrder(data).then(() => {
        if (this.orderCreatingErrorCode == 201) {
          this.dialog = false

          const orderDetail = {
            phone: this.phoneInput,
            name: this.firstNameInput,
            lastName: this.lastNameInput,
            expectedAmount: this.expectedAmountInput,
            validatorAmount: this.validatorAmountInput,
            assetType: this.assetTypeInput,
            asset: this.assetInput,
            assetID: this.orderCreatingResult.asset,
            orderID: this.orderCreatingResult.id,
            source: this.sourceInput,
          }

          this.$router.push({name: 'new_contract', params: {orderDetail}})
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
    //Create new order
    okHandle: async function() {
      const assetTypeID = await this.findAssetTypeID(this.assetTypeInput)
      
      const data = {
        phone: this.phoneInput,
        firstName: this.firstNameInput,
        expectedAmount: this.expectedAmountInput == '' ? null : this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput == '' ? null : this.validatorAmountInput,
        assetTypeID: assetTypeID,
        assetTypeDescription: this.assetInput,
        source: this.sourceInput,
        note: this.noteInput,
      }

      this.createOrder(data).then(() => {
        //Create New Order Successfully, Close Dialog
        if (this.orderCreatingErrorCode == 201) {
          //Turn off Dialog
          this.dialog = false
          this.reset()
          //Notify create Order Successfully
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Tạo Order thành công",
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

    cancleHandle() {
      this.reset()
      this.dialog = false
    },

    search() {
      if (this.timer !== null) {
          clearTimeout(this.searchTime);
          this.searchTime = null;
      }
      this.searchTime = setTimeout(() => {
          if (!this.$refs['phone'].hasError) {
              this.clientSearch({phone: this.phoneInput})
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
  margin-right: 4px;
  margin-left: 4px;
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
  padding: 8px 7px 8px 5px;
}

.title {
  font-size: 30px !important;
  font-weight: bold;
}

.cancelBtn {
  color: #dd1e26 !important;
}
.TemporarySavingBtn {
  color: #fff !important;
}
.OkBtn {
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
