<template>
  <v-card fluid class="content-contract-info">
    <v-layout align-center justify-center column class="contract-detail">
      <div class="titile-contract-info">
        <i class="material-icons" 
           :class="getClassStatus(contractDetail.status)">
          fiber_manual_record
        </i>
        <strong>#{{contractDetail.contractID}}</strong>
      </div>
      <span>Camdo Special Rate</span>
      <span>Ngày Giờ Mở HĐ: {{contractDetail.createdDate}}</span> 
      <span>Làm hợp Đồng: {{contractDetail.agentName}}</span>
      <span>Chi nhánh: {{contractDetail.branchName}} &nbsp;|&nbsp; Lưu Kho: {{contractDetail.storageId}}</span>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="customer-info">
      <div class="titile-customer-info">
        <Strong>Thông Tin Khách Hàng</Strong>
      </div>
      <span class="label-customer">Họ tên:</span>
      <router-link :to="'/customers/customer-detail?id='+this.customerDetail.id">
        {{this.customerDetail.fullName}}
      </router-link>
      <span class="label-customer">Số Điện Thoại 1:</span>
      <span>{{this.customerDetail.primaryPhone}}</span>
      <span v-show="disablePhone()" class="label-customer">Số Điện Thoại 2:</span>
      <span v-show="disablePhone()">{{this.customerDetail.alternativePhone}}</span>
      <span class="label-customer">Địa chỉ:</span>
      <span>{{this.customerDetail.address}}</span>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-center justify-center row class="button-bottom">
      <v-btn round class="btn-extend" :to="{ name: 'extension-contract' }">
        <i class="material-icons">hourglass_full</i>
        Gia Hạn
      </v-btn>
      <v-btn round class="btn-repay" :to="{ name: 'contract-repayment' }">
        <i class="material-icons">check_circle</i>
        Tất Toán
      </v-btn>
    </v-layout>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'
import { isNullOrUndefined } from 'util';

export default {
  name: "contract-info",
  components: {},
  props: {
    contractId: String,
  },
  created() {
    this.getContractById();
  },
  computed: {
     ...mapGetters({
        contractDetail: 'contract/contractDetail',
        customerDetail: 'customer/customerDetail'
      }),
  },
  methods: {
    ...mapActions({
      getContractByContractId: 'contract/getContractByContractId',
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId'
    }),
    getContractById:async function(){
      await this.getContractByContractId({id: this.contractId});
      this.getCustomerById();
    },
    getCustomerById(){
      if (isNullOrUndefined(this.contractDetail) === false && 
          isNullOrUndefined(this.contractDetail.clientId) === false) {
        this.getCustomerByCustomerId({id: this.contractDetail.clientId})
      }
    },
    getClassStatus(status){
      if (isNullOrUndefined(status)){
        return '';
      } else if (status.toUpperCase()==='ACTIVE') {
        return 'active-status';
      } else if (status.toUpperCase()==='OVERDUE') {
          return 'overdue-status';
      }else if (status.toUpperCase()==='WAITING') {
        return 'waiting-status';
      } else if (status.toUpperCase()==='CLOSED') {
        return 'close-status';
      }
    },
    disablePhone(){
      return isNullOrUndefined(this.customerDetail.alternativePhone) === false;
    }
  },
  watch: {
    getContract() {
      this.getContractById();
    },
  },
  
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

.active-status {
  color: #00FF5F;
}

.waiting-status {
  color: #F6AC3B;
}

.close-status {
  color: #CECFD0;
}

.overdue-status {
  color: #DD1E26;
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
  font-size: 1vw !important;
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

.content-contract-info .class-border {
  border: 1px solid #BFBFBF;
  margin: 10px 20px;
}
</style>
