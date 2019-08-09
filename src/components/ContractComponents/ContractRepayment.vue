<template>
  <v-container fluid class="pa-0 ma-2">
    <v-layout row>
      <v-flex md5 class="title">
        <h2>Tất Toát Hợp Đồng</h2>
        <h3 v-show="step===1">Overview</h3>
        <h3 v-show="step===2">Phiếu Thu</h3>
      </v-flex>
      <v-spacer />
      <v-flex md4>
        <v-stepper alt-labels v-model="step" class="elevation-0 background">
          <v-stepper-header>
            <template v-for="index in 2" class="step">
              <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
              <v-divider v-if="index !== 2" :key="`divider-${index}`" />
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-form v-model="valid" class="form-contract">
          <v-container>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Mã HĐ
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="contracIdInput"
                  rows="1"
                  auto-grow
                  :rules="[v => !!v || 'Yều cầu cần có']"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Phí</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="feeInput"
                  placeholder="Phí"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Ngày giao dịch
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <date-picker v-model="transactionDateInput" placeholder="dd/mm/yyyy"/>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Lãi thêm</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="penaltyInput"
                  placeholder="Lãi thêm"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Gốc
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="principalInput"
                  placeholder="Gốc"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Tổng tiền</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="totalPaymentInput"
                  placeholder="Tổng tiền"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Lãi
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="interestInput"
                  placeholder="Lãi"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Hình thức thanh toán</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-radio-group v-model="paymentTypeInput" row>
                    <v-radio color="#dd1e26" label="Tiền mặt" aria-checked="true" value="Tiền mặt"></v-radio>
                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout align-end justify-end class="button-bottom">
              <v-btn round class="btn-back" :to="{ name: 'contract-detail' }">
                Back
              </v-btn>
              <v-btn round class="btn-next" @click="step++">
                Next
              </v-btn>
            </v-layout>
          </v-container>
        </v-form>
      </v-window-item>
      <v-window-item :value="2">
        <contract-repayment-preview/>
      </v-window-item>
    </v-window>
  </v-container>
</template>
<script>
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import ContractRepaymentPreview from './ContractRepaymentPreview.vue';
export default {
  name: "contract-repayment",
  components: {
    DatePicker,
    'contract-repayment-preview': ContractRepaymentPreview
  },
  data: () => ({
    step: 1,
    valid: true,
    contracIdInput: '',
    feeInput: '',
    transactionDateInput: '',
    assetTypeItems: [],
    penaltyInput: '',
    principalInput: '',
    paymentTypeInput: 'Tiền mặt',
    totalPaymentInput:'',
    interestInput:'',
  }),
  methods: {
  }
};
</script>
<style scoped>
  .background {
    background-color: #F0F0F7;
}
.step {
    padding-top: 0px;
}
.title {
    padding-top: 20px;
    padding-left: 16px;
}

.title h3 {
  font-weight: normal;
}

.form-contract {
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.form {
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.input-header {
    font-size: 1vw;
    color: black;
}
.header-form {
    max-width: 11%;
    width: 11%;
}
.header-form-left {
   margin-left: 5%;
}
.space {
    max-width: 15%;
}
.required {
  color: #dd1e26;
}
.btn-back, .btn-next{
  margin: 5px;
  padding: 1px;
  font-size: 1vw !important;
  text-transform: capitalize !important;
}
.btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26;
}
.btn-back:focus {
  background-color: #EAE5E5 !important;
}
.btn-next {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}
.btn-next:hover {
  background-color: #E84D4D !important;
}
</style>