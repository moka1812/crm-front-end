<template>
    <v-container fluid class="pa-0 ma-2">
        <v-layout row>
            <v-flex md5 class="title">
                <h2>Extension - New Contract</h2>
                <h3>Contract #123456</h3>
            </v-flex>
            <v-spacer/>
            <v-flex md3>
                <v-stepper alt-labels v-model="step" class="elevation-0 background">
                    <v-stepper-header>
                        <template v-for="index in 2" class="step">
                            <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
                            <v-divider v-if="index !== 2" :key="`divider-${index}`"/>
                        </template>
                    </v-stepper-header>
                </v-stepper>
            </v-flex>
        </v-layout>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-form v-model="valid1" class="form-customer">
                    <v-flex md12 class="title-customer">
                        <h2 style="font-weight: bold">Customer Info</h2>
                    </v-flex>
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Name<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    placeholder="Exp : Pham Le David"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Email</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="emailInput"
                                    placeholder="Exp : adress@gmail.com"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                             <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Phone 1<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    placeholder="Exp : 0989004630"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Phone 2<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^-?[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    placeholder="Exp : 0989004630"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">DOB<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker v-model="dobInput" placeholder="dd/mm/yyyy"/>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">CMND</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model.lazy="NationalIDInput"
                                    placeholder="Exp : 0212312321"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Địa chỉ</v-subheader>
                            </v-flex>
                            <v-flex style="max-width: 86%">
                                <v-text-field
                                    v-model.lazy="addressInput"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                    ]"
                                    placeholder="Exp : Số nhà, đường"
                                    outlined
                                >
                                </v-text-field>
                            </v-flex>
                         </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Quận/Huyện</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-select
                                    v-model="districtInput"
                                    class="v-input-border"
                                    :items="districtItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Thành phố</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                    class="select"
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader  class="input-header">Source</v-subheader>
                            </v-flex>
                            <v-flex xs12 sm3>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Note</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    rows="1"
                                    >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn
                                class="backBtn"
                                color="#fff"
                                round
                            >
                                <!-- <i class="fas fa-pen" style="margin-right:5px"></i> -->
                                Confirm
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid2" class="form-customer">
                    <v-flex md12 class="title-customer">
                        <h2 style="font-weight: bold">Asset Info</h2>
                    </v-flex>
                    <v-container>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Mô tả tài sản<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outlined
                                >
                                </v-textarea>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá mong muốn</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="expectedAmountInput"
                                    :rules="[
                                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Giá mong muốn"
                                    :hint="this.expectedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Loại tài sản<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá thẩm định 1</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="validatorAmount1Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Giá thẩm định 1"
                                    :hint="this.validatorAmount1Hint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Giá thẩm định 2<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="validatorAmount2Input"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Giá thẩm định 2"
                                    :hint="this.validatorAmount2Hint"
                                >
                                </v-text-field>
                            </v-flex>
                            <v-spacer class="space"/>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Giá cầm</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="pawnAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Giá cầm"
                                    :hint="this.pawnAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
                <br/>
                <v-form v-model="valid3" class="form-customer">
                    <v-flex md12 class="title-customer">
                        <h2 style="font-weight: bold">Contract Info</h2>
                    </v-flex>
                    <v-container>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Mã HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="contractIDInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Mã hợp đồng"
                                >
                                </v-text-field>
                            </v-flex>
                             <v-flex class="header-form" >
                                <v-subheader class="input-header">Loại HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                             <v-flex class="header-form" >
                                <v-subheader class="input-header">Số tiền nhận được</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="receivedAmountInput"
                                    :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    label="Số tiền nhận được"
                                    :hint="this.receivedAmountHint"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                             <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Gói<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-select
                                    v-model="packageInput"
                                    :items="packageItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Gói"
                                    outline
                                >
                                </v-select>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Ngày hết hạn HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker v-model="expirationDateInput" placeholder="Ngày hết hạn hợp đồng*"/>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Khoản làm tròn</v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="roundingInput"
                                    :rules="[
                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Khoản làm tròn"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Ngày mở HĐ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <date-picker v-model="openingDateInput" placeholder="Ngày mở hợp đồng*"/>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Gốc<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="costInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Gốc*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader class="input-header">Còn nợ<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="owedInput"
                                    :rules="[
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Còn nợ"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Giá cầm<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="pawnPriceInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Giá cầm*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex class="header-form" >
                                <v-subheader style="font-weight: bold" class="input-header">Tổng phí</v-subheader>
                            </v-flex>
                            <v-flex sm4>
                                <v-text-field
                                    v-model="feeInput"
                                    placeholder="Tổng phí"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex class="header-form header-form-lef">
                                <v-subheader class="input-header">Tiền lãi<span class="required">*</span></v-subheader>
                            </v-flex>
                            <v-flex sm3>
                                <v-text-field
                                    v-model="interestMoneyInput"
                                    :rules="[
                                            v => !!v || 'Yều cầu cần có',
                                            v => /^\d+$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                                    placeholder="Tiền lãi"
                                    readonly
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm1></v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="warehousingFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm6>
                                                <v-subheader class="input-header">Phí kho bãi</v-subheader>
                                            </v-flex>
                                            <v-flex sm1></v-flex>
                                            <v-flex>
                                                <v-text-field
                                                    v-model="warehousingFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    placeholder="Phí kho bãi"
                                                    :disabled="!warehousingFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1>
                                        
                                    </v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="appraisalFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm6 >
                                                <v-subheader class="input-header">Phí thẩm định</v-subheader>
                                            </v-flex>
                                            <v-flex sm1></v-flex>
                                            <v-flex>
                                                <v-text-field
                                                    v-model="appraisalFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    placeholder="Phí thẩm định"
                                                    :disabled="!appraisalFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="notaryFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm6 >
                                                <v-subheader class="input-header">Phí công chứng</v-subheader>
                                            </v-flex>
                                            <v-flex sm1></v-flex>
                                            <v-flex >
                                                <v-text-field
                                                    v-model="notaryFeeInput"
                                                    :rules="[
                                                            v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                        ]"
                                                    placeholder="Phí công chứng"
                                                    :disabled="!notaryFeeCheck"
                                                >
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex sm1></v-flex>
                                    <v-flex sm5>
                                        <v-layout>
                                            <v-flex sm1>
                                                <v-checkbox
                                                    v-model="anotherFeeCheck"
                                                    color="#dd1e26"
                                                >
                                                </v-checkbox>
                                            </v-flex>
                                            <v-flex sm6 >
                                                <v-subheader class="input-header">Phí khác</v-subheader>
                                            </v-flex>
                                            <v-flex sm1></v-flex>
                                            <v-flex>
                                            <v-text-field
                                                v-model="anotherFeeInput"
                                                :rules="[
                                                        v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                    ]"
                                                placeholder="Phí khác"
                                                :disabled="!anotherFeeCheck"
                                            >
                                            </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm4>
                                <label class="v-label theme--light"> Phương thức </label>
                                <v-radio-group v-model="methodInput" row>
                                    <v-radio color="#dd1e26" label="Tiền mặt" value="Tiền mặt"></v-radio>
                                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex sm8>
                                <v-layout>
                                    <v-flex sm6>
                                        <v-select
                                            v-model="bankInput"
                                            :items="bankItems"
                                            label="Ngân hàng"
                                            :disabled="methodInput == 'Tiền mặt'"
                                            outline
                                            class="select"
                                        >
                                        </v-select>
                                    </v-flex>

                                    <v-flex sm6>
                                        <v-text-field
                                            v-model="accountNumberInput"
                                            :rules="[
                                                    v => /^\d*$/.test(v) || 'Dữ liệu không hợp lệ'
                                                ]"
                                            label="Số tài khoản"
                                            :disabled="methodInput == 'Tiền mặt'"
                                        >
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-text-field
                                    v-model="bankBranchInput"
                                    label="Chi Nhánh/PGD"
                                    :disabled="methodInput == 'Tiền mặt'"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
        </v-window>
        
    </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import changeDigitToText from '../../mixins/money'
