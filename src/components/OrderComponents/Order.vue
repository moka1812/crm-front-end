<template>
    <v-container fluid>
        <order-management/>
        <order-table/>
    </v-container>
</template>

<script>
// @ is an alias to /src
import OrderManagement from "@/components/OrderComponents/OrderManagement.vue";
import OrderTable from "@/components/OrderComponents/OrderTable.vue";

export default {
  name: "order",
  components: {
    OrderManagement,
    OrderTable
  }
}
</script>

<style scoped>

</style>