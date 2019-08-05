<template>
  <div class ="contract-collateralInfo">
    <v-data-table
      :headers="headers"
      :items="collateralInfoListResult"
      :loading="collateralInfoListRequest"
      item-key="original"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-left content"><div id="box-description">{{ props.item.description }}</div></td>
          <td class="text-xs-center content ">{{ props.item.property_type }}</td>
          <td class="text-xs-center content">{{ props.item.storage_id }}</td>
          <td class="text-xs-center content">{{ props.item.storage_location }}</td>
          <td class="text-xs-center content">{{ props.item.liquidation_amount }}</td>
          <td class="text-xs-center content">{{ props.item.liquidation_status }}</td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "contract-collatea-info-tab",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "Description", value: "description", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Property Type", value: "property_type", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Storage ID", value: "storage_id", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Storage Location", value: "storage_location", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Liquidation Amount", value: "liquidation_amount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Liquidation Status", value: "liquidation_status", align: 'center', sortable: false, class: "header hard-width-3vw wrap-text"
        }
      ],
      collateralInfoListResult: [
                {
                    description: 'Laptop 110238384 - không dây sạc',
                    property_type:'Laptop',
                    storage_id:'22131',
                    storage_location: 'DTH',
                    liquidation_amount: '0',
                    liquidation_status: 'Waiting for sale'
                }
      ],
      collateralInfoListRequest: false,
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style>
.contract-collateralInfo {
  margin-top: 15px;
}
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}

td.content {
  font-size: 1vw !important;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #ebecec;
}

#box-description{
  padding-left: 1vw !important;
}

.wrap-text {
  word-wrap: break-word;
}

.hard-width-3vw {
  width: 3vw !important;;
}
</style>
