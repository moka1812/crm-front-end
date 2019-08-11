<template>
   <v-card>
    <v-data-table
      :headers="headers"
      :items="reminderListResult"
      :loading="reminderListRequest"
      item-key="contractId"
      :single-expand="true"
      :expand="true"
      show-expand
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-center content">{{ props.item.contractId }}</td>
          <td class="text-xs-center content">{{ props.item.fullName }}</td>
          <td class="text-xs-center content ">{{ props.item.dueDate }}</td>
          <td class="text-xs-center content">{{ props.item.daysLate }}</td>
          <td class="text-xs-center content">{{ props.item.storageLacation }}</td>
          <td class="text-xs-center content">{{ props.item.principal }}</td>
          <td class="text-xs-center content">{{ props.item.interestAmount }}</td>
          <td class="text-xs-center content">{{ props.item.penalty }}</td>
          <td class="text-xs-center content">{{ props.item.fee }}</td>
          <td class="text-xs-center content">{{ props.item.totalRepayment }}</td>
          <td class="text-xs-center" @dblclick.stop>
            <v-layout align-center justify-center row class="button">
              <v-btn fab dark small class="mx-2 btn-cart">
              <i class="material-icons">shopping_cart</i>
              </v-btn>
              <v-btn fab dark small class="mx-2 btn-file" @click = "detail(props.item.contractId)">
                <i class="material-icons">insert_drive_file</i>
              </v-btn>
              <reminder-call-dialog/>
            </v-layout>
          </td>
        </tr>
      </template>

      <template v-slot:expand="props">
        <v-container class="expand">
          <contract-notes/>
        </v-container>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ContractNotes from '../ContractComponents/ContractNotes.vue';
import ReminderCallDialogVue from './ReminderCallDialog.vue';

export default {
  name: "reminder-table",
  components: {
    'contract-notes': ContractNotes,
    'reminder-call-dialog': ReminderCallDialogVue,
  },
  data() {
    return {
      headers: [
        {
          text: "Mã HĐ", value: "contractId", align: 'left', sortable: false, class: "header"
        },
        {
          text: "Họ Tên", value: "fullName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày Hết Hạn", value: "dueDate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Số Ngày Trễ", value: "dayslate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Kho", value: "storageLocation", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Gốc", value: "principal", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi", value: "interestAmount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi Thêm", value: "penalty", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Phí", value: "fee", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tổng Nợ", value: "totalRepayment", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Thao Tác", value: "action", align: 'center', sortable: false, class: "header"
        },
      ],
      reminderListRequest: false,
      reminderListResult: [
        {
            contractId: "1",
            fullName: "Nguyễn Văn A",
            dueDate: "2018/02/23",
            daysLate: "2018/02/23",
            storageLacation: "DTM",
            principal: 21039012,
            interestAmount: 109090,
            penalty: 328438,
            fee: 323,
            totalRepayment: 231321432
        },
        {
            contractId: "2",
            fullName: "Nguyễn Văn B",
            dueDate: "2018/02/23",
            daysLate: "2018/02/23",
            storageLacation: "DTM",
            principal: 21039012,
            interestAmount: 109090,
            penalty: 328438,
            fee: 323,
            totalRepayment: 231321432
        }
      ],
    }
  },
  methods: {
    detail: function (contractID) {
        if (contractID != null){
          this.$router.push({path: '/contracts/contract-detail', query: {id: contractID}});
        }
      }
  },
}
</script>

<style scoped>
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
  font-weight: bold !important;
  font-size: 1.2vw !important;
}

.button button {
  margin-right: 5px;
  font-size: 0.7vw !important;
}

.button .btn-cart {
  background-color: #FAD2DA!important;
  color: #EB526F!important;
}

.button .btn-file {
  background-color: #D4EBB4!important;
  color: #91CB3E!important;
}

.expand {
  margin-top: -15px !important;
  padding: 0px !important;
}
</style>