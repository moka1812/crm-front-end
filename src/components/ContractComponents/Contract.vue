<template>
    <v-container fluid pa-0 ma-0>
        <contract-management/>
        <contract-table/>
    </v-container>
</template>

<script>
// @ is an alias to /src
import ContractManagement from "@/components/ContractComponents/ContractManagement.vue"
import ContractTable from "@/components/ContractComponents/ContractTable.vue"

export default {
    name: "contract",
    components: {
        ContractManagement,
        ContractTable,
    },
}
</script>