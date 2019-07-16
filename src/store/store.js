import Vue from "vue";
import Vuex from "vuex";

import { moduleBranch } from '../components/NavBarComponents/store/branch/index';
import { moduleNotification} from '../components/NavBarComponents/store/notification/index'
import { moduleOrder } from '../components/OrderComponents/store/order/index';
import { moduleAuth } from '../components/LoginComponents/store/auth/index';
import { moduleAsset } from '../components/OrderComponents/store/asset/index'
import { moduleCall } from '../components/CallComponents/store/call/index'


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    branch: moduleBranch,
    auth: moduleAuth,
    order: moduleOrder,
    asset: moduleAsset,
    notification: moduleNotification,
    call: moduleCall,
  },
  actions: {
    reset({commit}) {
      commit('branch/reset')
      commit('auth/reset')
      commit('order/reset')
      commit('asset/reset')
      commit('notification/reset')
      commit('call/reset')
    }
  }
});