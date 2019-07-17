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
      item-key="orderID"
      :expand="true"
      :rows-per-page-items=[20]
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr @dblclick="e => props.item.step != 'Unclaimed' && clickOrder(props.item.orderID)">
          <td class="text-xs-center content">{{ props.item.orderID }}</td>
          <td class="text-xs-center content">{{ props.item.lastModify }}</td>
          <td class="text-xs-center content ">{{ props.item.agent }}</td>
          <td class="text-xs-center content">{{ props.item.support_agent_name }}</td>
          <td class="text-xs-center content" :style="{color: getColor(props.item.step)}">
            {{ translateStepFromEngToVi(props.item.step) }}
          </td>
          <td class="text-xs-center content">{{ props.item.name }}</td>
          <td class="text-xs-center content">{{ props.item.phone }}</td>
          <td class="text-xs-center content">{{ props.item.asset }}</td>
          <td class="text-xs-center content">
            {{ translateStageFromEngToVi(props.item.stage) }}
          </td>
          <td class="text-xs-center" @dblclick.stop>
            <v-container fluid pa-3>
              <v-layout>
                <v-flex sm4>
                  <action-button 
                    :orderID="props.item.orderID" 
                    :step="props.item.step" 
                    :phone="props.item.phone" 
                    :assetID="props.item.assetID"
                    :staff="props.item.staff"
                    :stage="translateStageFromEngToVi(props.item.stage)"
                  />
                </v-flex>
                <v-flex sm4>
                    <call-button :phone="props.item.phone" :name="props.item.name" :orderID="props.item.orderID"/>
                </v-flex>
                <v-flex sm4>
                    <v-btn class="ma-0" icon @click="props.expanded = !props.expanded">
                      <v-icon v-if="props.expanded">keyboard_arrow_up</v-icon>
                      <v-icon v-else>keyboard_arrow_down</v-icon>
                    </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

      <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template>

    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import steps from './utils/steps'
import {translateStageFromEngToVi} from './utils/stages'
import {translateStepFromEngToVi} from './utils/steps'

import ActionButton from "@/components/OrderComponents/ActionButton.vue";
import CallButton from "@/components/OrderComponents/CallButton.vue"
import CallTable from "@/components/OrderComponents/CallTable.vue"

export default {
  name: "table-lib",
  components: {
    ActionButton,
    CallButton,
    CallTable
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
      steps: steps,
    }
  },
  computed: {
     ...mapGetters({
       orderListRequest: 'order/orderListRequest',
       orderListResult: 'order/orderListResult',
       orderListErrorCode: 'order/orderListErrorCode',
       orderListError: 'order/orderListError',
       orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
     })
  },
  methods: {
    ...mapActions({
        getOrderDetail: 'order/getOrderDetail',
    }),
    getColor: function(step) {
      try {
        return this.steps[step.toUpperCase()].color
      } catch (error) {}
      return null
    },
    clickOrder: function(orderID) {
      if (orderID != null) {
        this.getOrderDetail({orderID})
      }
    },
    translateStageFromEngToVi: function(englishStage) {
      return translateStageFromEngToVi(englishStage)
    },
    translateStepFromEngToVi: function(englishStep) {
      return translateStepFromEngToVi(englishStep)
    },
    refresh: function() {
      this.$emit('refresh')
    },
    reload: function() {
      this.$emit('reload')
    }
  },
  watch: {
    orderUpdatingErrorCode() {
      //Update Order or Change Stage Successfully
      if (this.orderUpdatingErrorCode == 200) {
        this.refresh()
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
  font-weight: bold !important;
  font-size: 16px !important;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>