<template>
  <div id="app">
    <v-app>
      <router-view />
      <notifications id="foo" group="foo" position="top right" animation-type="velocity"/>
      <notifications id="new-notification" group="new-notification" position="bottom right" animation-type="velocity" width="200px">
        <template slot="body" slot-scope="props">
          <div @click="NewNotificationHandle(props.item.title, props.close)">
               <div
                  :class="['vue-notification-template', 'vue-notification', props.item.type]"
                >
                <div
                  v-if="props.item.title"
                  class="notification-title"
                >
                  Order #{{props.item.title}}
                </div>
                <div
                  class="notification-content"
                  v-html="props.item.text"
                >
                </div>
               </div>
          </div>
        </template>
      </notifications>
    </v-app>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      
    }
  },
  methods: {
    ...mapActions({
      getOrderDetailFromNotification: 'order/getOrderDetailFromNotification'
    }),
    NewNotificationHandle: async function(id, close) {
      await this.getOrderDetailFromNotification({id: id})
      close()
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#foo.vue-notification {
  font-size: 20px;
}


</style>
