<template>
  <div>
    <v-toolbar id="refresh" flat color="#F0F0F7">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="getOrderListFromStaff">
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
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @dblclick="e => props.item.step != 'Unclaimed' && clickOrder(props.item.orderID)">
          <td class="text-xs-center content">{{ props.item.orderID }}</td>
          <td class="text-xs-center content">{{ props.item.lastModify }}</td>
          <td class="text-xs-center content ">{{ props.item.agent }}</td>
          <td class="text-xs-center content">{{ props.item.supportAgentName }}</td>
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
            <v-container class="action">
              <v-layout>
                <v-flex sm4 :style="{'margin-right': '5px'}">
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
                    <div @click="props.expanded = !props.expanded" class="expand">
                      <v-icon v-if="props.expanded">keyboard_arrow_up</v-icon>
                      <v-icon v-else>keyboard_arrow_down</v-icon>
                    </div>
                </v-flex>
              </v-layout>
            </v-container>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

      <template v-slot:actions-prepend>
        <v-select
          class="page-select"
          v-model="pagination.page"
          :items="pageSelection"
          label="Page"
        ></v-select>
      </template>

      <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template>

    </v-data-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import steps from '../utils/steps'
import {translateStageFromEngToVi} from '../utils/stages'
import {translateStepFromEngToVi} from '../utils/steps'

import ActionButton from "@/components/OrderComponents/ActionButton.vue";
import CallButton from "@/components/OrderComponents/CallButton.vue"
import CallTable from "@/components/OrderComponents/CallTable.vue"

export default {
  name: "my-inbox-table",
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
      schedule: '',
      pagination: {},
    }
  },
  mounted() {
    this.getOrderListFromStaff()
    this.schedule = setInterval(this.planOrderListFromStaff, 5000);
  },
  computed: {
    ...mapGetters({
      orderListRequest: 'order/orderListRequest',
      orderListResult: 'order/orderListResult',
      orderListErrorCode: 'order/orderListErrorCode',
      orderListError: 'order/orderListError',
      orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
      orderFindingErrorCode: 'order/orderFindingErrorCode',
    }),
    pageSelection() {
      if (this.orderListResult.length === null) return null
      return ([...Array(Math.ceil(this.orderListResult.length/20)).keys()].map(x => ++x))
    },
  },
  methods: {
    ...mapActions({
      getOrderListFromStaff: 'order/getOrderListFromStaff',
      planOrderListFromStaff: 'order/planOrderListFromStaff',
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
  },
  watch: {
    orderFindingErrorCode() {
      if (this.orderFindingErrorCode == 200) {
        clearInterval(this.schedule);
      } else if (this.orderFindingErrorCode == 1) {
        this.getOrderListFromStaff()
        this.schedule = setInterval(this.planOrderListFromStaff, 5000);
      }
    },
    orderUpdatingErrorCode() {
      //Update Order or Change Stage Successfully
      if (this.orderUpdatingErrorCode == 200) {
        this.planOrderListFromStaff()
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.schedule);
  }
}
</script>
<style scoped>
.action {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.expand {
  margin: 5px 0px;
  cursor: pointer;
}
.page-select {
  width: 70px;
}
</style>
