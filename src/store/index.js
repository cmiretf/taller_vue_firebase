import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserRol
} from '@/services/users'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isUserSignedIn(state) {
      return !!state.user
    },
    isUserAdmin(state) {
      if (state.user) {
        return state.user.rol == 'admin'
      }else{
        return false
      }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async configureUser({ commit },username) {
      const rol = await getUserRol()
      commit('setUser', {username: username, rol: rol});
    },
  },
  modules: {
  }
})
