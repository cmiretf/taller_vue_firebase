import Vue from 'vue'
import VueRouter from 'vue-router'
import VehiculosView from '../views/VehiculosView.vue'
import LoginView from '../views/LoginView.vue'
import ManagementView from '../views/ManagementView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: VehiculosView,
    meta: {
      tabTitle: 'home',
      userCanAccess: () => store.getters.isUserSignedIn,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      tabTitle: 'login',
      userCanAccess: () => true,
    }
  },
  {
    path: '/management',
    name: 'management',
    component: ManagementView,
    meta: {
      tabTitle: 'management',
      userCanAccess: () => store.getters.isUserAdmin,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.name);
  const meta = to.meta
  console.log('meta',meta);
  if (Object.keys(meta).length==0 ) {
    return next({ path: '/login' })
  }
  if (!meta.userCanAccess()) {
    next({ path: '/login' })
  } else{
    next()
  }
})
export default router
