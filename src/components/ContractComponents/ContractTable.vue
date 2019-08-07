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
      :pagination.sync="pagination"
      item-key="contractID"
      :rows-per-page-items=[2]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @dblclick = "detail(props.item.contractID)">
          <td class="text-xs-center content">{{ props.item.contractID }}</td>
          <td class="text-xs-center content">{{ props.item.createdDate }}</td>
          <td class="text-xs-center content ">{{ props.item.closedDate }}</td>
          <td class="text-xs-center content">{{ props.item.loanStatus }}</td>
          <td class="text-xs-center content">{{ props.item.client }}</td>
          <td class="text-xs-center content">{{ props.item.asset }}</td>
          <td class="text-xs-center content">{{ props.item.loanBalance }}</td>
          <td class="text-xs-center content">{{ props.item.interest }}</td>
          <td class="text-xs-center content">{{ props.item.storageID }}</td>
          <td class="text-xs-center content">{{ props.item.storageLocation }}</td>
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
import {mapActions, mapGetters} from 'vuex'
import ActionButton from "@/components/ContractComponents/ActionButton.vue"

export default {
    name: "table-lib",
    components: {
        ActionButton,
    },
    data() {
        return {
            headers: [
                {
                    text: "Mã Contract", value: "contractID", align: 'left', sortable: false, class: "header", width: 3
                },
                {
                    text: "Ngày tạo", value: "createdDate", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Ngày đóng", value: "closedDate", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Trạng thái vay", value: "loanStatus", align: 'center', sortable: false, class: "header"
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
                    text: "Mã kho", value: "storageID", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Địa chỉ", value: "storageLocation", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Thao tác", value: "action", align: 'center', sortable: false, class: "header"
                },
            ],
            // contractListResult: [
            //     {
            //         contractID: 1,
            //         createdDate: '01/01/2019',
            //         closedDate: '01/01/2019',
            //         loanStatus: 'Active',
            //         client: 'David',
            //         asset: 'Iphone 7',
            //         loanBalance: '5.000.000',
            //         interest: '4.99',
            //         storageID: 123,
            //         storageLocation: 'DTH',
            //     },
            //     {
            //         contractID: 1,
            //         createdDate: '01/01/2019',
            //         closedDate: '01/01/2019',
            //         loanStatus: 'Active',
            //         client: 'David',
            //         asset: 'Iphone 7',
            //         loanBalance: '5.000.000',
            //         interest: '4.99',
            //         storageID: 123,
            //         storageLocation: 'DTH',
            //     },
            //     {
            //         contractID: 1,
            //         createdDate: '01/01/2019',
            //         closedDate: '01/01/2019',
            //         loanStatus: 'Active',
            //         client: 'David',
            //         asset: 'Iphone 7',
            //         loanBalance: '5.000.000',
            //         interest: '4.99',
            //         storageID: 123,
            //         storageLocation: 'DTH',
            //     }
            // ],
            // contractListRequest: false,
            pagination: {},
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
        // getContractDetail: 'contract/getContractDetail'
      }),
      detail: function (contractID) {
        if (contractID != null){
          //  this.$router.push('/contracts/contract-detail');
          this.$router.push({path: '/contracts/contract-detail', query: {id: contractID}});
          // this.$router.push({params: {contractID: contractID}});
          // this.getContractDetail({contractID});
        }
      }
    },
    watch: {
      pagination: {
      handler () {
        const page = this.pagination.page
        this.getContractList({page})
      },
      deep: true
    }
    }
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
