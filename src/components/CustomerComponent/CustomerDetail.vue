<template>
  <v-layout align-space-around justify-start column>
    <v-layout align-center justify-end row>
      <v-btn round class="btn-back-customer" :to="{ name: 'customers' }">
        <i class="material-icons">close</i>
      </v-btn>
  </v-layout>
  <v-layout align-space-around justify-start row fill-height fluid class="content-customer-detail">
      <v-flex xs4 class="container box-customer-info">
          <customer-info/>
      </v-flex>
      <v-flex xs8 class="container box-customer-tabs">
          <customer-tabs/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import CustomerTabs from "./CustomerTabs.vue";
import CustomerInfo from "./CustomerInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "customer-detail",
  components: { CustomerInfo, CustomerTabs },
  data: () => ({
    customertId: null
  }),
  watch: {
  },
  methods: {
  }
};
</script>

<style scoped>
.container {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  background-color: #FFFFFF !important;
}

.content-customer-detail {
  padding: 0px !important;
  margin: 0px !important;
  height: 100%;
  border: none;
}

.box-customer-info {
  margin-right: 15px !important;
  min-width: 300px !important;
}

.box-customer-tabs {
  min-width: 700px !important;
}

.btn-back-customer {
  background-color: #DD1E26 !important;
  min-width: 2.5vw !important;
  padding: 1px;
  margin: 0px 0px  5px 0px;
  font-size: 1vw !important;
  color: #ffffff !important;
  border-radius: 5% !important;
}
</style>