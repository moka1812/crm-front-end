import Vue from "vue";
import Router from "vue-router";
import store from "./store/store"

import HomePage from "./views/HomePage.vue"
import Login from "./views/Login.vue";
import Order from './components/OrderComponents/Order.vue';
import MyInbox from './components/OrderComponents/MyInboxComponents/MyInbox.vue'
import DialogBox from "./components/CallComponents/DialogBox.vue"

import { TokenService } from './services/storage.service'

Vue.use(Router);

const loginPage = {
  path: "/login",
  name: "login",
  component: Login,
  meta: {
    guest: true
  }
}

const dialogPage = {
  path: "/dialog",
  name: "dialog",
  component: DialogBox,
  meta: {
    requiresAuth: true
  }
}

const orderPage = {
  path: "orders",
  name: "orders",
  component: Order,
  meta: {
    requiresAuth: true
  }
}

const myInboxPage = {
  path: "my_inbox",
  name: "my_inbox",
  component: MyInbox,
  meta: {
    requiresAuth: true
  }
}

const homePage = {
  path: "/",
  name: "homepage",
  component: HomePage,
  meta: {
    requiresAuth: true
  },
  children: [
    orderPage,
    myInboxPage
  ]
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    homePage,
    loginPage,
    dialogPage
  ]
});

router.beforeEach((to, from, next) => {
  //Components require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (TokenService.getToken() == null) {
      //Token expired, remove all value
      store.dispatch('auth/logout')
      //Come back Login Component 
      next({
        name: 'login',
        params: { nextUrl: '/orders' }
      })
    } else if (to.name == 'homepage') {
      //From HomePage to Order
      next({name: 'orders'})
    } else {
      //Continue
      next()
    }
  //Component for Guest, Example Login Component
  } else if (to.matched.some(record => record.meta.guest)) {
    //Nothing Token, Continue
    if (TokenService.getToken() == null) {
      next()
    }
    //Having Token, Don't come back Login Component
    next()
  //Anything else
  } else {
    next()
  }

});

export default router;
