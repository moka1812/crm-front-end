<template>
  <v-container fluid class="content">
      <v-layout row>
        <v-flex md8 xs12>
            <h2>{{this.name}}</h2>
            <ul class="list-inline management">
                <li v-if="this.unclaimed != null" class="list-inline-item" :style="`color:${this.caseStatus.UNCLAIMED.color}`">{{this.caseStatus.UNCLAIMED.name}}: {{this.unclaimed}}</li>
                <li class="list-inline-item" :style="`color:${this.caseStatus.PENDING.color}`">{{this.caseStatus.PENDING.name}}: {{this.pending}}</li>
                <li class="list-inline-item" :style="`color:${this.caseStatus.CONTACT.color}`">{{this.caseStatus.CONTACT.name}}: {{this.contact}}</li>
                <li class="list-inline-item" :style="`color:${this.caseStatus.QUOTED.color}`">{{this.caseStatus.QUOTED.name}}: {{this.quoted}}</li>
                <li class="list-inline-item" :style="`color:${this.caseStatus.APPOINTMENT.color}`">{{this.caseStatus.APPOINTMENT.name}}: {{this.appointment}}</li>
            </ul>
        </v-flex>

        <v-flex md4 xs12>
          <v-container fluid>
            <v-layout
              align-center
              justify-end
            >
              <div class="has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input 
                  style="width: 200px" 
                  type="text" 
                  class="form-control"
                  placeholder="Nhập số điện thoại"
                  v-model="phoneInput"
                  @keyup.enter="submit"
                />
              </div>

              <v-btn class="margin-left-right" icon color="#dd1e26">
                <v-icon color="#ffff">access_time</v-icon>
              </v-btn>

              <v-btn class="margin-left-right" icon color="#8e8e8e" outline>
                <v-icon color="#dd1e26">folder_open</v-icon>
              </v-btn>

              <order-filter/>
              
              <new-order/>
            </v-layout> 
          </v-container>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import NewOrder from "@/components/OrderComponents/NewOrder.vue";
import OrderFilter from "@/components/OrderComponents/OrderFilter.vue";

import caseStatus from './utils/case_status'

export default {
  name: "order-management",
  components: {
    NewOrder,
    OrderFilter
  },
  props: {
    type: String,
  },
  data() {
    return {
      caseStatus: caseStatus,
      phoneInput: ''
    }
  },
  computed: {
    name() {
      switch(this.type) {
        case 'Order':
          return 'Order Management'
        case 'MyInbox':
          return 'My Inbox'
      }
    },
    ...mapGetters({
      orderCountResult: 'order/orderCountResult'
    }),
    unclaimed() {
      try {
        if (this.orderCountResult.hasOwnProperty('unclaimed')) {
          return this.orderCountResult['unclaimed']
        }
      } catch (error) {
        
      }
      return null
    },
    pending() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['pending']
      }
      return null
    },
    contact() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['contact']
      }
      return null
    },
    quoted() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['quoted']
      }
      return null
    },
    appointment() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['appointment']
      }
      return null
    }
  },
  methods: {
    ...mapActions({
      findOrderByPhone: 'order/findOrderByPhone'
    }),
    submit: function() {
      this.findOrderByPhone({phone: this.phoneInput})
    }
  }
};
</script>

<style scoped>
.content {
  padding-bottom: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

ul.list-inline li {
  padding: 0 5px;
}

ul.management li {
  font-size: 18px;
  color: #dd1e26;
}

.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.has-search .form-control-feedback {
  position: absolute ;
  z-index: 1;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.margin-left-right {
  margin-right: 4px;
  margin-left: 4px;
}
</style>