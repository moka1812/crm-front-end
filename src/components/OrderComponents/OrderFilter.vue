<template>
    <v-menu
      v-model="menu"
      full-width
      :close-on-content-click="false"
      offset-y
      nudge-left="300"
      nudge-bottom="5"
    >
        <template v-slot:activator="{ on }">

          <v-btn round v-on="on" class="filter" color="#dd1e26">
            <i class="fas fa-filter"></i>
            Filter
          </v-btn>
        </template>

        <v-card class="content">
          <v-list>
            <v-list-tile class="no-padding">
              <v-list-tile-title>Agent</v-list-tile-title>
              <v-list-tile-action>
                <v-text-field 
                  label="Exp: David" v-model="agent"
                >
                </v-text-field>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile class="no-padding">
              <v-list-tile-title>Created Date</v-list-tile-title>
              <v-list-tile-action>
                  <v-layout id="row-date" row wrap>
                    <v-flex sm6>
                      <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        
                      >
                        <template v-slot:activator="{ on }">
                          <input
                            v-model="startDateFormatted"
                            placeholder="Start Date"
                            size="12"
                            readonly
                            v-on="on"/>
                        </template>
                        <v-date-picker v-model="startDate" no-title>
                          <v-spacer/>
                          <v-btn flat color="primary" @click="startDate = null">Remove</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                    <v-flex sm6>
                      <v-menu
                        ref="endDateMenu"
                        v-model="endDateMenu"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <input
                            v-model="endDateFormatted"
                            placeholder="End Date"
                            size="12"
                            readonly
                            v-on="on"/>
                        </template>
                        <v-date-picker v-model="endDate" no-title>
                          <v-spacer/>
                          <v-btn flat color="primary" @click="endDate = null">Remove</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>Order Status</v-list-tile-title>
              <v-list-tile-action>
                <div class="static">
                  <v-btn v-for="(status) in orderStatus" :key="status.title" small round :class="status.selected ? 'active' : null " @click="status.selected = !status.selected">
                    {{status.title}}
                  </v-btn>
                </div>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile class="no-padding">
              <v-list-tile-title>Asset Type</v-list-tile-title>
              <v-list-tile-action>
                <div class="static">
                  <v-btn v-for="(assetType) in assetTypes" :key="assetType.title" small round :class="assetType.selected ? 'active' : null " @click="assetType.selected = !assetType.selected">
                    {{assetType.title}}
                  </v-btn>
                </div>
              </v-list-tile-action>
            </v-list-tile>
            <hr/>
            <v-toolbar>
              <v-btn class="advanceBtn" round>
                Advance
              </v-btn>
              <v-spacer/>
              <v-btn class="filterBtn" round>
                Filter
              </v-btn>
            </v-toolbar>
          </v-list>
        </v-card>
    </v-menu>
</template>

<script>
let orderStatus = [
  {
    title: 'Unclaimed',
    selected: false
  },
  {
    title: 'Pending',
    selected: false
  },
  {
    title: 'Contacted',
    selected: false
  },
  {
    title: 'Quoted',
    selected: false
  },
  {
    title: 'Waiting',
    selected: false
  }
];

let assetTypes = [
  {
    title: 'Car',
    selected: false
  },
  {
    title: 'Bike',
    selected: false
  },
  {
    title: 'Laptop',
    selected: false
  },
  {
    title: 'Phone',
    selected: false
  },
  {
    title: 'Watch',
    selected: false
  },
  {
    title: 'Jewelry',
    selected: false
  },
  {
    title: 'Bag',
    selected: false
  },
  {
    title: 'Real Estate',
    selected: false
  },
  {
    title: 'Electronic',
    selected: false
  },
  {
    title: 'Others',
    selected: false
  }
]

export default {
  name: "order-filter",
  data() {
    return {
      menu: false,
      startDateMenu: false,
      endDateMenu: false,
      agent: null,
      startDate: null,
      endDate: null,
      orderStatus: orderStatus,
      assetTypes: assetTypes
    }
  },
  computed: {
    startDateFormatted() {
      return this.parseDate(this.startDate)
    },
    endDateFormatted() {
      return this.parseDate(this.endDate)
    }
  },
  methods: {
    parseDate (date) {
      if (!date) return null
      let [year, month, day ] = date.split('-')
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`
    }
  }
};
</script>

<style scoped>
.filter {
  background-color: #fff !important;
  color: #dd1e26 !important;
  margin-right: 4px;
  margin-left: 4px;
}

#row-date {
  margin-left: -4px;
}

div.static {
  width: 265px;
}

.active {
  background-color: #1867c0 !important;
  border-color: #1867c0 !important;
  color: #fff !important
}

hr {
  margin-bottom: 1px;
}

.advanceBtn {
  background-color: #fff !important;
  color: #dd1e26 !important;
}

.filterBtn {
  background-color: #dd1e26 !important;
  color: #fff !important;
}

.content {
  padding: 5px;
}

/* CSS modify vuetify */


.v-list__tile__title {
  width: 120px !important;
}
.v-btn--small {
  font-size: 11px;
  margin-top: 2px;
}
.v-toolbar {
  -webkit-box-shadow: 0px 2px 4px -1px #fff, 0px 4px 5px 0px #fff, 0px 1px 10px 0px #fff !important;
  background-color: #fff !important;
}
</style>

<style>
/* Remove padding in Agent Input */
.no-padding > .v-list__tile {
  padding: 0px !important;
}

/* Allow children inside enough space  */
.v-list__tile {
  height: 100% !important;
}

</style>