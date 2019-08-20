<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <v-flex xs8>
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
              <strong>Mã hợp đồng(HĐ):{{contractId}}</strong><br>
              <strong>Mã khách hàng(KH):{{customerId}}</strong><br>
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
                  Địa chỉ: {{branchAddress}}
              </v-flex>
          </v-layout>

          <br/>

          <strong>Hai bên đồng ý thực hiện việc cầm cố tài sản với những thoả thuận sau:</strong>
          <br/>
          <strong>I. THOẢ THUẬN VỀ ĐỊNH GIÁ TÀI SẢN</strong>
          <br/>
          <strong>1. Thông tin tài sản cầm cố (TSCC):</strong>
          <br/>
          
          <ul>
            <v-layout>
                <v-flex sm6>
                    <li> Tài sản cầm cố:</li>
                </v-flex>
                <v-flex sm6>
                    {{asset}}
                </v-flex>
            </v-layout>
          </ul>
        </v-card>
      </v-flex>
      <v-flex xs4 class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN VÀ</strong><br>
          <strong>IN PHIẾU THU</strong>
          <v-layout align-center justify-center row class="button">
            <v-btn round class="btn-back">
              Back
            </v-btn>
            <v-btn fab dark small class="mx-2 btn-print">
              <i class="material-icons">print</i>
            </v-btn>
            <v-btn round class="btn-confirm">
              End
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
  name: "contract-repayment-preview",
  components: {
  },
  data: () => ({
    contractId: 'STB-contract-id',
    customerId: 'STB-customer-id',
    transactionDate: '2019/03/03',
    customerName: 'Ma Văn Chiều',
    phoneNumber: '03482947287',
    birthDay: '17-05-1996',
    nationalID: '197351905',
    address: '213 Lê Văn Việt - Quận 9',
    branchAddress: '190 Đinh Tiên Hoàng, P. ĐK, Q1',
    monney: 234289972
  }),
  mounted() {
  },
  methods: {
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
</style>