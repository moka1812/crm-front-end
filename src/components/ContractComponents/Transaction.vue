<template>
  <div class ="contract-transaction">
    <v-data-table
      :headers="headers"
      :items="transactionListResult"
      :loading="transactionListRequest"
      item-key="day"
      :expand="true"
      hide-actions
      class="elevation-1"
    >
    <template v-if="headers" slot="headers" slot-scope="row">
        <tr>
          <th :key="header.text" v-for="header in row.headers" class="header" 
          v-bind:colspan="header.value === 'interest' ? 4 : 1"
          >
          {{ header.text }}
          </th>
        </tr>
      </template>
          <template v-slot:items="props">
        <tr :key="props.index"> 
          <td class="text-xs-center content">{{ props.item.office }}</td>
          <td class="text-xs-center content">{{ props.item.transaction_date }}</td>
          <td class="text-xs-center content ">{{ props.item.transaction_type }}</td>
          <td class="text-xs-center content">{{ props.item.amount }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content" >{{ props.item.principal }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ props.item.interest }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ props.item.fee }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ props.item.penalties }}</td>
          <td class="text-xs-center content">{{ props.item.loan_balance }}</td>
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

export default {
  name: "transaction-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  props: {
    contractId: String
  },
  data() {
    return {
      headers: [
        {
          text: "Chi nhánh", value: "office", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngày giao dịch", value: "transaction_date", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loại giao dịch", value: "transaction_type", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Số tiền", value: "amount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Chi tiết", value: "interest", align: 'center', sortable: false, class: "header", colspan :"4"
        },
        {
          text: "Dư nợ", value: "loan_balance", align: 'center', sortable: false, class: "header"
        },
      ],
      // transactionListResult: [
      //           {
      //               office: '',
      //               transaction_date: '',
      //               transaction_type: '',
      //               amount: '',
      //               principal: 'Gốc',
      //               interest: 'Lãi',
      //               fee: 'Phí',
      //               penalties: 'Lãi thêm',
      //               loan_balance: '',
      //           },
      //           {
      //               office: 'CMT8',
      //               transaction_date: '31/2/2019',
      //               transaction_type: 'Repayment',
      //               amount: 9000000,
      //               principal: 9000000,
      //               interest: 0,
      //               fee: 1000000,
      //               penalties: 0,
      //               loan_balance: 9000000,
      //           },
      // ],
      // transactionListRequest: false,
    }
  },
  created() {
    this.getTransaction();
  },
  computed: {
     ...mapGetters({
      transactionListResult: 'contract/transactionListResult',
      transactionListRequest: 'contract/transactionListRequest',
      contractListError: 'contract/contractListError',
      contractListErrorCode: 'contract/contractListErrorCode',
      }),
  },
  methods: {
     ...mapActions({
      getContractTransactionLog: 'contract/getContractTransactionLog',
    }),
    getTransaction() {
      this.getContractTransactionLog({id: this.contractId})
    },
  },
}
</script>

<style>
.contract-transaction {
  margin-top: 15px;
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
  text-align: center;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>
