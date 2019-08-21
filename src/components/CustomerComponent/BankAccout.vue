<template>
  <div class ="contract-transaction">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
      <v-layout align-center justify-end row>
        <v-btn round class="btn-upload" @click="upload">
          <i class="material-icons">add_box</i>
          Thêm
        </v-btn>
      </v-layout>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="bankAccoutListResult"
      :loading="bankAccoutListRequest"
      item-key="day"
      :expand="true"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr :key="props.index"> 
          <td class="text-xs-center content">{{ props.item.name }}</td>
          <td class="text-xs-center content">{{ props.item.bank }}</td>
          <td class="text-xs-center content ">{{ props.item.bank_accout }}</td>
          <td class="text-xs-center content">{{ props.item.branch }}</td>
          <td class="text-xs-center content">
            <v-btn class="btn-view" @click="viewDocument(props.item.link)">
              <i class="material-icons">edit</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">
            <v-btn class="btn-view" @click="viewDocument(props.item.link)">
              <i class="material-icons">delete</i>
            </v-btn>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
    <v-dialog v-model="dialog" :max-width="maxWidth" persistent>
      <v-card>
        <v-card-title class="headline">NHẬP THÔNG TIN TK NGÂN HÀNG</v-card-title>
        <v-card-text>
          <v-layout>
              <v-flex sm4>
                  <v-subheader class="input-header">Name*</v-subheader>
              </v-flex>
              <v-flex sm8>
                  <v-text-fieldv-model.lazy="nameInput" placeholder="Exp : Pham Le David" outlined></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import ActionButton from "@/components/OrderComponents/ActionButton.vue";
import CallButton from "@/components/OrderComponents/CallButton.vue"
import CallTable from "@/components/OrderComponents/CallTable.vue"
import { mapActions, mapGetters } from "vuex";

export default {
  name: "transaction-tab",
  components: {
    ActionButton,
    CallButton,
    CallTable
  },
  data() {
    return {
      headers: [
        {
          text: "Họ tên", value: "name", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngân hàng", value: "bank", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Số tài khoản", value: "bank_accout", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Chi nhánh/PGD", value: "branch", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Điều chỉnh", value: "adjusted", align: 'center', sortable: false, class: "header", colspan :"4"
        },
        {
          text: "Xóa", value: "delete", align: 'center', sortable: false, class: "header"
        },
      ],
      dialog: false,
      maxWidth: 800,
      // bankAccoutListResult: [
      //           {
      //               name: 'Ngô Lan Hương',
      //               bank: 'Sacombank',
      //               bank_accout: '0366265312355',
      //               branch: 9000000,
      //           },
      //           {
      //               name: 'Ngô Lan Hương',
      //               bank: 'Sacombank',
      //               bank_accout: '0366265312355',
      //               branch: 9000000,
      //           },
      // ],
      // bankAccoutListRequest: false,
    }
  },
  created() {
    this.bankAccout();
  },
  computed: {
    ...mapGetters({
      bankAccoutListResult: "customer/bankAccoutListResult",
      bankAccoutListRequest: "customer/bankAccoutListRequest"
    })
  },
  methods: {
      ...mapActions({
      getBankAccout: "customer/getBankAccout",
    }),
    bankAccout() {
      this.getBankAccout({id : '1'})
    },
    upload: function(){
      this.dialog = true
    }
  },
}
</script>

<style>
.contract-transaction {
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
  padding: 0px !important;
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>
