<template>
  <div class ="schudule-repayment">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
       <v-layout align-center justify-end row class="button-bottom">
        <v-btn round class="btn-extend" :to="{ name: 'new_contract' }">
          <i class="material-icons">hourglass_full</i>
          Gia Hạn
        </v-btn>
        <v-btn round class="btn-repay" :to="{ name: 'new_contract' }">
          <i class="material-icons">check_circle</i>
          Tất Toán
        </v-btn>
    </v-layout>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="scheduleListResult"
      :loading="scheduleListRequest"
      item-key="day"
      :expand="true"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.day }}</td>
          <td class="text-xs-center content">{{ props.item.date }}</td>
          <td class="text-xs-center content ">{{ props.item.paid_date }}</td>
          <td class="text-xs-center content">{{ props.item.principal_due }}</td>
          <td class="text-xs-center content" >
            {{ props.item.blance_of_loan }}
          </td>
          <td class="text-xs-center content">{{ props.item.interest }}</td>
          <td class="text-xs-center content">{{ props.item.fees }}</td>
          <td class="text-xs-center content">{{ props.item.fenalties }}</td>
          <td class="text-xs-center content">
            {{ props.item.due }}
          </td>
          <td class="text-xs-center content">{{ props.item.pain }}</td>
          <td class="text-xs-center content">{{ props.item.in_advance }}</td>
          <td class="text-xs-center content">{{ props.item.late }}</td>
          <td class="text-xs-center content">{{ props.item.outstanding }}</td>
        </tr>
      </template>
      <template slot="footer">
        <td class="text-xs-center content total"></td>
        <td class="text-xs-center content total">Total</td>
        <td class="text-xs-center content total"></td> 
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalPrincipalExpected}}</td>
        <td class="text-xs-center content total"></td> 
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalInterestCharged}}</td>
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalFeeChargesCharged}}</td>
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalPenaltyChargesCharged}}</td>
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalRepaymentExpected}}</td> 
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalRepayment}}</td> 
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalAdvancePayment}}</td>
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalPaidLate}}</td> 
        <td class="text-xs-center content total">{{contractTotalResult === null ? '' : contractTotalResult.totalOutstanding}}</td>
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
  name: "repayment-shedule-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  props: {
    contractId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Số ngày", value: "day", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngày", value: "date", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày thanh toán", value: "paid_date", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Gốc đến hạn", value: "principal_due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giải ngân", value: "blance_of_loan", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi", value: "interest", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Phí", value: "fees", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi ngày", value: "fenalties", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tổng", value: "due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Đã thanh toán", value: "pain", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Thanh toán trước", value: "in_advance", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Trễ", value: "late", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tổng nợ", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
      ],
      // scheduleListResult: [
      //           {
      //               day: 1,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
      //            {
      //               day: 2,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
      //                            {
      //               day: 2,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
      //                            {
      //               day: 2,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
      //                            {
      //               day: 2,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
      //           {
      //               day: 2,
      //               date: '01/01/2019',
      //               paid_date: '01/01/2019',
      //               principal_due: 'Active',
      //               blance_of_loan: 'David',
      //               asset: 'Iphone 7',
      //               loanBalance: '5.000.000',
      //               interest: '4.99',
      //               fees: 123,
      //               fenalties: 'DTH',
      //               due: 'Iphone 7',
      //               pain: '5.000.000',
      //               in_advance: '4.99',
      //               late: 123,
      //               outstanding: 'DTH',
      //           },
                // {
                //     day: '',
                //     date: Total,
                //     paid_date: '',
                //     principal_due: 21321321,
                //     blance_of_loan: '',
                //     asset: '12321321',
                //     loanBalance: '0',
                //     interest: '0',
                //     fees: 1331414134,
                //     fenalties: '12313213',
                //     due: 213213213,
                //     pain: '21321313',
                //     in_advance: '0',
                //     late: 0,
                //     outstanding:0,
                // },
      // ],
      // scheduleListRequest: false,
    }
  },
  created() {
    this.getSchedule();
  },
  computed: {
     ...mapGetters({
      scheduleListResult: 'contract/scheduleListResult',
      scheduleListRequest: 'contract/scheduleListRequest',
      contractTotalResult: 'contract/contractTotalResult',
      contractListError: 'contract/contractListError',
      contractListErrorCode: 'contract/contractListErrorCode',
      }),
  },

  methods: {
     ...mapActions({
      getContractRepaymentSchedule: 'contract/getContractRepaymentSchedule',
    }),
    getSchedule() {
      this.getContractRepaymentSchedule({id: this.contractId})
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
.total {
  font-weight: bold
}
.btn-extend {
  background-color: #91CB3E !important;
  margin-right: 30px;
}

.btn-repay {
  background-color: #EA526F !important;
}
</style>
