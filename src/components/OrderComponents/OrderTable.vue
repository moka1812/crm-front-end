<template>
    <div class="table-content">
        <!-- <table class="table">
            <thead>
                <tr>
                    <th scope="col" v-for="headName in headNames" :key="headName">{{headName}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">3152</th>
                    <td>16/5/2018</td>
                    <td>@17/5/2018</td>
                    <td>Hồng</td>
                    <td>Moving</td>
                    <td>Tuyết Hoa</td>
                    <td>+84123456789</td>
                    <td>Bike</td>
                    <td>
                        <div class="back-check" style="display: inline;">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="back-cancel" style="display: inline;">
                            <i class="fas fa-times"></i>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1"
          :disable-initial-sort="true"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.orderID }}</td>
            <td class="text-xs-left">{{ props.item.createdDate }}</td>
            <td class="text-xs-left">{{ props.item.lastModify }}</td>
            <td class="text-xs-left">{{ props.item.agent }}</td>
            <td class="text-xs-left" :style="{color: getColor(props.item.status)}">
              {{ props.item.status }}
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.asset }}</td>
            <td class="text-xs-center">
              <v-btn flat icon v-if="props.item.status == 'Waiting'">
                <v-icon color="#70cc3b">check_circle_outline</v-icon>
              </v-btn>
              <v-btn flat icon v-else-if="props.item.status == 'Unclaimed'">
                <v-icon color="#70cc3b">reply</v-icon>
              </v-btn>
              <v-btn flat icon v-else-if="props.item.status == 'Pending'">
                <v-icon color="#c122b1">contact_support</v-icon>
              </v-btn>
              <v-btn flat icon v-else-if="props.item.status == 'Quoted'">
                <v-icon color="#f3f711">sync</v-icon>
              </v-btn>
              <v-btn flat icon v-else-if="props.item.status == 'Contract'">
                <v-icon color="#2b56a9">call</v-icon>
              </v-btn>

              <v-btn flat icon>
                <v-icon color="#f73d3d">stars</v-icon>
              </v-btn>
            </td>
          </template>

          <template v-slot:pageText="props">
            <!-- Remove -->
          </template>
        </v-data-table>
    </div>
</template>

<script>
import { randomBytes } from 'crypto';
// @ is an alias to /src
let headNames = [
    "ORDER ID",
    "CREATED DATE",
    "LAST MODIFY",
    "AGENT",
    "STATUS",
    "NAME",
    "PHONE",
    "ASSET",
    "ACTION"
]

export default {
  name: "order-table",
  data() {
    return {
      headers: [
        {
          text: "ORDER ID", value: "orderID", sortable: false
        },
        {
          text: "CREATED DATE", value: "createdDate", sortable: false
        },
        {
          text: "LAST MODIFY", value: "lastModify", sortable: false
        },
        {
          text: "AGENT", value: "agent", sortable: false
        },
        {
          text: "STATUS", value: "status", sortable: false
        },
        {
          text: "NAME", value: "name", sortable: false
        },
        {
          text: "PHONE", value: "phone", sortable: false
        },
        {
          text: "ASSET", value: "asset", sortable: false
        },
        {
          text: "ACTION", value: "action", sortable: false, align: 'center'
        },
      ],
      items: [
        {
          orderID: 3152,
          createdDate: "16/5/2018",
          lastModify: "17/5/2018",
          agent: "Hồng",
          status: "Waiting",
          name: "Tuyết Hoa",
          phone: "+84123456789",
          asset: "Bike"
        },
        {
          orderID: 3152,
          createdDate: "16/5/2018",
          lastModify: "17/5/2018",
          agent: "Hồng",
          status: "Unclaimed",
          name: "Tuyết Hoa",
          phone: "+84123456789",
          asset: "Bike"
        },
        {
          orderID: 3152,
          createdDate: "16/5/2018",
          lastModify: "17/5/2018",
          agent: "Hồng",
          status: "Pending",
          name: "Tuyết Hoa",
          phone: "+84123456789",
          asset: "Bike"
        },
        {
          orderID: 3152,
          createdDate: "16/5/2018",
          lastModify: "17/5/2018",
          agent: "Hồng",
          status: "Quoted",
          name: "Tuyết Hoa",
          phone: "+84123456789",
          asset: "Bike"
        },
        {
          orderID: 3152,
          createdDate: "16/5/2018",
          lastModify: "17/5/2018",
          agent: "Hồng",
          status: "Contract",
          name: "Tuyết Hoa",
          phone: "+84123456789",
          asset: "Bike"
        }
      ]
    }
  },
  methods: {
    getColor: function(status) {
      switch (status) {
        case "Waiting":
          return "#70cc3b"
        case "Unclaimed":
          return "#c12121"
        case "Pending":
          return "#c122b1"
        case "Quoted":
          return "#f3f711"
        case "Contract":
          return "#2b56a9"
      }
    }
  }
}
</script>

<style scoped>
.table {
  background-color: #fff;
}

.back-check {
  background-color: #e1f3e5;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-check i {
  font-size: 15px;
  padding: 0px 0px 0 5px;
  color: #157f1f;
}

.back-cancel {
  background-color: #F9D9DA;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-cancel i {
  font-size: 15px;
  padding: 0px 7px 0 7px;
  color: #DD1E26;
}

.back-phone {
  background-color: #C0E4FB;
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.back-phone i {
  font-size: 15px;
  padding: 0 3px 0 5px;
  color: #0197F6;
}
</style>