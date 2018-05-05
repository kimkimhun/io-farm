import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

const routerOptions = [{
    path: '/signup',
    component: 'SignUp'
  },
  {
    path: '/signin',
    component: 'SignIn'
  },
  {
    path: '/',
    component: 'Main',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/setting',
    component: 'Setting',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/setting/temperature',
    component: 'PageSetting/TemperatureSetting',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/setting/rotate',
    component: 'PageSetting/RotateSetting',
    meta: {
      requiresAuth: true
    }
  },

]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () =>
      import (`@/components/${route.component}.vue`),
    meta: route.meta
  }
})

const router = new Router({
  mode: 'history',
  routes: [
    ...routes, {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to
    .matched
    .some(record => record.meta.requiresAuth)
  const user = firebase
    .auth()
    .currentUser
  if (requiresAuth && !user) {
    next('/signin')
  }
  next()
})

export default router
