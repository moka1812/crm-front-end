<template>
  <v-navigation-drawer
    class="side-bar"
    v-model="drawer"
    hide-overlay
    :width="190"
    stateless
    app
  >
    <v-toolbar flat class="transparent header">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <img src="../../assets/camdo.png">

          <v-list-tile-content
            :style="{
              'align-items':'center'
            }"
          >
            <span class="font-white">camdo<strong>nhanh</strong></span>

          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <template v-for="sidebarLink in sidebarLinks">
      <!-- Group with subitems -->
      <v-list-group 
        v-if="sidebarLink.groups"
        class="group"
        :key="sidebarLink.name"  
        no-action="no-action"
        
      >
        <v-list-tile slot="activator" ripple="ripple">
          <v-list-tile-action>
            <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile 
          v-for="subItem in sidebarLink.groups" 
          :key="subItem.name"
          @click="redirectHandle(subItem.link)"
          class="listitem"
        >
          <v-list-tile-action>
            <v-icon dark class="icon">{{subItem.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="content">{{ subItem.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-list-tile
        v-else
        :key="sidebarLink.name"
        @click="redirectHandle(sidebarLink.link)"
      >
        <v-list-tile-action>
          <v-icon dark class="icon">{{sidebarLink.icon}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title class="content">{{ sidebarLink.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      </template>
      <v-list-tile-content 
        :style="{
          'align-items':'center'
        }"
        class="content"
        d-flex
      >
        Copyright by <br>Icado Co.,Ltd
      </v-list-tile-content>

        
    </v-list>
  
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
  methods: {
    redirectHandle: function(link) {
      this.$router.push(link);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding-bottom: 15px;
}

.font-white {
  color: #fff;
  font-size: 17px;
  padding-left: 5px
}

.chevron-left {
  margin-left: 1px;
}

.side-bar {
  background-color: #dd1e26;
}

.content {
  font-size: 13px;
  color: #fff;
}

.icon {
  padding-left: 4px
}
</style>

<style>
.v-list__tile {
  padding: 25px 0px 25px;
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
</style>