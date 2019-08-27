<template>
  <v-layout justify-center class="customer-edit-content">
    <div class="button">
      <v-btn class="btn-edit" @click="getCustomerById">
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
                        v-model="customerDetailInput.customerId"
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
                        v-model="customerDetailInput.firstName"
                        outline
                        label="Họ"
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
                        v-model="customerDetailInput.lastName"
                        outline
                        label="Tên"
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
                        v-model="customerDetailInput.branchName"
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
                        v-model="customerDetailInput.createdName"
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
                          v-model="customerDetailInput.primaryPhone"
                          outline
                          label="Số Điện Thoại 1"
                          style="width:100%;"
                          :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="customerDetailInput.alternativePhone"
                          outline
                          label="Số Điện Thoại 2"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-text-field
                          v-model="customerDetailInput.address"
                          outline
                          label="Địa Chỉ Nhà"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-select
                          v-model="customerDetailInput.district"
                          :items="districtItems"
                          label="Quận"
                          outline>
                      </v-select>
                    </td>
                    <td>
                      <v-select
                          v-model="customerDetailInput.city"
                          :items="cityItems"
                          label="Thành phố"
                          outline>
                      </v-select>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="customerDetailInput.nationalId"
                          outline
                          label="CMND/HC"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="customerDetailInput.created"
                          outline
                          disable
                          label="Ngày tạo"
                          placeholder="dd/mm/yyyy"/>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="customerDetailInput.dateOfBirth"
                          outline
                          label="Ngày sinh"
                          placeholder="dd/mm/yyyy"/>
                    </td>
                    <td style="width:50%;">
                      <v-select
                          v-model="customerDetailInput.gender"
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
            <v-btn round class="btn-ok" @click="onClickUpdateCustomer">
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
import { isNullOrUndefined } from 'util';
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
      districtItems: ['Quận 1', 'Quận 2', 'Quận 3'],
      cityItems: ['Tp.HCM', 'Hà Nội'],
      sexItems: [ "Nam", "Nữ"]
    }
  },
  computed: {
    ...mapGetters({
      customerDetail: 'customer/customerDetail'
    }),
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
      updateCustomer: 'customer/updateCustomer'
    }),
    getCustomerById:async function() {
      await this.getCustomerByCustomerId({id: this.customerIdS})
      if (isNullOrUndefined(this.customerDetail)===false) {
        this.customerDetailInput = {
          lastName: this.customerDetail.lastName,
          firstName: this.customerDetail.firstName,
          customerId: this.customerDetail.customerId,
          createdName: this.customerDetail.createdName,
          branchName: this.customerDetail.branchName,
          created: this.customerDetail.created,
          gender: this.customerDetail.gender,
          primaryPhone: this.customerDetail.primaryPhone,
          alternativePhone: this.customerDetail.alternativePhone,
          dateOfBirth: this.customerDetail.dateOfBirth,
          nationalId: this.customerDetail.nationalId,
          address: this.customerDetail.address,
          district: this.customerDetail.district,
          city: this.customerDetail.city,
        }
        this.dialog = true;
      }
    },
    onClickUpdateCustomer:async function() {
      const customerUpdate = {
          last_name: this.customerDetail.lastName,
          first_name: this.customerDetail.firstName,
          gender: this.customerDetail.gender,
          primary_phone: this.customerDetail.primaryPhone,
          alternative_phone: this.customerDetail.alternativePhone,
          date_of_birth: this.customerDetail.dateOfBirth,
          national_id: this.customerDetail.nationalId,
          address: this.customerDetail.address,
          district: this.customerDetail.district,
          city: this.customerDetail.city,
        }
      const data = {
        id: this.customerIdS,
        customer: customerUpdate
      }
      await this.updateCustomer(data);
      this.dialog = false;
    }
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