import sourceItems from '../../mixins/source_items'
import contractItems from './utils/contract_items'

export default {
  name: "extension-contract",
  components: {
    DatePicker,
  },
  data() {
    return {
      step: 1,
      newCustomer: true,
      valid1: true,
      valid2: true,
      valid3: true,
      nameInput: '',
      emailInput: '',
      phone1Input: '',
      phone2Input: '',
      dobInput: '',
      NationalIDInput: '',
      addressInput: '',
      districtInput:'',
      districtItems: ['Quận 1', 'Quận 2', 'Quận 3'],
      cityInput: '',
      cityItems: ['Tp.HCM', 'Hà Nội'],
      sourceInput: '',
      sourceItems: sourceItems,
      noteInput: '',
      assetInput: '',
      expectedAmountInput: '',
      assetTypeInput: '',
      assetTypeItems: [],
      validatorAmount1Input: '',
      validatorAmount2Input: '',
      pawnAmountInput: '',
      contractIDInput: '',
      receivedAmountInput: '',
      packageInput: '',
      packageItems: ['1 Tuần', '1 Tháng', '1 Tháng - Ưu đãi', 'Flexi'],
      expirationDateInput: '',
      roundingInput : '',
      openingDateInput: '',
      costInput: '',
      owedInput: '',
      pawnPriceInput: '',
      interestMoneyInput: '',
      warehousingFeeCheck: false,
      warehousingFeeInput: '',
      appraisalFeeCheck: false,
      appraisalFeeInput: '',
      notaryFeeCheck: false,
      notaryFeeInput: '',
      anotherFeeCheck: false,
      anotherFeeInput: '',
      methodInput: 'Tiền mặt',
      bankInput: '',
      bankItems: ['Không', 'ACB', 'Maritimebank', 'Sacombank', 'OCB', 'thêm...'],
      accountNumberInput: '',
      bankBranchInput: '',
    }
  },
  mounted() {
    this.getSAssetList()
  },
  computed: {
    ...mapGetters({
        SAssetListResult: 'asset/SAssetListResult',
    }),
    oldCustomer: {
        get() {return !this.newCustomer},
        set(value) {this.newCustomer = !value}
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmount1Hint() {
        return changeDigitToText(this.validatorAmount1Input)
    },
    validatorAmount2Hint() {
        return changeDigitToText(this.validatorAmount2Input)
    },
    pawnAmountHint() {
        return changeDigitToText(this.pawnAmountInput)
    },
    contractTypeItems() {
        const types = []
        for (let key in contractItems) {
            types.push(contractItems[key].vi)
        }
        return types
    },
    receivedAmountHint() {
        return changeDigitToText(this.receivedAmountInput)
    },
    feeInput() {
        try {
            const warehousingFee = this.warehousingFeeCheck ? Number.parseInt(this.warehousingFeeInput) || 0 : 0
            const appraisalFee = this.appraisalFeeCheck ? Number.parseInt(this.appraisalFeeInput) || 0 : 0
            const notaryFee = this.notaryFeeCheck ? Number.parseInt(this.notaryFeeInput) || 0 : 0
            const anotherFee = this.anotherFeeCheck ? Number.parseInt(this.anotherFeeInput) || 0 : 0
            return warehousingFee + appraisalFee + notaryFee + anotherFee
        } catch (error) {
            return ''
        }
    }
  },
  watch: {
    //When finish call API get SAsset, Update assetTypeItems
    SAssetListResult() {
      const asset = []
      for (let item of this.SAssetListResult) {
        asset.push(item.description)
      }
      this.assetTypeItems = asset
    },
  },
  methods: {
    ...mapActions({
        getSAssetList: 'asset/getSAssetList',
    }),
    cancleHandle() {
        this.$router.back();
    }
  }
}
</script>
<style scoped>
.background {
    background-color: #F0F0F7;
}
.step {
    padding-top: 0px;
}
.title {
    padding-top: 20px;
    padding-left: 16px;
}
.title-customer {
    text-align: center;
    text-decoration: underline;
    margin-top: 20px;
}
.form-customer {
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.padding {
    padding-left: 95px;
    padding-right: 95px;
    background-color: #ffffff;
    border-style: solid;
}
.form {
    background-color: #ffffff;
    border-style: solid;
    border-width: 1px;
}
.backBtn {
  color: #dd1e26 !important;
}
.nextBtn {
  color: #ffff !important;
}
.cancelBtn {
  color: #fff !important;
}
.input-header {
    font-size: 1vw;
    color: black;
}
.header-form {
    max-width: 11%;
    width: 11%;
}
.header-form-left {
   margin-left: 5%;
}
.space {
    max-width: 25%;
}
.required {
  color: #dd1e26;
}
.v-input-border .v-input__control .v-input__slot{
  border: 1px solid red !important;
}
</style>