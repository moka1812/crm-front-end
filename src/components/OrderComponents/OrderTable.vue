<template>
  <table-lib @refresh="getOrderList()"/>
</template>

<script>
import {mapActions} from 'vuex'

import TableLib from "@/components/OrderComponents/TableLib.vue";

export default {
  name: "order-table",
  components: {
    TableLib
  },
  data() {
    return {
      shecdule: ''
    }
  },
  mounted() {
    this.getOrderList()
    this.shecdule = setInterval(this.planOrderList, 5000);
  },
  methods: {
    ...mapActions({
      getOrderList: 'order/getOrderList',
      planOrderList: 'order/planOrderList',
    }),
  },
  beforeDestroy() {
    clearInterval(this.shecdule);
  }
}
</script>