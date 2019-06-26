import Vue from "vue";

//Plugins
import "./plugins/vuetify";
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import "./plugins/vue-notification"
import "./plugins/google-auth"
import "./plugins/vue-cookies"
import "./plugins/vue-worker"
import "./plugins/vue-window"

import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import ApiService from './services/api.service'
import { TokenService, VOIPUserService } from './services/storage.service'
import VOIPService from './services/VoIP.service'

//Set Token when open website and token exist
if (TokenService.getToken()) {
  ApiService.setHeader()
  ApiService.mount403Interceptor();
}

//If user and password VOIP exist in cookie, connect to VOIP Backend
if (VOIPUserService.isExist() && VOIPService.getTelephone() == null) {

  const username = VOIPUserService.getUsername()
  const password =  VOIPUserService.getPassword()
 
  VOIPService.setTelephone({user: username, password: password})

}

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue;