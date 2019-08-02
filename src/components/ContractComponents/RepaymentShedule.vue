<template>
  <div class ="schudule-repayment">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
       <v-layout align-center justify-end row class="button-bottom">
        <v-btn round class="btn-extend" :to="{ name: 'new_contract' }">
          <i class="material-icons">hourglass_full</i>
          Extend
        </v-btn>
        <v-btn round class="btn-repay" :to="{ name: 'new_contract' }">
          <i class="material-icons">check_circle</i>
          Repay
        </v-btn>
    </v-layout>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="scheduleListResult"
      :loading="scheduleListRequest"
      item-key="day"
      :expand="true"
      :rows-per-page-items=[20]
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
  name: "repayment-shedule-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  data() {
    return {
      headers: [
        {
          text: "Day", value: "day", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Date", value: "date", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Paid date", value: "paid_date", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Principal due", value: "principal_due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "blance of loan", value: "blance_of_loan", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Interest", value: "interest", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Fees", value: "fees", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Fenalties", value: "fenalties", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Due", value: "due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Pain", value: "pain", align: 'center', sortable: false, class: "header"
        },
        {
          text: "In Advance", value: "in_advance", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Late", value: "late", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Outstanding", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
      ],
      scheduleListResult: [
                {
                    day: 1,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
                },
                 {
                    day: 2,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
                },
                                 {
                    day: 2,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
                },
                                 {
                    day: 2,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
                },
                                 {
                    day: 2,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
                },
                                 {
                    day: 2,
                    date: '01/01/2019',
                    paid_date: '01/01/2019',
                    principal_due: 'Active',
                    blance_of_loan: 'David',
                    asset: 'Iphone 7',
                    loanBalance: '5.000.000',
                    interest: '4.99',
                    fees: 123,
                    fenalties: 'DTH',
                    due: 'Iphone 7',
                    pain: '5.000.000',
                    in_advance: '4.99',
                    late: 123,
                    outstanding: 'DTH',
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
.schudule-repayment {
  margin-top: 35px;
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
  border-radius: 20px;
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
