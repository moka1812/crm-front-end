<template>
  <v-container fluid class="pa-0 ma-2">
    <v-layout row>
      <v-flex md5 class="title">
        <h2>Contract Repayment</h2>
        <h3>Overview</h3>
      </v-flex>
      <v-spacer />
      <v-flex md3>
        <v-stepper alt-labels v-model="step" class="elevation-0 background">
          <v-stepper-header>
            <template v-for="index in 2" class="step">
              <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
              <v-divider v-if="index !== 2" :key="`divider-${index}`" />
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-form v-model="valid2" class="form-customer">
          <v-flex md12 class="title-customer">
            <h2 style="font-weight: bold">Asset Info</h2>
          </v-flex>
          <v-container>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Mô tả tài sản
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm3>
                <v-textarea
                  v-model.lazy="assetInput"
                  rows="1"
                  auto-grow
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  outlined
                ></v-textarea>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
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
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Loại tài sản
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm3>
                <v-select
                  v-model="assetTypeInput"
                  :items="assetTypeItems"
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  outline
                ></v-select>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
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
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Giá thẩm định 2
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm3>
                <v-text-field
                  v-model="validatorAmount2Input"
                  :rules="[
                                            v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                                        ]"
                  placeholder="Giá thẩm định 2"
                  :hint="this.validatorAmount2Hint"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
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
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-window-item>
    </v-window>
  </v-container>
</template>
<script>
  export default {
  name: "contract-repayment",
  components: {},
  data: () => ({
    step: 1,
  }),
  methods: {
  }
};
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