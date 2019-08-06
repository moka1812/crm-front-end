<template>
    <v-container fluid class="pa-0 ma-0">
      <order-management type="Order"/>
      <order-table/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import OrderManagement from "@/components/OrderComponents/OrderManagement.vue";
import OrderTable from "@/components/OrderComponents/OrderTable.vue";

export default {
  name: "order",
  components: {
    OrderManagement,
    OrderTable,
  },
  methods: {
    ...mapActions({
      resetClient: 'order/resetClient',
      resetOrderList: 'order/resetOrderList',
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
