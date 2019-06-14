<template>
  <table-lib @refresh="getOrderListFromStaff()"/>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

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
  computed: {
    ...mapGetters({
       orderFindingErrorCode: 'order/orderFindingErrorCode'
    })
  },
  methods: {
    ...mapActions({
        getOrderListFromStaff: 'order/getOrderListFromStaff',
        planOrderListFromStaff: 'order/planOrderListFromStaff'
    }),
  },
  watch: {
    orderFindingErrorCode() {
      if (this.orderFindingErrorCode == 200) {
        clearInterval(this.shecdule);
      } else if (this.orderFindingErrorCode == 1) {
        this.getOrderListFromStaff()
        this.shecdule = setInterval(this.planOrderListFromStaff, 5000);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.shecdule);
  }
}
</script>