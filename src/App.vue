<template>
  <div id="app">
    <v-app>
      <router-view />
      <window/>
      <notifications id="foo" group="foo" position="top right" animation-type="velocity"/>
      <order-notification/>
    </v-app>
  </div>
</template>
<script>

import OrderNotification from "@/components/OrderNotificationComponents/OrderNotification.vue"
import Window from "@/components/CallComponents/Window.vue"

export default {
  components: {
    OrderNotification,
    Window
  },
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F0F0F7;
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
#foo .vue-notification {
  font-size: 20px;
}

</style>
