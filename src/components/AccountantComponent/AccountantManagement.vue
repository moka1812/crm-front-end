<template>
  <v-container fluid class="content-accountant">
      <v-layout align-start justify-start row>
        <v-flex xs6>
          <h2>KẾ TOÁN & QUÝ</h2>
          <div class="statistical">
            <p>Cần duyệt: <span style="color: red;">{{totalRecordNeedApprove}}</span></p>
            <p>Đã duyệt: <span style="color: red;">{{totalRecordApproved}}</span></p>
            <p>Từ chối: <span style="color: red;">{{totalRecordReject}}</span></p>
          </div>
        </v-flex>
        <v-flex xs6>
          <v-layout align-start justify-end row class="accountant-top">
            <div class="button-hard-size">
              <v-btn fab dark small class="mx-2 btn-filter">
                <img src="../../assets/icon-filter-24.png">
              </v-btn>
            </div>
            <div class="has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input 
                style="width: 150px" 
                type="text" 
                class="form-control"
                placeholder="Nhập Mã HĐ"
                v-model="txtFilter"
                @keyup.enter="submit"
              />
            </div>
            <div class="button-full-size">
              <v-btn round class="btn-need-approval">
                <i class="material-icons">warning</i>
                Cần duyệt
              </v-btn>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <accountant-table/>
  </v-container>
</template>
<script>
import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import AccounttantTableVue from './AccounttantTable.vue';
  export default {
  name: "accountant-management",
  components: {
    DatePicker,
    "accountant-table": AccounttantTableVue
  },
  data: () => ({
    totalRecordNeedApprove: 10,
    totalRecordApproved: 2,
    totalRecordReject: 1,
    txtFilter: "",
  }),
}
</script>
<style>
.content-accountant {
  margin: 0px !important;
  padding: 0px !important;
}

.content-accountant .button-full-size .btn-need-approval {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  background-color: #DD1E26 !important;
  text-transform: uppercase !important;
}

.content-accountant .button-full-size .btn-need-approval i {
  font-size: 1.3vw !important;
  margin-right: 3px;
}

.content-accountant .accountant-top {
  align-items: center;
  vertical-align: middle;
}
.content-accountant .button-hard-size .btn-filter {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.has-search .form-control-feedback {
  position: absolute ;
  z-index: 1;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.content-accountant .statistical {
  display: flex;
}

.content-accountant .statistical p {
  margin-right: 10px;
}
</style>