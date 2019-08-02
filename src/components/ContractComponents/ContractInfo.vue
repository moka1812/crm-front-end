<template>
  <v-card fluid class="content-contract-info">
    <v-layout align-center justify-center column class="contract-detail">
      <div class="titile-contract-info">
        <i class="material-icons" :class="classStatusContract">fiber_manual_record</i>
        <strong>#325423542</strong>
      </div>
      <span>Camdo Special Rate</span>
      <span>Disbursement date: 23/3/2019</span>
      <span>Loan Officer: Nhung Phan</span>
      <span>Branch: CMT3 &nbsp;|&nbsp; Storage: DTH</span>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="customer-info">
      <div class="titile-customer-info">
        <Strong>Customer Infomation</Strong>
      </div>
      <span class="label-customer">Name</span>
      <router-link to="/contracts">Nguyễn Văn A</router-link>
      <span class="label-customer">Phone number 1:</span>
      <span>+84013218328</span>
      <span class="label-customer">Alternate Phone</span>
      <span>+84013218328</span>
      <span class="label-customer">Home Address</span>
      <span>Sân bay Tân SSS</span>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-center justify-center row class="button-bottom">
      <v-btn round class="btn-extend" :to="{ name: 'new_contract' }">
        <i class="material-icons">hourglass_full</i>
        Extend
      </v-btn>
      <v-btn round class="btn-repay" :to="{ name: 'new_contract' }">
        <i class="material-icons">check_circle</i>
        Repay
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "contract-info",
  components: {},
  data: () => ({
    classStatusContract: "online-status-contract"
  }),
  
};
</script>

<style scoped>
.content-contract-info {
  padding: 0px;
  height: 100% !important;
}

/* css contract */
.titile-contract-info {
  display: inline-flex;
  margin-top: 35px;
  margin-bottom: 15px;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.contract-detail span{
  margin: 5px;
  font-size: 1vw;
}

.contract-detail strong{
  font-size: 1.5vw;
}

.online-status-contract {
  color: #00FF5F;
}

/* css customer info */
.customer-info {
  padding-left: 35px;
}

.customer-info strong {
  font-size: 1.1vw;
}

.customer-info span {
  font-size: 1vw;
}

.customer-info a {
  text-decoration: underline !important;
}

.titile-customer-info {
  text-align: center;
  width: 100%;
  margin: 2px 0px 5px -30px;
}

.customer-info .label-customer {
  color: #A5A5A7;
  margin-top: 5px;
}

/* button bottom*/
.button-bottom {
  margin-top: 20px;
  margin-bottom: 5vw;
}

.button-bottom .btn-extend, .button-bottom .btn-repay{
  margin: 5px;
  padding: 1px;
  border-radius: 20px;
  font-size: 12px !important;
  color: #ffffff;
  text-transform: capitalize !important;
}

.button-bottom i {
  margin-right: 2px;
}

.btn-extend {
  background-color: #91CB3E !important;
}

.btn-repay {
  background-color: #EA526F !important;
}

.class-border {
  border: 1px solid #BFBFBF;
  margin: 10px 20px;
}

</style>
