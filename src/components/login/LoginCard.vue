<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button @click="login()" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Auth } from "@/firebase-exports";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  async beforeCreate() {
    Auth.onAuthStateChanged(Auth.getAuth(), async (user) => {
      if (user) {
        try {
          const authTime =
            (await user.getIdTokenResult()).claims.auth_time * 1000;
          const sessionDuration = 1000 * 60 * 60 * 12; // 12 hour session
          if (Date.now() > authTime + sessionDuration)
            await this.expireSession();
          else {
            const remaining = authTime + sessionDuration - Date.now();
            const twoHours = 1000 * 60 * 60 * 2;
            this.setSessionTimeOut(remaining > twoHours ? remaining : twoHours);

            this.userUnsubscribe = await this.fetchUser();
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (
              this.$route.name === "LoginView" ||
              this.$route.fullPath === "/login"
            ) {
              const finalRoute = this.$route.query.redirect || "/home";
              this.$router.replace(finalRoute);
            }
          }
        } catch {
          const message = this.$t("genericError");
          this.setSnackbar({ position: "top", type: "error", message });

          await new Promise((resolve) => setTimeout(resolve, 3000));
          this.logout();
        }
      } else {
        this.userUnsubscribe();
        this.clearSessionTimeOut();
        if (
          this.$route.name !== "LoginView" &&
          this.$route.name !== "SharedNotificationDetailView"
        ) {
          const currentPath = this.$route.fullPath;
          const redirect = currentPath !== "/" ? currentPath : undefined;
          this.$router.push({ name: "LoginView", query: { redirect } });
        }
      }
      this.waitingAuthUser = false;
    });
  },
  methods: {
    ...mapActions(["configureUser", "fetchUser", "logout"]),
    async login() {
      await this.configureUser(this.username);
      this.$router.push({ name: "home" });
    },
    userUnsubscribe() {},
    clearSessionTimeOut() {
      if (this.timeOut) {
        clearInterval(this.timeOut);
        this.timeOut = null;
      }
    },
  },
};
</script>
