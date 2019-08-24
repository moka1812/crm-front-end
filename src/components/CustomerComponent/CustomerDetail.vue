<template>
  <v-layout align-space-around justify-start column>
    <v-layout align-center justify-end row class="customer-button-top">
      <call-dialog 
            :flagCustomer="'customer'"
            :phoneNumber1="'+2371412647231'"
            :phoneNumber2="'+2371412647223'"
      />
      <v-btn fab dark small class="mx-2 btn-mail">
        <i class="material-icons">mail</i>
      </v-btn>
      <v-btn round class="btn-back-customer" :to="{ name: 'customers' }">
        <i class="material-icons">close</i>
      </v-btn>
    </v-layout>
    <v-layout align-space-around justify-start row fill-height fluid class="content-customer-detail">
      <v-flex xs4 class="container box-customer-info">
          <customer-info v-bind:customerId="customerId"/>
      </v-flex>
      <v-flex xs8 class="container box-customer-tabs">
          <customer-tabs v-bind:customerId="customerId"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import CallDialog from '../commonComponent/CallDialog.vue'
import CustomerTabs from "./CustomerTabs.vue";
import CustomerInfo from "./CustomerInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "customer-detail",
  components: { CustomerInfo, CustomerTabs, CallDialog },
  data: () => ({
    customerId: null
  }),
  watch: {
    '$route': {
      handler: 'getCustomerById',
      immediate: true
    }
  },
  created() {
    this.getCustomerById();
  },
  methods: {
    getCustomerById() {
      this.customerId = String(this.$route.query.id);
    },
  }
};
</script>

<style scoped>
.container {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  background-color: #FFFFFF !important;
}

.content-customer-detail {
  padding: 0px !important;
  margin: 0px !important;
  height: 100%;
  border: none;
}

.box-customer-info {
  margin-right: 15px !important;
  min-width: 300px !important;
}

.box-customer-tabs {
  min-width: 700px !important;
}

.btn-back-customer {
  background-color: #DD1E26 !important;
  min-width: 2.5vw !important;
  padding: 1px;
  margin: 0px 0px  5px 0px;
  font-size: 1vw !important;
  color: #ffffff !important;
  border-radius: 5% !important;
}

.customer-button-top .btn-mail {
  color: #DD1E26 !important;
  background-color: #FFFFFF!important;
  margin-right: 20px !important;
}
</style>