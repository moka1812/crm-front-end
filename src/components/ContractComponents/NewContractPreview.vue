<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <v-card color="#ffffff" class="box-preview-left">
        <v-layout align-center justify-center column>
          <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
          <div class="class-border"></div>
          <h5>Độc lập - Tự do - Hạnh phúc</h5>
        </v-layout>
        <v-layout align-start justify-start row class="body-container">
          <v-flex xs3>
            <img src="../../assets/camdo-logo.png" alt="logo" class="logo-img">
          </v-flex>
          <v-flex xs9>
            <div class="titel-repayment-name"><h1>HỢP ĐỒNG CẦM CỐ</h1></div>
            <strong>Mã hợp đồng(HĐ):XXXXX</strong><br>
            <strong>Mã khách hàng(KH):XXXXX</strong><br>
          </v-flex>
        </v-layout>
        <br/>
        <p>Ngày {{transactionDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
        
        <v-layout>
            <v-flex xs6>
              <strong>Bên khách hàng:</strong>

              <v-layout>
                  <v-flex xs6>
                      Họ và tên:
                  </v-flex>
                  <v-flex xs6>
                      {{customerName}}
                  </v-flex>
              </v-layout>

              <v-layout>
                  <v-flex xs6>
                      ĐTDĐ:
                  </v-flex>
                  <v-flex xs6>
                      {{phoneNumber}}
                  </v-flex>
              </v-layout>

              <v-layout>
                  <v-flex xs6>
                      Sinh ngày:
                  </v-flex>
                  <v-flex xs6>
                      {{birthDay}}
                  </v-flex>
              </v-layout>

              <v-layout>
                  <v-flex xs6>
                      CMND:
                  </v-flex>
                  <v-flex xs6>
                      {{nationalID}}
                  </v-flex>
              </v-layout>

              <v-layout>
                  <v-flex xs6>
                      Địa chỉ:
                  </v-flex>
                  <v-flex xs6>
                      {{address}}
                  </v-flex>
              </v-layout>

            </v-flex>

            <v-flex sm6>
                <strong>Bên nhận cầm cố tài sản:</strong>
                <br/>
                Công ty TNHH Đầu Tư và Phát Triển Kinh Doanh ICADO
                <br/>
                GPKD số: 0313412428
                <br/>
                Địa chỉ: {{currentBranchAddress}}
            </v-flex>
        </v-layout>

        <br/>

        <strong>Hai bên đồng ý thực hiện việc cầm cố tài sản với những thoả thuận sau:</strong>
        <br/>
        <strong>I. THOẢ THUẬN VỀ ĐỊNH GIÁ TÀI SẢN</strong>
        <br/>
        <strong>1. Thông tin tài sản cầm cố (TSCC):</strong>
        <br/>
        <br/>
        <ul>
          <v-layout>
              <v-flex sm4>
                  <li>Tài sản cầm cố:</li>
              </v-flex>
              <v-flex sm4>
                  {{asset}}
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Miêu tả tài sản:</li>
              </v-flex>
              <v-flex sm4>
                  {{description}}
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Linh kiện/phụ kiện:</li>
              </v-flex>
              <v-flex sm4>
                  {{accessory}}
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Số lượng:</li>
              </v-flex>
              <v-flex sm4>
                  01
              </v-flex>
          </v-layout>
        </ul>
        <strong>2. Điều kiện cầm:</strong>
        <br/>
        <br/>
        <ul>
          <v-layout>
              <v-flex sm4>
                  <li>Giá cầm:</li>
              </v-flex>
              <v-flex sm4>
                  {{approvedAmount}}
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Ngày hết hạn:</li>
              </v-flex>
              <v-flex sm4>
                  {{date}}
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Lãi suất trong hạn:</li>
              </v-flex>
              <v-flex sm4>
                  1.5 %
              </v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm4>
                  <li>Phí dịch vụ:</li>
              </v-flex>
              <v-flex sm4>
                  {{fee}} %
              </v-flex>
          </v-layout>
        </ul>
        <span>
          ICADO sẽ giải ngân bằng tiền mặt cho KH là {{receivedAmountInput}} đã khấu trừ tiền lãi đầu kỳ là {{interestMoneyHint}}. 
          <strong>Tôi xác nhận rằng:</strong> Tôi đã đọc, hiểu và cam kết tuân thủ theo quy định về quy trình gia hạn hợp đồng mới, quy trình
          nhắc lãi, quy trình thẩm định thanh lý tài sản. Trong trường hợp tôi vi phạm những quy định trên, Tôi xin chịu hoàn
          toàn trách nhiệm về sai phạm của mình.
        </span>
        <br/>
        <v-layout>
            <v-flex sm6>
              <center>
                Đại diện ICADO
                <br/>
                (Ký, ghi rõ họ tên và đóng dấu)
              </center>
            </v-flex>
            <v-flex sm6>
              <center>
                Khách hàng
                <br/>
                (Ký, ghi rõ họ tên)
              </center>
            </v-flex>
        </v-layout>
        <br/><br/><br/>
        <div class="note">
          Giờ làm việc: 8h30-19h30 từ thứ 2 đến thứ 7, 9h-17h Chủ nhật. Hotline 1800 5246
        </div>
      </v-card>
      <div class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN VÀ</strong><br>
          <strong>IN PHIẾU THU</strong>
          <v-layout align-center justify-center row class="button">
            <v-btn round class="btn-back" @click="backHandle">
              Back
            </v-btn>
            <v-btn fab dark small class="mx-2 btn-print" :loading="printing">
              <i class="material-icons" @click="printHandle">print</i>
            </v-btn>
          </v-layout>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: "contract-repayment-preview",
  props: {
    transactionDate: String,
    customerName: String,
    phoneNumber: String,
    birthDay: String,
    nationalID: String,
    address: String,
    branchAddress: String,
    asset: String,
    description: String,
    accessory: String,
    approvedAmount: String,
    date: String,
    interestRate: Number,
    fee: Number,
    receivedAmountInput: String,
    interestMoneyHint: String,
  },
  computed: {
    ...mapGetters({
      currentBranchAddress: 'branch/currentBranchAddress',
      clientCreatingRequest: 'client/clientCreatingRequest',
      CAssetUpdatingRequest: 'asset/CAssetUpdatingRequest',
      contractCreatingRequest: 'contract/contractCreatingRequest',
    }),
    printing() {
      return this.clientCreatingRequest || this.CAssetUpdatingRequest || this.contractCreatingRequest
    },
  },
  methods: {
    backHandle() {
      this.$emit('back')
    },
    printHandle() {
      this.$emit('end')
    },
  },
}
</script>
<style>
.container-repayment-preview {
  padding: 0px !important;
}
.box-preview-left {
  padding: 50px !important;
  font-size: 13px;
}
.container-repayment-preview .class-border {
  border: 1px solid #BFBFBF !important;
  width: 100%;
  margin: 10px 20px;
}

.box-preview-left .margin-left {
    margin-left: 50px;
}

.logo-img {
  width:80px;
  height:75px;
  margin-left: 5px;
}

.titel-repayment-name {
  width: 100%;
  text-align: center;
}

.titel-repayment-name h1 {
  margin-left: -100px;
}

.box-preview-left .body-container {
  margin-top: 20px;
}

.sign-class {
  margin-top: 20px;
  text-align: center;
}

.sign-class .sign-customer strong {
  margin-left: -100px;
}

.toolbar {
  margin-top: 120px;
}

.box-preview-right {
  padding-left: 30px;
  text-align: center;
}

.box-preview-right .body-container {
  padding: 20px;
}

span { 
  display:block;
  width:733px;
  word-wrap:break-word;
}

.button button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.button .btn-print {
  background-color: #43425D !important;
}

.button .btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26 !important;
  min-width: 4vw !important;
}

.button .btn-back:focus {
  background-color: #EAE5E5 !important;
}

.button .btn-confirm {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}

.button .btn-confirm:hover {
  background-color: #E84D4D !important;
}

.note {
  background-color: #DD1E26;
  color: white;
  text-align: center;
  font-size: 15px;
  padding: 3px;
  margin: 0px 8px;
}
</style>