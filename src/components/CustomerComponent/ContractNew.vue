<template>
  <div class ="schudule-repayment">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="scheduleListResult"
      :loading="scheduleListRequest"
      item-key="contractId"
      :expand="true"
      :rows-per-page-items=[2]
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.contractId }}</td>
          <td class="text-xs-center content">{{ props.item.loan_accout }}</td>
          <td class="text-xs-center content ">{{ props.item.paid_date }}</td>
          <td class="text-xs-center content">{{ props.item.assset_type }}</td>
          <td class="text-xs-center content" >
            {{ props.item.original_loan }}
          </td>
          <td class="text-xs-center content">{{ props.item.loan_balance }}</td>
          <td class="text-xs-center content">{{ props.item.amount_paid }}</td>
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
import { mapActions } from 'vuex';

export default {
  name: "contract-new-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  data() {
    return {
      headers: [
        {
          text: "Mã hợp đồng", value: "contractId", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Loan Accout", value: "loan_accout", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày hết hạn", value: "paid_date", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Tài sản", value: "assset_type", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Origial Loan", value: "original_loan", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loan Balance", value: "loan_balance", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Amount Pain", value: "amount_paid", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Storage Location", value: "storage_location", align: 'center', sortable: false, class: "header"
        },
      ],
            scheduleListResult: [
                {
                    contractId: 1,
                    loan_accout: '01/01/2019',
                    paid_date: '01/01/2019',
                    assset_type: 'Active',
                    amount_paid: 'David',
                    storage_location: 'Iphone 7',
                    original_loan: '5.000.000',
                    loan_balance: '4.99',
                },
                 {
                     contractId: 1,
                    loan_accout: '01/01/2019',
                    paid_date: '01/01/2019',
                    assset_type: 'Active',
                    amount_paid: 'David',
                    storage_location: 'Iphone 7',
                    original_loan: '5.000.000',
                    loan_balance: '4.99',
                },
            
      ],
      scheduleListRequest: false,
    }
  },
  mounted() {
        
  },
  methods: {
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
</style>
