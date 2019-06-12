import Vue from "vue";
import Router from "vue-router";

import HomePage from "./views/HomePage.vue"
import Login from "./views/Login.vue";
import Order from './components/OrderComponents/Order.vue';
import MyInbox from './components/OrderComponents/MyInboxComponents/MyInbox.vue'

import { TokenService } from './services/storage.service'

Vue.use(Router);

let loginPage = {
  path: "/login",
  name: "login",
  component: Login,
  meta: {
    guest: true
  }
}

let orderPage = {
  path: "orders",
  name: "orders",
  component: Order,
  meta: {
    requiresAuth: true
  }
}

let myInboxPage = {
  path: "my_inbox",
  name: "my_inbox",
  component: MyInbox,
  meta: {
    requiresAuth: true
  }
}

let homePage = {
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
    loginPage
  ]
});

router.beforeEach((to, from, next) => {
  //Components require auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to)
    if (TokenService.getToken() == null) {
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
