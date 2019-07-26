<template>
    <v-container fluid class="pa-0 ma-0">
        <v-layout row>
            <v-flex md5 class="title">
                <h2>New Contract - Customer Info</h2>
            </v-flex>
            <v-flex md7>
                <v-stepper v-model="step" class="elevation-0 background">
                    <v-stepper-header>
                        <template v-for="index in 4" class="step">
                            <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
                            <v-divider v-if="index !== 4" :key="`divider-${index}`"/>
                        </template>
                    </v-stepper-header>
                </v-stepper>
            </v-flex>
        </v-layout>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-layout>
                    <v-checkbox
                        v-model="newCustomer"
                        label="Khách hàng mới"
                        color="#dd1e26"
                        class="customer"
                    ></v-checkbox>
                    <v-checkbox
                        v-model="oldCustomer"
                        label="Khách hàng cũ"
                        color="#dd1e26"
                        class="customer"
                    ></v-checkbox>
                </v-layout>
                <v-form v-model="valid1">
                    <v-container :style="{'padding-top': '0px'}">
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="nameInput"
                                    label="Tên*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="emailInput"
                                    label="Email"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="phone1Input"
                                    :rules="[
                                        v => !!v || 'Yêu cầu cần có',
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 1*"
                                    required
                                >
                                </v-text-field>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="phone2Input"
                                    :rules="[
                                        //Phone has charater pre '+' (only one or no), from 10-13 digits.
                                        v => /^-?[+]?[0-9]{10,13}$/.test(v) || 'Dữ liệu không hợp lệ'
                                    ]"
                                    label="Phone 2"
                                >
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <date-picker v-model="dobInput" label="DOB*"/>
                            </v-flex>
                            <v-flex sm6>
                                <v-text-field
                                    v-model.lazy="NationalIDInput"
                                    label="CMND"
                                >
                                    <template slot="append-outer">
                                        <v-icon>attach_file</v-icon>
                                    </template>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-text-field
                            v-model.lazy="addressInput"
                            :rules="[
                                v => !!v || 'Yêu cầu cần có',
                            ]"
                            label="Địa chỉ"
                            required
                        >
                        </v-text-field>
                        <v-layout>
                            <v-flex sm6>
                                <v-select
                                    v-model="districtInput"
                                    :items="districtItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Quận/Huyện"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-select
                                    v-model="cityInput"
                                    :items="cityItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Thành phố"
                                    required
                                >
                                </v-select>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex sm6>
                                <v-select
                                    v-model="sourceInput"
                                    :items="sourceItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Source"
                                    required
                                >
                                </v-select>
                            </v-flex>
                            <v-flex sm6>
                                <v-textarea
                                    v-model.lazy="noteInput"
                                    label="Note"
                                    rows="1"
                                    auto-grow
                                    >
                                </v-textarea>
                            </v-flex>
                        </v-layout>
                        <v-layout
                            align-center
                            justify-end
                        >
                            <v-btn class="backBtn"
                                color="#fff"
                            >
                                Back
                            </v-btn>
                            <v-btn class="nextBtn"
                                color="#dd1e26"
                                @click="step++"
                            >
                                Next
                            </v-btn>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-window-item>
            <v-window-item :value="2">
                <v-form v-model="valid2">
                    <v-container>
                        <v-layout>
                            <v-flex sm6>
                                <v-textarea
                                    v-model.lazy="assetInput"
                                    label="Mô tả tài sản*"
                                    rows="1"
                                    auto-grow
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    required
                                >
                                </v-textarea>
                            </v-flex>
                            <v-flex sm6>
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
                            <v-flex sm6>
                                <v-select
                                    v-model="assetTypeInput"
                                    :items="assetTypeItems"
                                    :rules="[v => !!v || 'Yều cầu cần có']"
                                    label="Loại tài sản*"
                                    required
                                >
                                </v-select>
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

export default {
  name: "new-contract",
  components: {
    DatePicker,
  },
  data() {
    return {
      step: 1,
      newCustomer: true,
      valid1: true,
      valid2: true,
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
    }
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
.backBtn {
  color: #dd1e26 !important;
}
.nextBtn {
  color: #ffff !important;
}
</style>
<style>
.customer .v-label {
    margin-bottom: 0px;
    margin-right: 5px;
}
</style>
