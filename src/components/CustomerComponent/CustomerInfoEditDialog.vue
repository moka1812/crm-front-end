<template>
  <v-layout justify-center class="customer-edit-content">
    <div class="button">
      <v-btn class="btn-edit" @click.stop="dialog = true">
        <i class="material-icons">border_color</i>
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="700px"
      class="dialog-content"
      persistent
    >
      <v-card class="customer-edit-content-dialog">
        <v-layout>
            <v-flex xs6>
              <v-card-title class="headline">Cập Nhật Thông Tin Khách Hàng</v-card-title>
              <table style="width:100%;">
                <tbody>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="customerId"
                        outline
                        disabled
                        label="Mã khách hàng"
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="customerName"
                        outline
                        label="Tên khách hàng"
                        style="width:100%;"
                        rows="1"
                        auto-grow
                        :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="branch"
                        outline
                        label="Chi nhánh"
                        disabled
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="staff"
                        outline
                        disabled
                        label="Người tạo"
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
            <v-flex xs6>
              <v-card-title class="headline">Cập Nhật Thông Tin Liên Hệ</v-card-title>
              <table style="width:100%;">
                <tbody>
                  <tr>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="phoneNumber1"
                          outline
                          label="Số Điện Thoại 1"
                          style="width:100%;"
                          :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="phoneNumber2"
                          outline
                          label="Số Điện Thoại 2"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-text-field
                          v-model="address"
                          outline
                          label="Địa Chỉ Nhà"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="externalId"
                          outline
                          label="CMND/HC"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="submitedDate"
                          outline
                          label="Ngày tạo"
                          placeholder="dd/mm/yyyy"/>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="birthday"
                          outline
                          label="Ngày sinh"
                          placeholder="dd/mm/yyyy"/>
                    </td>
                    <td style="width:50%;">
                      <v-select
                          v-model="sex"
                          :items="sexItems"
                          label="Giới tính"
                          outline>
                      </v-select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-space-around row class="footer">
            <v-btn round class="btn-cancel" @click.stop="dialog = false">
              Cancel
            </v-btn>
            <v-btn round class="btn-ok" @click.stop="dialog = false">
              Ok
            </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
export default {
  name: "customer-info-edit-dialog",
  components: {
    DatePicker,
  },
  props: {
    customerIdS: String,
  },
  data () {
    return {
      customerDetailInput: {},
      dialog: false,
      customerName: "Trịnh thanh bình",
      customerId:"32785423",
      externalId: "3242141",
      branch: "TML",
      staff: "An Nhiên",
      submitedDate:'2018/03/16',
      address:"245 Lê Văn Việt - P.Tăng Nhơn Phú A - Q.9 - Tp.HCM",
      phoneNumber1:'+84013218328',
      phoneNumber2:'+84013218328',
      birthday:'14/08/1996',
      sex:"Nam",
      sexItems: [
        "Nam",
        "Nữ"
      ]
    }
  },
  created() {
    this.getCustomerById();
  },
  computed: {
    ...mapGetters({
      customerDetail: 'customer/customerDetail'
    }),
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId'
    }),
    getCustomerById:async function(){
      await this.getCustomerByCustomerId({id: this.customerIdS})
    },
  },
}
</script>
<style>
.customer-edit-content .button button {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
}

.customer-edit-content .button .btn-edit {
  color: #000000 !important;
  height: auto !important;
}

.customer-edit-content .button .btn-edit i {
  font-size: 16px;
}

.customer-edit-content-dialog {
  padding: 10px;
}

.customer-edit-content-dialog .headline {
  font-size: 20px !important;
  padding: 0px 0px 15px 0px !important;
}

.customer-edit-content-dialog .footer {
  padding: 5px;
  text-align: center;
  height: auto !important;
}

.customer-edit-content-dialog .footer .btn-cancel{
  background-color: #F0F0F0!important;
  color: #DD1E26;
}

.customer-edit-content-dialog .footer .btn-ok{
  background-color: #DD1E26 !important;
  color: #F0F0F0;
}

.customer-edit-content .class-border {
  border: 1px solid #BFBFBF;
  margin: 20px;
}
</style>