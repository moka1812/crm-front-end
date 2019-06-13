<template>
    <v-container fluid>
        <order-management type="Order"/>
        <order-edit/>
        <order-table/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import OrderManagement from "@/components/OrderComponents/OrderManagement.vue";
import OrderTable from "@/components/OrderComponents/OrderTable.vue";
import OrderEdit from "@/components/OrderComponents/OrderEdit.vue"

export default {
  name: "order",
  components: {
    OrderManagement,
    OrderTable,
    OrderEdit
  },
  mounted() {
    this.getSAssetList()
  },
  methods: {
    ...mapActions({
      getSAssetList: 'asset/getSAssetList',
      clientReset: 'order/clientReset'
    })
  },
  beforeRouteLeave (to, from, next) {
    //Empty Client Searching Result
    this.clientReset()
    next()
  }
}
</script>

<style scoped>

</style>

<style>
.v-select-list .v-list__tile {
  padding-left: 20px !important;
}
</style>
