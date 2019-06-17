<template>
    <v-container fluid pa-0 ma-0>
        <order-management type="MyInbox"/>
        <my-inbox-table/>
        <order-edit/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import OrderManagement from "@/components/OrderComponents/OrderManagement.vue";
import MyInboxTable from "@/components/OrderComponents/MyInboxComponents/MyInBoxTable.vue";
import OrderEdit from "@/components/OrderComponents/OrderEdit.vue"

export default {
    name: "MyInbox",
    components: {
        OrderManagement,
        MyInboxTable,
        OrderEdit
    },
    mounted() {
        this.getSAssetList()
    },
    methods: {
        ...mapActions({
            getSAssetList: 'asset/getSAssetList',
            clientReset: 'order/clientReset'
        })
    },
    beforeRouteLeave (to, from, next) {
        //Empty Client Searching Result
        this.clientReset()
        next()
    }
}
</script>

<style scoped>

</style>
