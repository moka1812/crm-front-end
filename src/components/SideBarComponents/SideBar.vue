<template>
  <v-navigation-drawer
    class="side-bar"
    v-model="drawer"
    :mini-variant.sync="mini"
    hide-overlay
    stateless
    app
  >
    <v-toolbar flat class="transparent header">
      <v-list class="pa-0"
      >
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../../assets/camdo.png">
          </v-list-tile-avatar>

          <v-list-tile-content
            :style="{
              'align-items':'center'
            }"
          >
            <span class="font-white">camdo<strong>nhanh</strong></span>

          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click.stop="mini = !mini"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-list-tile
        v-for="sidebarLink in sidebarLinks" 
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
      <v-list-tile-content 
        :style="{
          'align-items':'center'
        }"
        class="content"
      >
        Copyright by <br>Icado Co.,Ltd
      </v-list-tile-content>
    </v-list>
  
  </v-navigation-drawer>
</template>

<script>
import sidebarLinks from '../../sidebarLinks'

export default {
  name: "SideBar",
  data() {
    return {
      drawer: true,
      mini: false,
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
  font-size: 24px
}

.side-bar {
  background-color: #dd1e26;
}

.content {
  font-size: 20px;
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

</style>