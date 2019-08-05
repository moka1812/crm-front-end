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
          <td class="text-xs-center content">{{ props.item.paid }}</td>
          <td class="text-xs-center content ">{{ props.item.waived }}</td>
          <td class="text-xs-center content">{{ props.item.written_off }}</td>
          <td class="text-xs-center content" >{{ props.item.outstanding }}</td>
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
          text: "Original", value: "original", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Paid", value: "paid", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Waived", value: "waived", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Written Off", value: "written_off", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Outstanding", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Overdue", value: "overdue", align: 'center', sortable: false, class: "header"
        }
      ],
      summaryListResult: [
                {
                    original: 'Principal',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Interest',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Fees',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Storage',
                    css:'normal-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Validate',
                    css:'normal-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Notary',
                    css:'normal-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Other',
                    css:'normal-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Penalties',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
                    overdue: '12,346,932'
                },
                {
                    original: 'Total',
                    css:'bold-text',
                    paid: '10,122,932',
                    waived: '0',
                    written_off: '0',
                    outstanding: '11,341,932',
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
