<template>
    <v-container fluid pa-0 ma-0>
        <order-management type="Order"/>
        <order-table/>
        <order-edit/>
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
      resetClient: 'order/resetClient',
      resetOrderList: 'order/resetOrderList'
    })
  },
  beforeRouteLeave (to, from, next) {
    //Empty Client Searching Result, If Route My Inbox then Error
    this.resetClient()
    next()
  },
  beforeDestroy() {
    this.resetOrderList()
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
