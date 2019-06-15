<template>
  <div>
    <v-toolbar id="refresh" flat color="#fafafa">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="reload()">
        Refresh
      </v-btn>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="orderListResult"
      :loading="orderListRequest"
      :rows-per-page-items=[20]
      class="elevation-1"
    >

        <template v-slot:items="props">
          <template v-if="props.item.step != 'Unclaimed'">
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.orderID }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.lastModify }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.agent }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.support_agent_name }}</td>
            
            <td class="text-xs-center content" :style="{color: getColor(props.item.step)}" @click="clickOrder(props.item.orderID)">
              {{ props.item.step }}
            </td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.name }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.phone }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ props.item.asset }}</td>
            <td class="text-xs-center content" @click="clickOrder(props.item.orderID)">{{ translateEngToVi(props.item.stage) }}</td>
          </template>

          <template v-else>
            <td class="text-xs-center content">{{ props.item.orderID }}</td>
            <td class="text-xs-center content">{{ props.item.lastModify }}</td>
            <td class="text-xs-center content">{{ props.item.agent }}</td>
            <td class="text-xs-center content">{{ props.item.support_agent_name }}</td>
            
            <td class="text-xs-center content" :style="{color: getColor(props.item.step)}">
              {{ props.item.step }}
            </td>
            <td class="text-xs-center content">{{ props.item.name }}</td>
            <td class="text-xs-center content">{{ props.item.phone }}</td>
            <td class="text-xs-center content">{{ props.item.asset }}</td>
            <td class="text-xs-center content">{{ translateEngToVi(props.item.stage) }}</td>
          </template>
            <td class="text-xs-center">
              <v-container fluid>
                <v-layout>
                  <v-flex sm6>
                    <action-button 
                      :orderID="props.item.orderID" 
                      :step="props.item.step" 
                      :phone="props.item.phone" 
                      :assetID="props.item.assetID"
                      :staff="props.item.staff"
                      :stage="translateEngToVi(props.item.stage)"
                      @refresh="refresh()"
                    />
                  </v-flex>
                  <v-flex sm6>
                      <call-button/>
                  </v-flex>
                </v-layout>
              </v-container>
            </td>
        </template>

        <template v-slot:no-data>
          <!-- Nothing -->
        </template>

    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import caseStatus from './utils/case_status'
import {translateEngToVi} from './utils/stages'

import ActionButton from "@/components/OrderComponents/ActionButton.vue";
import CallButton from "@/components/OrderComponents/CallButton.vue"

export default {
  name: "table-lib",
  components: {
    ActionButton,
    CallButton
  },
  data() {
    return {
      headers: [
        {
          text: "Mã order", value: "orderID", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Cập nhật", value: "lastModify", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Người tiếp nhận", value: "agent", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Người hỗ trợ", value: "support_agent", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giai đoạn", value: "step", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tên khách hàng", value: "name", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Phone", value: "phone", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tài sản", value: "asset", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Trạng thái", value: "stage", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Thao tác", value: "action", align: 'center', sortable: false, class: "header"
        },
      ],
      caseStatus: caseStatus
    }
  },
  computed: {
     ...mapGetters({
       orderListRequest: 'order/orderListRequest',
       orderListResult: 'order/orderListResult',
       orderListErrorCode: 'order/orderListErrorCode',
       orderListError: 'order/orderListError'
     })
  },
  methods: {
    ...mapActions({
        getOrderDetail: 'order/getOrderDetail',
    }),
    getColor: function(status) {
      try {
        return this.caseStatus[status.toUpperCase()].color
      } catch (error) {}
      return null
    },
    clickOrder: function(orderID) {
      if (orderID != null) {
        this.getOrderDetail({orderID})
      }
    },
    translateEngToVi: function(englishStage){
      return translateEngToVi(englishStage)
    },
    refresh: function() {
      this.$emit('refresh')
    },
    reload: function() {
      this.$emit('reload')
    }
  }
}
</script>

<style scoped>
.table {
  background-color: #fff;
}

.back-check {
  background-color: #e1f3e5;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-check i {
  font-size: 15px;
  padding: 0px 0px 0 5px;
  color: #157f1f;
}

.back-cancel {
  background-color: #F9D9DA;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-cancel i {
  font-size: 15px;
  padding: 0px 7px 0 7px;
  color: #DD1E26;
}

.back-phone {
  background-color: #C0E4FB;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-phone i {
  font-size: 15px;
  padding: 0 3px 0 5px;
  color: #0197F6;
}
</style>

<style>
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}
td.content {
  font-size: 17px !important;
}
.header {
  font-weight: bold !important;
  font-size: 16px !important;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>