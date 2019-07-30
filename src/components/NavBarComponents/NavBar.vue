<template>
    <v-toolbar color="#ffffff" app fixed>

      <v-spacer/>

      <v-toolbar-items>
        <branch-menu/>
        <dial-pad-menu/>
        <v-btn flat icon color="#ffffff">
          <v-icon color="#000000">chat_bubble</v-icon>
        </v-btn>
        <notification-menu/>
        <v-menu offset-y >
          <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" color="#ffffff">
              <font color="black">{{name}}</font>
              <v-avatar :style="{'padding-left': '10px'}">
                <img src="../../assets/camdo.png" alt="avatar">
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-list-tile-title><center>Status: <font color="green">Online</font></center></v-list-tile-title>
              <v-divider/>
            </v-list-tile>

            <v-list-tile
              v-for="(item) in avatarItems"
              :key="item.key"
              @click="avatarItemHandle(item.key)"
            >
              <v-list-tile-title><center>{{ item.title }}</center></v-list-tile-title>
              <v-divider/>
            </v-list-tile>
          </v-list>
        </v-menu>
        
      </v-toolbar-items>

    </v-toolbar>

</template>

<script>
import DialPadMenu from '@/components/NavBarComponents/DialPadMenu.vue';
import BranchMenu from '@/components/NavBarComponents/BranchMenu.vue';
import NotificationMenu from '@/components/NavBarComponents/NotificationMenu.vue';
import {mapGetters} from 'vuex'

export default {
  name: "navbar",
  components: {
    DialPadMenu,
    BranchMenu,
    NotificationMenu
  },
  data() {
    return {
      avatarItems: [
        { 
          key: 'settings',
          title: 'Account settings' 
        },
        { 
          key: 'feedback',
          title: 'Feedback' 
        },
        { 
          key: 'logout',
          title: 'Logout' 
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      name: 'auth/name'
    })
  },
  methods: {
    avatarItemHandle: function(key) {
      switch(key) {
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout: function() {
      this.$store.dispatch('auth/logout')
    }
  }
}

</script>