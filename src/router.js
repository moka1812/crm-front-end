import Vue from "vue"
import Router from "vue-router"
import store from "./store/store"

import HomePage from "./views/HomePage.vue"
import Login from "./views/Login.vue"
import Order from './components/OrderComponents/Order.vue'
import MyInbox from './components/OrderComponents/MyInboxComponents/MyInbox.vue'
import ContractComponent from './components/ContractComponents/ContractComponent.vue'
import Contract from './components/ContractComponents/Contract.vue'
import NewContract from './components/ContractComponents/NewContractComponent.vue'
import ContractDetail from './components/ContractComponents/ContractDetail.vue'
import ContractExtension from './components/ContractComponents/ContractExtension.vue'
import ContractRepayment from './components/ContractComponents/ContractRepayment.vue'
import InterestReminderComponent from './components/InterestReminderComponent/InterestReminderManagement.vue'
import CustomerComponent from './components/CustomerComponent/customerComponent.vue'
import CustomerMangement from './components/CustomerComponent/CustomerMangement.vue'
import CustomerDetail from './components/CustomerComponent/CustomerDetail.vue'
import AccoutantComponent from './components/AccountantComponent/AccountantManagement.vue'

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

const defaultContractPage = {
  path: "",
  name: "contract",
  component: Contract,
  meta: {
    requiresAuth: true
  }
}

const newContractPage = {
  path: "new_contract",
  name: "new_contract",
  component: NewContract,
  meta: {
    requiresAuth: true
  }
}

const defaultContractDetailPage = {
  path: "contract-detail",
  name: "contract-detail",
  component: ContractDetail,
  meta: {
    requiresAuth: true
  }
}

const extensionContractPage = {
  path: "extension-contract",
  name: "extension-contract",
  component: ContractExtension,
  meta: {
    requiresAuth: true
  }
}

const contractRepaymentPage = {
  path: "contract-repayment",
  name: "contract-repayment",
  component: ContractRepayment,
  meta: {
    requiresAuth: true
  }
}

const contractPage = {
  path: "/contracts",
  component: ContractComponent,
  meta: {
    requiresAuth: true
  },
  children: [
    defaultContractPage,
    newContractPage,
    defaultContractDetailPage,
    extensionContractPage,
    contractRepaymentPage,
  ],
}

const interestReminderPage = {
  path: "/interest-reminder",
  name: "interest-reminder",
  component: InterestReminderComponent,
  meta: {
    requiresAuth: true
  },
  children: [
  ],
}

const accoutantPage = {
  path: "/accountants",
  name: "accountants",
  component: AccoutantComponent,
  meta: {
    requiresAuth: true
  },
  children: [
  ],
}

const defaultCusomterPage = {
  path: "",
  name: "customers",
  component: CustomerMangement,
  meta: {
    requiresAuth: true
  }
}

const customerDetailPage = {
  path: "customer-detail",
  name: "customer-detail",
  component: CustomerDetail,
  meta: {
    requiresAuth: true
  }
}

const customerPage = {
  path: "/customers",
  component: CustomerComponent,
  meta: {
    requiresAuth: true
  },
  children: [
    defaultCusomterPage,
    customerDetailPage
  ],
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
    myInboxPage,
    contractPage,
    interestReminderPage,
    customerPage,
    accoutantPage,
  ],
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    homePage,
    loginPage,
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