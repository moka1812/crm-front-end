<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <div>
        <v-card id="print" color="#ffffff" class="box-preview-left">
          <v-layout align-center justify-center column>
            <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
            <div class="class-border"></div>
            <h5>Độc lập - Tự do - Hạnh phúc</h5>
          </v-layout>
          <br/>
          <v-layout align-start justify-start row class="body-container">
            <v-flex xs3>
              <img src="../../assets/camdo-logo.png" alt="logo" height="111" width="111">
            </v-flex>
            <v-flex xs9>
              <p style="padding-left: 65px;"><font size="5"><b style="text-align: -webkit-center;">HỢP ĐỒNG CẦM CỐ</b></font></p>
              <strong>Mã hợp đồng(HĐ): {{currentBranch}} - {{loanId}}</strong><br>
              <strong>Mã khách hàng(KH): HCMKH1000-{{clientId}}</strong><br>
            </v-flex>
          </v-layout>
          <br/>
          <p>Ngày {{transactionDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
          
          <v-layout>
              <v-flex xs6>
                <strong>Bên khách hàng:</strong>

                <v-layout>
                    <v-flex xs5>
                        Họ và tên:
                    </v-flex>
                    <v-flex xs7>
                        {{customerName}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        ĐTDĐ:
                    </v-flex>
                    <v-flex xs7>
                        {{phoneNumber}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        Sinh ngày:
                    </v-flex>
                    <v-flex xs7>
                        {{birthDay}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        CMND:
                    </v-flex>
                    <v-flex xs7>
                        {{nationalID}}
                    </v-flex>
                </v-layout>

                <template v-if="contractType ==='Realestate'">
                  <v-layout>
                    <v-flex xs5>
                        Họ&Tên Vợ/Chồng:
                    </v-flex>
                    <v-flex xs7>
                        {{anotherCustomerName}}
                    </v-flex>
                  </v-layout>

                  <v-layout>
                      <v-flex xs5>
                          CMND:
                      </v-flex>
                      <v-flex xs7>
                          {{anothernationalID}}
                      </v-flex>
                  </v-layout>
                </template>

                <v-layout>
                    <v-flex xs5>
                        Địa chỉ:
                    </v-flex>
                    <v-flex xs7>
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

          <br v-if="address.length < 30"/>

          <strong>Hai bên đồng ý thực hiện việc cầm cố tài sản với những thoả thuận sau:</strong>
          <br/>
          <strong>I. THOẢ THUẬN VỀ ĐỊNH GIÁ TÀI SẢN</strong>
          <br/>
          <strong>1. Thông tin tài sản cầm cố (TSCC):</strong>
          <br/>
          <br/>
          <ul>
            <table>
              <tr>
                  <td>
                      <li>Tài sản cầm cố:</li>
                  </td>
                  <td>
                      {{asset}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Miêu tả tài sản:</li>
                  </td>
                  <td>
                      {{description}}
                  </td>
              </tr>
              <tr>
                  <td style="padding-right:30px; white-space:nowrap;">
                      <li>Linh kiện/phụ kiện:</li>
                  </td>
                  <td>
                      {{accessory}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Số lượng:</li>
                  </td>
                  <td>
                      01
                  </td>
              </tr>
            </table>
          </ul>
          <strong>2. Điều kiện cầm:</strong>
          <br/>
          <br/>
          <ul>
            <table>
              <tr>
                  <td>
                      <li>Giá cầm:</li>
                  </td>
                  <td>
                      {{formatedApprovedAmount}} VNĐ
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Ngày hết hạn:</li>
                  </td>
                  <td>
                      {{date}}
                  </td>
              </tr>
              <tr>
                  <td style="padding-right:30px; white-space:nowrap;">
                      <li>Lãi suất trong hạn:</li>
                  </td>
                  <td>
                      1.5 %
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Phí dịch vụ:</li>
                  </td>
                  <td>
                      {{fee}} %
                  </td>
              </tr>
            </table>
          </ul>
          <span>
            ICADO sẽ giải ngân bằng tiền mặt cho KH là <strong>{{formatedReceivedAmount}} VNĐ </strong> {{interestTypeContent1}} <strong>{{formatedInterestMoneyHint}} VNĐ</strong>{{interestTypeContent2}} 
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
          <br/><br/><br/><br/><br/>
          
          <template v-if="contractType !== 'Realestate'">
            <br/>
            <br/>
          </template>

          <center>
            <img src="../../assets/time.png" alt="FOOTER" height="37" width="753" />
          </center>

          <br/>
          <strong>II. ĐIỀU KHOẢN CẦM ĐỒ</strong>
          <p>Quý khách vui lòng đọc kỹ các quy định dưới đây trước khi kí HĐ:</p>
          <br/>
          <strong>1. Các điều khoản về thời hạn, tất toán và gia hạn HĐ</strong>
          <span>
          <ul style="list-style-type: circle;">
            <li>HĐ này có giá trị trong vòng {{period}}. Hết {{period}}, khách hàng có quyền tất toán hoặc gia hạn HĐ</li>
            <li>Trong trường hợp gia hạn, khách hàng sẽ tiến hành đóng lãi theo quy định của ICADO.</li>
            <li>Trong trường hợp KH gia hạn HĐ, ICADO sẽ thẩm định lại giá trị TSCC theo giá trị tài sản thực tế tại thời điểm gia hạn. Trong trường hợp KH muốn gia hạn mà giá trị tài sản tại thời điểm gia hạn mất giá trị quá 10% thì KH sẽ tiến hành đóng lãi cộng thêm khoản chênh lệch để được tiếp tục gia hạn HĐ.</li>
            <li>Trong trường hợp ICADO và KH đồng ý thỏa thuận, việc gia hạn có thể được thực hiện dưới 2 hình thức:</li>
            <ul style="list-style-type: square;">
              <li>KH đến trực tiếp công ty làm thủ tục.</li>
              <li>KH thực hiện chuyển khoản tiền lãi (thêm khoản chênh lệch nếu có) cộng với xác nhận email/tin nhắn. ICADO sẽ xác nhận gia hạn qua email/tin nhắn.</li>
            </ul>
            <li>KH có thể đóng lãi, tất toán HĐ bằng tiền mặt tại văn phòng hoặc chuyển khoản qua thông tin dưới đây:</li>
            <li>Nội dung: Đóng lãi/tất toán HĐ số..................</li>
            <br/>
            <center>
              <table style="width: 478px; height: 141px; border: 1px solid black; border-collapse: collapse;">
                  <tr>
                    <td style="border: 1px solid black; border-collapse: collapse;" align="left" colspan="2"><font size="2">&nbsp; Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)</font></td>
                  </tr>
                <tr>
                  <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Chủ tài khoản:</font></td>
                  <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Công ty TNHH Đầu tư và Phát triển kinh doanh ICADO</font></td>
                </tr>
                <tr>
                  <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; Số tài khoản:</font></td>
                  <td style="border: 1px solid black; border-collapse: collapse;" align="left"><font size="2">&nbsp; 0071001173304</font></td>
                </tr>
                <tr align="left" valign="middle">
                  <td style="border: 1px solid black; border-collapse: collapse;" align="left" colspan="4"><font size="2">&nbsp; Nội dung: Đóng lãi/tất toán HĐ số..................</font></td>
                </tr>
              </table>
            </center>
          </ul>
          <strong>2. Các điều khoản liên quan đến tiền lãi</strong>
          <ul style="list-style-type: circle;">
            <li>Trong trường hợp KH gia hạn HĐ, ICADO sẽ thẩm định lại giá trị TSCC theo giá trị tài sản thực tế tại thời điểm gia hạn. Trong trường hợp KH muốn gia hạn mà giá trị tài sản tại thời điểm gia hạn mất giá trị quá 10% thì KH sẽ tiến hành đóng lãi cộng thêm khoản chênh lệch để được tiếp tục gia hạn HĐ.</li>
            <li>Trường hợp KH tất toán trước thời hạn cầm, ICADO không hoàn trả lại khoản lãi đã thu trước đó.</li>
          </ul>
        <strong>3. Thanh lý tài sản</strong>
        <ul style="list-style-type: circle;">
          <li>Sau 3 ngày kể từ ngày hết hạn cầm cố, nếu KH không hoàn thành nghĩa vụ tất toán HĐ hoặc đóng lãi gia hạn theo Điều 1 của HĐ này, ICADO có quyền nhận chính TSCC để thay thế cho việc thực hiện nghĩa vụ trả nợ của KH.</li>
          <li>ICADO sẽ có toàn quyền sở hữu và được phép thanh lý TSCC theo quy định nội bộ, đồng thời yêu cầu KH thanh toán số nợ còn thiếu nếu số tiền thu được từ việc thanh lý TSCC không đủ bù đắp vốn đã cho cầm và các chi phí liên quan đến việc thanh lý TSCC của KH.</li>
        </ul>
          <strong>5. Quy định về tất toán HĐ</strong>
          <ul style="list-style-type: circle;">
            <li>Chỉ người đứng tên trên HĐ mới có quyền nhận lại TSCC (mang theo cả giấy CMND và HĐ cầm cố).</li>
            <li>ICADO sẽ bàn giao tài sản còn nguyên tem niêm phong với chữ ký khi KH hoàn tất việc thanh toán tiền gốc và lãi theo HĐ. KH cần thực hiện việc tháo dỡ tem và kiểm tra lại tài sản khi có sự hiện diện của nhân viên công ty. Mọi hư hỏng sau khi tài sản được bàn giao cho KH, ICADO sẽ không chịu trách nhiệm.</li>
            <li>Trường hợp tài sản bị tổn thất do lâu không được sử dụng, ICADO sẽ không chịu trách nhiệm bồi thường.</li>
          </ul>
          <strong>6. Các quy định khác</strong>
          <ul style="list-style-type: circle;">
            <li>Trong trường hợp bị thất lạc, mất mát hoặc hư hại HĐ, KH có trách nhiệm thông báo ngay cho ICADO, chúng tôi sẽ không chịu trách nhiệm với bất kỳ tổn thất nào về tài sản của quý khách khi không xuất trình được HĐ.</li>
            <li>Trong trường hợp ICADO cần mở niêm phong TSCC để kiểm tra ngẫu nhiên tài sản theo quy định của công ty, KH hỗ trợ hiện diện có mặt để đảm bảo việc niêm phong minh bạch.</li>
            <li>Trong trường hợp TSCC bị tổn hại do lỗi bên ICADO, công ty sẽ có trách nhiệm bồi thường cho KH theo thỏa thuận của hai bên</li>
          </ul>
          </span>
        </v-card>

        <br/>
        
        <v-card v-if="contractType==='Bike/Car'" id="authorizedPrint" color="#ffffff" class="box-preview-left">
          <v-layout align-center justify-center column>
            <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
            <div class="class-border"></div>
            <h5>Độc lập - Tự do - Hạnh phúc</h5>
          </v-layout>
          <br/>
          <v-layout align-start justify-start row class="body-container">
            <v-flex xs3>
              <img src="../../assets/camdo-logo.png" alt="logo" height="111" width="111">
            </v-flex>
            <v-flex xs9>
              <p style="padding-left: 88px; margin-bottom: 0px;"><font size="5"><b style="text-align: -webkit-center;">GIẤY UỶ QUYỀN</b></font></p>
              <p style="padding-left: 108px;"><font size="5"><b style="text-align: -webkit-center;">XE MÁY/Ô TÔ</b></font></p>
            </v-flex>
          </v-layout>
          <br/>
          <p>Ngày {{transactionDate}}, Tại Công ty TNHH Đầu tư và Phát Triển Kinh Doanh ICADO, Chúng tôi gồm có:</p>
          
          <v-layout>
              <v-flex xs6>
                <strong>BÊN UỶ QUYỀN (BÊN A):</strong>

                <v-layout>
                    <v-flex xs5>
                        Họ và tên:
                    </v-flex>
                    <v-flex xs7>
                        {{customerName}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        ĐTDĐ:
                    </v-flex>
                    <v-flex xs7>
                        {{phoneNumber}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        Sinh ngày:
                    </v-flex>
                    <v-flex xs7>
                        {{birthDay}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        CMND:
                    </v-flex>
                    <v-flex xs7>
                        {{nationalID}}
                    </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs5>
                        Địa chỉ:
                    </v-flex>
                    <v-flex xs7>
                        {{address}}
                    </v-flex>
                </v-layout>

              </v-flex>

              <v-flex sm6>
                  <strong>BÊN ĐƯỢC UỶ QUYỀN (BÊN B):</strong>
                  <br/>
                  Công ty TNHH Đầu Tư và Phát Triển Kinh Doanh ICADO
                  <br/>
                  GPKD số: 0313412428
                  <br/>
                  Địa chỉ: {{currentBranchAddress}}
              </v-flex>
          </v-layout>
          <br/>
          <strong>I. NỘI DUNG UỶ QUYỀN</strong>
          <br/>
          <span>Trong trường hợp Bên A không hoàn thành nghĩa vụ đóng lãi hoặc chuộc xe máy/ô tô đúng thời hạn đã được thể hiện trong hợp đồng cầm cố số:{{currentBranch}} - {{loanId}} Thì Bên A ủy quyền cho Bên B toàn quyền sở hữu và quyết định (bán, sang tên, ...) xe máy/ô tô được thể hiện trong hợp đồng cầm cố số: {{currentBranch}} - {{loanId}} .Thông tin xe máy/ô tô cụ thể như sau:</span>
          <br/>
          <ul>
            <table>
              <tr>
                  <td>
                      <li>Số máy:</li>
                  </td>
                  <td>
                      {{vehicleID}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Số khung:</li>
                  </td>
                  <td>
                      {{chassisNumber}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Nhãn hiệu:</li>
                  </td>
                  <td>
                      {{label}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Loại xe:</li>
                  </td>
                  <td>
                      {{vehicleType}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Màu sơn:</li>
                  </td>
                  <td>
                      {{color}}
                  </td>
              </tr>
              <tr>
                  <td>
                      <li>Biển số đăng ký:</li>
                  </td>
                  <td>
                      {{licensePlate}}
                  </td>
              </tr>
            </table>
          </ul>
          <strong>II. CAM KẾT</strong>
          <br/>
          <span>Hai bên cam kết sẽ hoàn toàn chịu trách nhiệm trước Pháp luật về mọi thông tin ủy quyền ở trên.
          Giấy ủy quyền trên được lập thành 2 bản, mổi bên giữ 1 bản và có hiệu lực ngang nhau.</span>
          <br/>
          <v-layout>
              <v-flex sm6>
                <center>
                  BÊN UỶ QUYỀN
                  <br/>
                  (Ký, ghi rõ họ tên)
                </center>
              </v-flex>
              <v-flex sm6>
                <center>
                  BÊN ĐƯỢC UỶ QUYỀN
                  <br/>
                  (Ký, ghi rõ họ tên)
                </center>
              </v-flex>
          </v-layout>
        </v-card>
      </div>
      <div class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN VÀ</strong><br>
          <strong>IN PHIẾU THU</strong>
          <v-layout align-center justify-center row class="button">
            <v-btn round class="btn-back" @click="backHandle" :disabled="created || contractCreatingRequest">
              Back
            </v-btn>
            <v-btn fab dark small class="mx-2 btn-print" :loading="printing" @click="printHandle">
              <i class="material-icons">print</i>
            </v-btn>
            <v-btn v-if="contractType==='Bike/Car'" round class="mx-2 btn-print" :loading="printing" @click="authorizedPrintHandle">
              <i class="material-icons">print</i>
              Giấy UỶ Quyền
            </v-btn>
            <v-btn round class="btn-confirm" @click="endHandle" :disabled="endDisable">
              End
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
    contractType: String,
    transactionDate: String,
    customerName: String,
    anotherCustomerName: String,
    phoneNumber: String,
    birthDay: String,
    nationalID: String,
    anothernationalID: String,
    address: String,
    branchAddress: String,
    asset: String,
    description: String,
    accessory: String,
    approvedAmount: Number,
    date: String,
    interestRate: Number,
    fee: Number,
    receivedAmount: String,
    interestMoneyHint: Number,
    productName: String,
    repayEvery: Number,
    vehicleID: String,
    chassisNumber: String,
    label: String,
    vehicleType: String,
    color: String,
    licensePlate: String,
    newClient: Boolean,
  },
  data() {
    return {
      loanId: 'XXXX',
      clientId: 'XXXX',
      printed: false,
      authorizedPrinted: false,
      printType: null,
    }
  },
  mounted() {
    if (!this.newClient) {
      this.clientId = this.clientSearchResult.mifosId
    }
  },
  computed: {
    ...mapGetters({
      currentBranch: 'branch/currentBranch',
      currentBranchAddress: 'branch/currentBranchAddress',
      clientSearchResult: 'client/clientSearchResult',
      clientCreatingRequest: 'client/clientCreatingRequest',
      clientCreatingErrorCode: 'client/clientCreatingErrorCode',
      clientCreatingResult: 'client/clientCreatingResult',
      CAssetUpdatingRequest: 'asset/CAssetUpdatingRequest',
      contractCreatingRequest: 'contract/contractCreatingRequest',
      contractCreatingResult: 'contract/contractCreatingResult',
      contractCreatingErrorCode: 'contract/contractCreatingErrorCode',
    }),
    created() {
      if (this.contractCreatingErrorCode === 201) {
        return true
      }
      return false
    },
    endDisable() {
      if (this.created) {
        if (this.contractType==='Bike/Car') {
          return !this.printed && !this.authorizedPrinted
        }
        return !this.printed
      }
      return true
    },
    printing() {
      return this.clientCreatingRequest || this.CAssetUpdatingRequest || this.contractCreatingRequest
    },
    formatedApprovedAmount() {
      return (this.approvedAmount * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    formatedReceivedAmount() {
      return (this.receivedAmount * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    formatedInterestMoneyHint() {
      return (this.interestMoneyHint * 1000000).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    period() {
      if (this.repayEvery === 30) {
        return '1 Tháng'
      }
      return `${this.repayEvery} Ngày`
    },
    interestTypeContent1() {
      if (this.productName.includes('Prepaid Interest')) {
        return "đã khấu trừ tiền lãi suất đầu kỳ là"
      }
      return "và sẽ thu tiền lãi suất mỗi kỳ là"
    },
    interestTypeContent2() {
      if (this.productName.includes('Prepaid Interest')) {
        return "."
      }
      return " vào ngày hết hạn hợp đồng."
    },
  },
  methods: {
    backHandle() {
      this.$emit('back')
    },
    printHandle() {
      if (!this.created) {
       this.$emit('create')
       this.printType = 'print'
      } else {
        this.$htmlToPaper('print', () => {
          this.printed = true
        })
      }
    },
    authorizedPrintHandle() {
      if (!this.created) {
        this.$emit('create')
        this.printType = 'authorizedPrint'
      } else {
        this.$htmlToPaper('authorizedPrint', () => {
          this.authorizedPrinted = true
        })
      }
    },
    endHandle() {
      this.$emit('end')
    },
  },
  watch: {
    created() {
      if (this.created === true) {
        this.loanId = this.contractCreatingResult.mifos_id

        //Waiting for update clientId and loanId
        setTimeout(() => {
          // Callback print
          if (this.printType === 'print') {
            this.printHandle()
          } else if (this.printType === 'authorizedPrint') {
            this.authorizedPrintHandle()
          }
          this.printType = null
        }, 500)
      }
    },
    clientCreatingErrorCode() {
      if (this.clientCreatingErrorCode === 201) {
        this.clientId = this.clientCreatingResult.mifos_id
      }
    }
  }
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
</style>