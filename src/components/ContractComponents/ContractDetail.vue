<template>
       <v-layout align-space-around justify-start row fill-height fluid class="content-contract-detail">
           <v-flex v-if="flagSchedule === false" xs3 class="container box-contract-info">
               <contract-info/>
           </v-flex>
           <v-flex class="container box-contract-tabs" v-bind="[flagSchedule? 'xs12' :'xs9']">
               <contract-tabs/>
           </v-flex>
       </v-layout>
</template>

<script>
import ContractTabs from "./ContractTabs.vue";
import ContractInfo from "./ContractInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "contract",
  components: { ContractInfo, ContractTabs },
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      flagSchedule: 'contract/contractRepaymentSchedule'
    })
  },
  methods: {
    handleChange(event) {
      const {value} = event.target;
      this.value = value;
    }
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

.content-contract-detail {
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