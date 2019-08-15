<template>
   <v-card class="accountant-table">
    <v-data-table
      :headers="headers"
      :items="accountantListResult"
      :loading="accountantListRequest"
      item-key="contractId"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.contractId }}</td>
          <td class="text-xs-center content">{{ props.item.storageLacation }}</td>
          <td class="text-xs-center content">{{ props.item.agent }}</td>
          <td class="text-xs-center content">{{ props.item.createDate }}</td>
          <td class="text-xs-center content">{{ props.item.closeDate }}</td>
          <td class="text-xs-center content">{{ props.item.stage }}</td>
          <td class="text-xs-center content">{{ props.item.assetType }}</td>
          <td class="text-xs-center content">{{ props.item.asset }}</td>
          <td class="text-xs-center content">{{ props.item.interestRate }}</td>
          <td class="text-xs-center content">{{ props.item.disbursalAmount }}</td>
          <td class="text-xs-center content">{{ props.item.interestPaid }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "accountant-table",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "Mã HĐ", value: "contractId", align: 'left', sortable: false, class: "header"
        },
        {
          text: "Kho", value: "storageLocation", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Agent", value: "Agent", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày mở HĐ", value: "createdDate", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Ngày hết hạn", value: "colsedDate", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Trạng thái", value: "stage", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loại tài sản", value: "assetType", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Mô tả tài sản", value: "asset", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Lãi xuất", value: "interestRate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giải ngân", value: "disbursalAmount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi", value: "interestPaid", align: 'center', sortable: false, class: "header"
        }
      ],
      accountantListRequest: false,
      accountantListResult: [
        {
            contractId:'contractId',
            storageLacation:'TML',
            agent:'agent',
            createDate:'2018/02/01',
            closeDate:'2018/03/01',
            stage:'stage',
            assetType:'assetType',
            asset:'asset',
            interestRate:'interestRate',
            disbursalAmount:'disbursalAmount',
            interestPaid:'interestPaid',
        },
        {
            contractId:'contractId',
            storageLacation:'TML',
            agent:'agent',
            createDate:'2018/02/01',
            closeDate:'2018/03/01',
            stage:'stage',
            assetType:'assetType',
            asset:'asset',
            interestRate:'interestRate',
            disbursalAmount:'disbursalAmount',
            interestPaid:'interestPaid',
        },
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
.accountant-table td.content {
  font-size: 1vw !important;
  padding: 0px !important;
}
.accountant-table .header {
  font-weight: bold !important;
  font-size: 1.2vw !important;
}

.accountant-table .wrap-text {
  word-wrap: break-word;
  white-space: pre-line !important;
}
</style>