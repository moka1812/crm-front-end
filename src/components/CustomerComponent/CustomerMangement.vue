<template>
  <v-container fluid class="content-customer">
      <v-layout align-start justify-start row style="align-items: center;justify-content: center;">
        <v-flex xs3>
          <h2>Hồ Sơ Khách Hàng</h2>
        </v-flex>
        <v-flex xs9>
          <v-layout align-start justify-end row class="box-filter">
            <div class="button-hard-size">
              <v-btn fab dark small class="mx-2 btn-filter">
                <img src="../../assets/icon-filter-24.png">
              </v-btn>
              <v-btn fab dark small class="mx-2 btn-folder">
                <i class="material-icons">folder_open</i>
              </v-btn>
            </div>
            <div class="has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input 
                style="width: 260px" 
                type="text" 
                class="form-control"
                placeholder="Họ tên, CMND/HC, số điện thoại,..."
                v-model="txtFilter"
                @keyup.enter="submit"
              />
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <customer-page/>
  </v-container>
</template>
<script>
import CustomerPageVue from './CustomerPage.vue';
  export default {
  name: "customer-management",
  components: {
    'customer-page': CustomerPageVue
  },
  data: () => ({
    txtFilter: "",
  }),
}
</script>
<style>

.content-customer {
  margin: 0px !important;
  padding: 0px !important;
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

.content-customer .button-hard-size button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.content-customer .box-filter {
  align-items: center;
  vertical-align: middle;
}
</style>