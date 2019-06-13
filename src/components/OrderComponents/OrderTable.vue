<template>
  <table-lib @refresh="getOrderList()"/>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

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
  computed: {
    ...mapGetters({
      orderFindingErrorCode: 'order/orderFindingErrorCode'
    })
  },
  methods: {
    ...mapActions({
      getOrderList: 'order/getOrderList',
      planOrderList: 'order/planOrderList',
    }),
  },
  watch: {
    orderFindingErrorCode() {
      if (this.orderFindingErrorCode == 200) {
        clearInterval(this.shecdule);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.shecdule);
  }
}
</script>