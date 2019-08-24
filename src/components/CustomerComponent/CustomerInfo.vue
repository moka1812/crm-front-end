<template>
  <v-card fluid class="content-customer-info">
    <v-layout align-center justify-center column class="customer-info">
          <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
          <div class="box-customer-name">
            <h2 class="customer-name">{{customertDetail.customerName}}</h2>
            <customer-info-edit-dialog v-bind:customerIdS="customerId"/>
          </div>
          <span>Mã KH #: {{customertDetail.customerId}}</span>
          <span>Chi Nhánh: {{customertDetail.branch}}</span>
          <span>Người Tạo: {{customertDetail.staff}}</span>
    </v-layout>
    <v-layout align-center justify-center row class="customer-info-bottom">
      <v-flex xs5 class="rating-customer">
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
      </v-flex>
      <v-flex xs1>
        |
      </v-flex>
      <v-flex xs5>
        <span>2 Order - 10 Khoản vay</span>
      </v-flex>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="contract-info">
      <div class="titile-info">
        <Strong>Thông Tin Liên Hệ</Strong>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span class="label">Số Điện Thoại 1:</span><br>
              <span>+84013218328</span>
            </td>
            <td>
              <span class="label">Số Điện Thoại 2:</span><br>
              <span>+84013218328</span>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td colspan="2">
              <span class="label">Địa Chỉ Nhà:</span><br>
              <span>245 Lê Văn Việt - P.Tăng Nhơn Phú A - Q.9 - Tp.HCM</span>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td>
              <span class="label">CMND/HC:</span><br>
              <span>241234353</span>
            </td>
            <td>
              <span class="label">Ngày Cấp:</span><br>
              <span>2018/03/16</span>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td>
              <span class="label">Năm Sinh:</span><br>
              <span>1996/03/16</span>
            </td>
            <td>
              <span class="label">Giới Tính:</span><br>
              <span>Nam</span>
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="performance-history">
      <div class="titile-info">
        <Strong>Lịch Sử Giao Dịch</Strong>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span>Client loan cycle:</span>
              <span>11</span>
            </td>
            <td>
              <span class="label">Last contact:</span>
              <span>2018/03/11</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Total active loan:</span>
              <span>11</span>
            </td>
            <td>
              <span class="label">Last disbursal date:</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Total loan:</span>
              <span>12</span>
            </td>
            <td>
              <span>2018/03/11</span>
            </td>
          </tr>
        </tbody>
      </table>
      <v-layout align-center justify-center row class="performance-history-bottom">
        <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
        <span>Cập nhật gần nhât: </span><strong>Davit phạm</strong>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import CustomerInfoEditDialog from './CustomerInfoEditDialog.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "customer-info",
  components: { CustomerInfoEditDialog},
  props: {
    customerId: String,
  },
  data: () => ({
    customertDetail: {
      customerId:'32785423',
      customerName: "Trịnh thanh bình",
      externalId: "3242141",
      branch: "TML",
      staff: "An Nhiên"
    }
  }),
  created() {
  },
  computed: {
    
  },
  methods: {
  },
  watch: {
  },
  
};
</script>

<style scoped>
.content-customer-info {
  padding: 10px;
  height: 100% !important;
}

.content-customer-info .titile-info {
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  font-size: 15px;
}

.content-customer-info .avatar-img {
  border-radius: 50%;
  width: 8vw;
  height: 8vw;
  min-width: 60px;
  min-height: 60px;
}

.content-customer-info .customer-name {
  margin-right: 10px;
  text-transform: uppercase;
  font-size: 16px;
}

.content-customer-info .box-customer-name {
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}

.content-customer-info .customer-info-bottom {
  font-size: 0.9vw;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 5px;
}

.content-customer-info .customer-info-bottom i {
  font-size: 1.5vw;
  color: #DD1E26;
}

.content-customer-info .class-border {
  border: 1px solid #BFBFBF;
  margin: 20px;
}

.content-customer-info .contract-info table,
.content-customer-info .performance-history table{
  width: 100%;
}

.content-customer-info .performance-history-bottom {
  font-size: 0.9vw;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 10px 0px;
  width: 100%;
}

.content-customer-info .performance-history-bottom .avatar-img {
  border-radius: 50%;
  width: 2vw;
  height: 2vw;
  min-width: 40px;
  min-height: 40px;
  margin-right: 5px;
}
.content-customer-info .label {
  color: #A5A5A7;
}
</style>
