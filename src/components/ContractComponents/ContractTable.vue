<template>
    <div>
    <v-toolbar id="refresh" flat color="#F0F0F7">
      <v-spacer></v-spacer>
      <v-btn color="primary"  @click="getContractList">
        Refresh
      </v-btn>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="contractListResult"
      :loading="contractListRequest"
      item-key="contractID"
      :rows-per-page-items=[3]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @dblclick = "detail(props.item.id)">
          <td class="text-xs-center content">{{ props.item.contractID }}</td>
          <td class="text-xs-center content">{{ props.item.createdDate }}</td>
          <td class="text-xs-center content ">{{ props.item.closedDate }}</td>
          <td class="text-xs-center content">{{ props.item.status }}</td>
          <td class="text-xs-center content">{{ props.item.clientName }}</td>
          <td class="text-xs-center content">{{ props.item.assetDescription }}</td>
          <td class="text-xs-center content">{{ props.item.approvedAmount }}</td>
          <td class="text-xs-center content">{{ props.item.interest }}</td>
          <td class="text-xs-center content">{{ props.item.branchName }}</td>
          <td class="text-xs-center" @dblclick.stop>
            <action-button/>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

    </v-data-table>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "table-lib",
    components: { 
      ActionButton
    },
    data() {
        return {
            headers: [
                {
                    text: "Mã HĐ", value: "contractID", align: 'left', sortable: false, class: "header", width: 3
                },
                {
                    text: "Ngày tạo", value: "createdDate", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Ngày đóng", value: "closedDate", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Trạng thái", value: "loanStatus", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Khách hàng", value: "client", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Tài sản", value: "asset", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Khoản vay", value: "loanBalance", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Lãi suất", value: "interest", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Địa chỉ", value: "storageLocation", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Thao tác", value: "action", align: 'center', sortable: false, class: "header"
                },
            ],
        } 
    },
    computed: {
      ...mapGetters({
      contractListResult: 'contract/contractListResult',
      contractListRequest: 'contract/contractListRequest',
      contractListErrorCode: 'contract/contractListErrorCode',
      contractListError: 'contract/contractListError',
      }),
    },
    methods : {
      ...mapActions({
        getContractList: 'contract/getContractList',
      }),
      detail: function (contractID) {
        if (contractID != null) {
          this.$router.push({path: '/contracts/contract-detail', query: {id: contractID}});
        }
      }
    },
    created() {
      this.getContractList();
    },
}
</script>

<style>
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}
td.content {
  font-size: 17px !important;
  padding: 0px !important;
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 16px !important;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>
