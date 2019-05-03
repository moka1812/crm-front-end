import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//Set branch company (đặt chi nhánh công ty)
const moduleBranch = {
  namespaced: true,
  state: { current_branch: null },
  mutations: {
    changeBranch(state, payload) {
      state.current_branch = payload.branch
    }
  },
  actions: {  
    changeBranch ({ commit }) {
      commit('changeBranch')
    }
  },
  getters: {  }
}

export default new Vuex.Store({
  modules: {
    branch: moduleBranch
  }
});
