<template>
    <v-container fluid>
        <order-management/>
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
    name: "MyInbox",
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
            getSAssetList: 'asset/getSAssetList'
        })
    }
}
</script>

<style scoped>

</style>
