<template>
       <v-layout align-space-around justify-start row fill-height fluid class="content">
           <v-flex xs3 class="container box-contract-info">
               <contract-info />
           </v-flex>
           <v-flex xs9 class="container box-contract-tabs">
               <contract-tabs />
           </v-flex>
       </v-layout>
</template>

<script>
import ContractTabs from "./ContractTabs.vue";
import ContractInfo from "./ContractInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "contract",
  components: { ContractInfo, ContractTabs }
};
</script>

<style scoped>
.container {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  background-color: #FFFFFF !important;
}

.content {
  padding: 0px !important;
  margin: 0px !important;
  height: 100%;
  border: none;
}

.box-contract-info {
  margin-right: 15px !important;
  min-width: 250px !important;
}

.box-contract-tabs {
  min-width: 700px !important;
}
</style>