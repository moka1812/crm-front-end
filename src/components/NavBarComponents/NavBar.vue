<template>
      <v-toolbar class="search-panel" app>
        <form class="my-2 my-lg-0">
          <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control"
                  placeholder="Search case number, contract ID,  customer's info" />
          </div>
        </form>

        <v-spacer/>

        <v-toolbar-items class="hidden-sm-and-down">
          <branch-menu/>
          <v-btn icon>
            <v-icon>chat_bubble</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>notifications</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn flat v-on="on">
                {{name}}
                <v-avatar>
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
import BranchMenu from '@/components/NavBarComponents/BranchMenu.vue';
import {mapGetters} from 'vuex'

export default {
  name: "navbar",
  components: {
    BranchMenu
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

<style scoped>
.search-panel {
  background-color: #fff;
}

.has-search .form-control {
  padding-left: 2.375rem;
  width: 300px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px rgba(169, 170, 177, 0.48);
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>