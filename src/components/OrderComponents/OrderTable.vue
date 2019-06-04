<template>
    <div class="table-content">
        <v-data-table
          :headers="headers"
          :items="orderListResult"
          :loading="orderListRequest"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.orderID }}</td>
            <td class="text-xs-left">{{ props.item.createdDate }}</td>
            <td class="text-xs-left">{{ props.item.lastModify }}</td>
            <td class="text-xs-left">{{ props.item.staffName }}</td>
            <td class="text-xs-left" :style="{color: getColor(props.item.step)}">
              {{ props.item.step }}
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.asset }}</td>
            <td class="text-xs-center">
              <action-button :id="props.item.orderID" :step="props.item.step"/>
            </td>
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
          text: "ORDER ID", value: "orderID"
        },
        {
          text: "CREATED DATE", value: "createdDate"
        },
        {
          text: "LAST MODIFY", value: "lastModify"
        },
        {
          text: "AGENT", value: "agent"
        },
        {
          text: "STEP", value: "step"
        },
        {
          text: "NAME", value: "name"
        },
        {
          text: "PHONE", value: "phone"
        },
        {
          text: "ASSET", value: "asset"
        },
        {
          text: "ACTION", value: "action", align: 'center'
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
    }),
    getColor: function(status) {
      if (status !== null) {
        return this.caseStatus[status.toUpperCase()].color
      }
      return null
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