<template>
      <v-layout align-space-around justify-start column>
        <v-layout align-center justify-end row>
          <v-btn round class="btn-back-contract" :to="{ name: 'contract' }">
            <i class="material-icons">close</i>
          </v-btn>
      </v-layout>
      <v-layout align-space-around justify-start row fill-height fluid class="content-contract-detail">
          <v-flex v-if="flagSchedule === false" xs3 class="container box-contract-info">
              <contract-info v-bind:contractId="contractId"/>
          </v-flex>
          <v-flex class="container box-contract-tabs" v-bind="[flagSchedule? 'xs12' :'xs9']">
              <contract-tabs v-bind:contractId="contractId"/>
          </v-flex>
       </v-layout>
      </v-layout>
</template>

<script>
import ContractTabs from "./ContractTabs.vue";
import ContractInfo from "./ContractInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "contract-detail",
  components: { ContractInfo, ContractTabs },
  data: () => ({
    contractId: null
  }),
  watch: {
    '$route': {
      handler: 'getContractById',
      immediate: true
    }
  },
  created() {
    this.getContractById();
  },
  computed: {
    ...mapGetters({
      flagSchedule: 'contract/contractRepaymentSchedule',
    }),
  },
  methods: {
    getContractById() {
      this.contractId = String(this.$route.query.id);
    },
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

.btn-back-contract {
  background-color: #DD1E26 !important;
  min-width: 2.5vw !important;
  padding: 1px;
  margin: 0px 0px  5px 0px;
  font-size: 1vw !important;
  color: #ffffff !important;
  border-radius: 5% !important;
}
</style>