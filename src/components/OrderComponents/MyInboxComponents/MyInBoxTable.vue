<template>
  <table-lib @refresh="getOrderListFromStaff()"/>
</template>

<script>
import {mapActions} from 'vuex'

import TableLib from "@/components/OrderComponents/TableLib.vue";

export default {
  name: "my-inbox-table",
  components: {
    TableLib
  },
  data() {
    return {
      shecdule: ''
    }
  },
  mounted() {
    this.getOrderListFromStaff()
    this.shecdule = setInterval(this.planOrderListFromStaff, 5000);
  },
  methods: {
    ...mapActions({
        getOrderListFromStaff: 'order/getOrderListFromStaff',
        planOrderListFromStaff: 'order/planOrderListFromStaff'
    }),
  },
  beforeDestroy() {
    clearInterval(this.shecdule);
  }
}
</script>