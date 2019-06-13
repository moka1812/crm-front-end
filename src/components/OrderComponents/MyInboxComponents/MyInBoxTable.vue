<template>
  <table-lib/>
</template>

<script>
import {mapActions} from 'vuex'

import TableLib from "@/components/OrderComponents/TableLib.vue";

export default {
  name: "my-inbox-table",
  components: {
    TableLib
  },
  mounted() {
    this.getOrderListFromStaff()
  },
  methods: {
    ...mapActions({
        getOrderListFromStaff: 'order/getOrderListFromStaff',
    }),
  }
}
</script>