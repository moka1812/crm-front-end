<template>
  <table-lib/>
</template>

<script>
import {mapActions} from 'vuex'

import TableLib from "@/components/OrderComponents/TableLib.vue";

export default {
  name: "order-table",
  components: {
    TableLib
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    ...mapActions({
      getOrderList: 'order/getOrderList',
    }),
  }
}
</script>