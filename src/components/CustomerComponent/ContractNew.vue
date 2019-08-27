<template>
  <div class ="schudule-repayment">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="contractActiveListResult"
      :loading="contractActiveListRequest"
      item-key="contractId"
      :expand="true"
      :rows-per-page-items=[2]
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">
            <div class="icon-status">
              <i class="material-icons" 
                :class="getClassStatus(props.item.status)">
                fiber_manual_record
              </i>
              <span>{{ props.item.contractId }}</span>
            </div>
          </td>
          <td class="text-xs-center content">{{ props.item.loan_accout }}</td>
          <td class="text-xs-center content ">{{ props.item.paid_date }}</td>
          <td class="text-xs-center content">{{ props.item.assset_type }}</td>
          <td class="text-xs-center content">{{ props.item.loan_balance }}</td>
          <td class="text-xs-center content">{{ props.item.storage_location }}</td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
  </div>
</template>

<script>

import ActionButton from "@/components/OrderComponents/ActionButton.vue";
import CallButton from "@/components/OrderComponents/CallButton.vue"
import CallTable from "@/components/OrderComponents/CallTable.vue"
import { mapActions, mapGetters } from "vuex";
import { isNullOrUndefined } from 'util';

export default {
  name: "contract-new-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  props: {
    customerId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Mã hợp đồng", value: "contractId", align: 'center', sortable: false, class: "header wrap-text", 
        },
        {
          text: "Loan Accout", value: "loan_accout", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Ngày hết hạn", value: "paid_date", align: 'center', sortable: false, class: "header wrap-text", 
        },
        { 
          text: "Tài sản", value: "assset_type", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Loan Balance", value: "loan_balance", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Storage Location", value: "storage_location", align: 'center', sortable: false, class: "header wrap-text"
        },
      ],
    }
  },
  created() {
    this.getActiveContract();
  },
  computed: {
    ...mapGetters({
      contractActiveListResult: "customer/contractActiveListResult",
      contractActiveListRequest: "customer/contractActiveListRequest"
    })
  },
  methods: {
      ...mapActions({
      getContractActive: "customer/getContractActive",
    }),
    getActiveContract() {
      this.getContractActive({id : this.customerId})
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
  },
}
</script>

<style>
.schudule-repayment .v-toolbar{
  margin: 0px !important;
}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}
td.content {
  font-size: 1vw !important;
  padding: 0px !important;
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
.button-bottom .btn-extend, .button-bottom .btn-repay{
  margin: 5px;
  padding: 1px;
  font-size: 1vw !important;
  color: #ffffff;
  text-transform: capitalize !important;
}
.btn-extend {
  background-color: #91CB3E !important;
  margin-right: 30px;
}

.btn-repay {
  background-color: #EA526F !important;
}

.wrap-text {
  word-wrap: break-word;
  white-space: pre-line !important;
}

.icon-status {
  display: inline-flex;
  margin-right: 5px;
  text-align: left;
  align-items: center;
  vertical-align: middle;
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
</style>
