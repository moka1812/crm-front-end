<template>
  <v-container fluid class="content-reminder">
      <v-layout align-start justify-start row>
        <v-flex xs2>
          <h2>Nhắc Lãi</h2>
          <p>Tổng <span style="color: red;">{{totalRecordInterest}}</span></p>
        </v-flex>
        <v-flex xs10>
          <v-layout align-start justify-end row>
            <div class="has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input 
                style="width: 230px" 
                type="text" 
                class="form-control"
                placeholder="Mã HĐ, thông tin khách hàng"
                v-model="txtFilter"
                @keyup.enter="submit"
              />
            </div>
            <div class="button-full-size">
              <v-btn round class="btn-filter">
                Filter
              </v-btn>
            </div>
            <div class="customize_date-picker" style="margin-right:5px;">
              <date-picker v-model="dateFrom" placeholder="Từ"/>
            </div>
            <div class="customize_date-picker">
              <date-picker v-model="dateTo" placeholder="Đến"/>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <reminder-table/>
  </v-container>
</template>
<script>
  import DatePicker from "@/components/ContractComponents/DatePicker.vue"
import ReminderTable from './ReminderTable.vue';
  export default {
  name: "reminder-management",
  components: {
    DatePicker,
    "reminder-table": ReminderTable
  },
  data: () => ({
    totalRecordInterest: 10,
    txtFilter: "",
    dateFrom: "",
    dateTo: "",
  }),
}
</script>
<style>

.content-reminder {
  margin: 0px !important;
  padding: 0px !important;
}
.button-full-size button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.button-full-size .btn-filter {
  background-color: #43425D !important;
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

.customize_date-picker .v-input__slot {
  max-width: 115px !important;
  border: 1px solid #000000;
  border-radius: 2px;
  background-color: #ffffff;
  padding-left: 2px;
}

.customize_date-picker .v-input {
  padding-top: 3px !important;
}
</style>