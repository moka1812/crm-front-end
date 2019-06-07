<template>
    <div class="table-content">
        <v-data-table
          :headers="headers"
          :items="orderListResult"
          :loading="orderListRequest"
          class="elevation-1"
        >

          <template v-slot:items="props">
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.orderID }}</td>
              <td class="text-xs-left" @click="clickOrder(props.item.orderID)">{{ props.item.createdDate }}</td>
              <td class="text-xs-left" @click="clickOrder(props.item.orderID)">{{ props.item.lastModify }}</td>
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.staffName }}</td>
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.supporter }}</td>
              
              <td class="text-xs-center" :style="{color: getColor(props.item.status)}" @click="clickOrder(props.item.orderID)">
                {{ props.item.status }}
              </td>
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.name }}</td>
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.phone }}</td>
              <td class="text-xs-center" @click="clickOrder(props.item.orderID)">{{ props.item.asset }}</td>
      
              <td class="text-xs-center">
                <action-button :id="props.item.orderID" :step="props.item.status"/>
              </td>
          </template>

          <template v-slot:no-data>
            <v-alert :value="true" type="info" >
              Chưa có Order
            </v-alert>
          </template>

        </v-data-table>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import caseStatus from './case_status'

import ActionButton from "@/components/OrderComponents/ActionButtonComponent/ActionButton.vue";

export default {
  name: "order-table",
  components: {
    ActionButton
  },
  data() {
    return {
      headers: [
        {
          text: "Mã order", value: "orderID", align: 'left', width: "10px"
        },
        {
          text: "Ngày tạo", value: "createdDate", align: 'left'
        },
        {
          text: "Ngày chỉnh sửa", value: "lastModify", align: 'left'
        },
        {
          text: "Người tiếp nhận", value: "agent", align: 'center'
        },
        {
          text: "Người hỗ trợ", value: "support_agent", align: 'center'
        },
        {
          text: "Trạng thái", value: "step", align: 'center'
        },
        {
          text: "Tên khách hàng", value: "name", align: 'center'
        },
        {
          text: "Phone", value: "phone", align: 'center'
        },
        {
          text: "Tài sản", value: "asset", align: 'center'
        },
        {
          text: "Thao tác", value: "action", align: 'center', width: "10%"
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
  mounted() {
    this.getOrderList()
  },
  methods: {
    ...mapActions({
        getOrderList: 'order/getOrderList',
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