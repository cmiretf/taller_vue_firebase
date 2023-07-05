import Vue from "vue";
import Vuex from "vuex";
import { getUserRol } from "@/services/users";
import { Auth, Firestore, UsersDoc } from "@/firebase-exports";

import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isUserSignedIn(state) {
      return !!state.user;
    },
    isUserAdmin(state) {
      if (state.user) {
        return state.user.rol == "admin";
      } else {
        return false;
      }
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async configureUser({ commit }, username) {
      const rol = await getUserRol();
      commit("setUser", { username: username, rol: rol });
    },
    async fetchUser({ dispatch }) {
      try {
        const firebaseUser = await Auth.getAuth().currentUser;
        Auth.getAuth().currentUser.getIdToken(false);
        if (firebaseUser) {
          var userUnsubscribe = Firestore.onSnapshot(
            UsersDoc(firebaseUser.uid),
            async (docSnap) => {
              var firestoreUser = docSnap.data();
              var firestoreCopy = {
                ...firestoreUser,
                id: firebaseUser.uid,
              };
              dispatch("configureUser", firestoreCopy);

              firestoreUser.id = firebaseUser.uid;
              const tokenExpiration =
                firebaseUser.stsTokenManager.expirationTime;
              const currentDate = new Date().getTime();
              const expirationTimeout = tokenExpiration - currentDate;
              setTimeout(async () => {
                await dispatch("fetchUser");
              }, expirationTimeout);
              if (!router.currentRoute.meta.userCanAccess()) {
                router.push("/");
              }
            },
            (error) => {
              throw error;
            }
          );
          return userUnsubscribe;
        } else {
          throw new Error("User is not authenticated");
        }
      } catch (err) {
        dispatch("configureUser", null);
        throw err;
      }
    },
  },
  modules: {},
});
