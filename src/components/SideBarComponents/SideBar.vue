<template>
    <v-navigation-drawer 
      class="side-bar"
      hide-overlay
      :width="190"
      stateless
      app
      permanent
    >
      <v-layout justify-space-between column fill-height>
        <v-list class="pt-2">
          <v-list-tile>
            <img src="../../assets/camdo.png">

            <span class="font-white">camdo<strong>nhanh</strong></span>

          </v-list-tile>
          <template v-for="sidebarLink in sidebarLinks">
            <!-- Group with subitems -->
            <v-list-group 
              v-if="sidebarLink.groups"
              class="group"
              :key="sidebarLink.name"  
              no-action="no-action"
            >
              <v-list-tile slot="activator" ripple="ripple" class="item">
                <v-list-tile-action>
                  <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
                </v-list-tile-action>

                
                <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
                
              </v-list-tile>

              <!-- link sub Group -->
              <v-list-tile 
                v-for="subItem in sidebarLink.groups" 
                :key="subItem.name"
                :to="subItem.link"
                class="listitem"
                active-class="highlight"
              >
                  <v-icon dark class="icon">{{subItem.icon}}</v-icon>    
                  <v-list-tile-title class="content-sub">{{ subItem.name }}</v-list-tile-title>
              </v-list-tile>
            </v-list-group>

            <v-list-tile
              v-else
              :key="sidebarLink.name"
              :to="sidebarLink.link"
              class="tile item"
              active-class="highlight"
            >
              <v-list-tile-action>
                <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
              </v-list-tile-action>

              <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
            </v-list-tile>
          </template>
        </v-list>
         
        <v-footer class="pa-3" color="#dd1e26" height="auto">
          <v-flex
            text-xs-center
            white--text
            xs12
          >
            Copyright by <br>Icado Co.,Ltd
          </v-flex>
        </v-footer>
    </v-layout>
    </v-navigation-drawer>
</template>

<script>
import sidebarLinks from '@/config/sidebarLinks'
export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      sidebarLinks: sidebarLinks
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding-bottom: 15px;
}

.font-white {
  color: #fff;
  font-size: 20px;
  padding-left: 5px;
}

.chevron-left {
  margin-left: 1px;
}

.side-bar {
  background-color: #dd1e26;
}
.item {
  padding-top: 15px; 
  padding-bottom: 15px;
}
.content {
  font-size: 13px;
  color: #fff;
}
.content-sub {
  font-size: 12px;
  padding-left: 5px;
  color: #fff;
}
#footer {
  font-size: 13px;
  color: #fff;
  text-align: center;
}
.icon {
  padding-left: 4px
}

</style>

<style>
.v-list__tile {
  padding: 25px 0px 25px;
}
/* Not underline when hover */
a {
  text-decoration: none !important;
}
/* Custom expend icon css */
.v-list__group__header__append-icon {
  padding: 0 7px !important;
}
/* Set white color for expand icon*/
.group .theme--light.v-icon {
  color: white !important;
}

.listitem > .v-list__tile {
  padding-left: 20px
}

.highlight {
  background-color: #c11313;
  color: white;
  pointer-events: none;
}
</style>