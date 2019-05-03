import Vue from "vue";
import Vuex from "vuex";

import { moduleBranch } from '../components/NavBarComponents/store/branch/index';
import { moduleOrder } from '../components/OrderComponents/store/order/index';
import { moduleAuth } from '../components/LoginComponents/store/auth/index';


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    branch: moduleBranch,
    auth: moduleAuth,
    order: moduleOrder
  }
});