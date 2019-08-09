<template>
  <div class ="contract-summary">
    <v-data-table
      :headers="headers"
      :items="summaryListResult"
      :loading="summaryListRequest"
      item-key="original"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-left content" :class="props.item.css"><span>{{ props.item.original }}</span></td>
          <td class="text-xs-center content">{{ props.item.loan_amount }}</td>
          <td class="text-xs-center content">{{ props.item.paid }}</td>
          <td class="text-xs-center content ">{{ props.item.waived }}</td>
          <td class="text-xs-center content" >{{ props.item.outstanding }}</td>
          <td class="text-xs-center content">{{ props.item.unpaid }}</td>
          <td class="text-xs-center content">{{ props.item.overdue }}</td>
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

export default {
  name: "contract-summary-tab",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "", value: "original", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Khoản vay", value: "loan_amount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Đã thanh toán", value: "paid", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Waived", value: "waived", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Nợ xấu", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Chưa thanh toán", value: "unpaid", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Quá hạn", value: "overdue", align: 'center', sortable: false, class: "header"
        }
      ],
      summaryListResult: [
                {
                    original: 'Principal',
                    css:'bold-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Interest',
                    css:'bold-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Fees',
                    css:'bold-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Storage',
                    css:'normal-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Validate',
                    css:'normal-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Notary',
                    css:'normal-text',
                    loan_amount: '123218200',
                    paid: '10,122,932',
                    waived: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Other',
                    css:'normal-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Penalties',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
                {
                    original: 'Total',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    unpaid: '3254222',
                    overdue: '12,346,932'
                },
      ],
      summaryListRequest: false,
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style>
.contract-summary {
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
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}

.bold-text span {
  font-weight: bold  !important;
  margin-left: 1vw !important;
}
.normal-text span {
  font-weight: normal !important;
  margin-left: 4vw !important;
}

</style>
