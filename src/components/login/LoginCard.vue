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
          // Establecemos el tiempo de autenticación
          const authTime =
            (await user.getIdTokenResult()).claims.auth_time * 1000;

          // Establecemos el tiempo de sesion
          const sessionDuration = 1000 * 60 * 60 * 12; // 12 hour session

          // En el caso de se expire la sesión llamamos a la función de expireSession de methods
          if (Date.now() > authTime + sessionDuration)
            await this.expireSession();
          else {
            // const remaining = authTime + sessionDuration - Date.now();
            // const twoHours = 1000 * 60 * 60 * 2;
            // this.setSessionTimeOut(remaining > twoHours ? remaining : twoHours);

            // Suscripcion del usuario
            this.userUnsubscribe = await this.fetchUser();
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // En el caso de que este todo correcto, redirigimos al usuario a la pagina '/home'
            if (
              this.$route.name === "LoginView" ||
              this.$route.fullPath === "/login"
            ) {
              const finalRoute = this.$route.query.redirect || "/home";
              this.$router.replace(finalRoute);
            }
          }
        } catch {
          console.log(this.$t("genericError"));

          await new Promise((resolve) => setTimeout(resolve, 3000));
          this.logout();
        }
      } else {
        this.userUnsubscribe();
      }
    });
  },
  methods: {
    ...mapActions(["configureUser", "fetchUser", "logout"]),
    async login() {
      await this.configureUser(this.username);
      this.$router.push({ name: "home" });
    },
    userUnsubscribe() {},
    async expireSession() {
      await this.logout();
      this.$router.push({ name: "LoginView" });
    },
    // clearSessionTimeOut() {
    //   if (this.timeOut) {
    //     clearInterval(this.timeOut);
    //     this.timeOut = null;
    //   }
    // },
  },
};
</script>
