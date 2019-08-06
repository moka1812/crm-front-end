<template>
    <v-container fluid class="pa-0 ma-0">
        <contract-management/>
        <contract-table/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import ContractManagement from "@/components/ContractComponents/ContractManagement.vue"
import ContractTable from "@/components/ContractComponents/ContractTable.vue"

export default {
  name: "contract",
  components: {
    ContractManagement,
    ContractTable,
  },
  beforeRouteLeave (to, from, next) {
    //Empty Client Searching Result, If Route Order Then Error
    this.resetClient()
    next()
  },
  methods: {
    ...mapActions({
      resetClient: 'order/resetClient',
    }),
  }
}
</script>