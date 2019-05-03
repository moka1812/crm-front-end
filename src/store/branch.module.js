export const moduleBranch = {
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