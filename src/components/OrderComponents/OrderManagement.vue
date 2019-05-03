<template>
  <v-container fluid class="content">
      <v-layout row>
        <v-flex md7 xs12>
            <h3>Order Management</h3>
            <ul class="list-inline management">
                <li class="list-inline-item">Unclaimed: {{unclaimed}}</li>
                <li class="list-inline-item">Pending: {{pending}}</li>
                <li class="list-inline-item">Contacted: {{contacted}}</li>
                <li class="list-inline-item">Quoted: {{quoted}}</li>
                <li class="list-inline-item">Waiting: {{waiting}}</li>
            </ul>
        </v-flex>

        <v-flex md5 xs12>
          <v-container fluid>
            <v-layout
              align-center
              justify-end
            >
              <div class="has-search mr-1">
                <span class="fa fa-search form-control-feedback"></span>
                <input style="width: 200px" type="text" class="form-control"
                    placeholder="Input Case ID">
              </div>

              <div class="back-red mr-1">
                <i class="far fa-clock"></i>
              </div>

              <div class="back-white mr-1">
                <i class="far fa-folder-open"></i>
              </div>

              <order-filter class="mr-1"/>
              
              <new-order/>
            </v-layout> 
          </v-container>
            <!-- <ul class="list-inline right">
                <li>
                    <div class="has-search">
                        <span class="fa fa-search form-control-feedback"></span>
                        <input style="width: 165px" type="text" class="form-control"
                            placeholder="Input Case ID">
                    </div>
                </li>
                <li>
                    <div class="back-red">
                        <i class="far fa-clock"></i>
                    </div>
                </li>
                <li>
                    <div class="back-white">
                        <i class="far fa-folder-open"></i>
                    </div>
                </li>
                <li>
                    <order-filter/>
                </li>
                <li>
                    <new-order/>
                </li>
            </ul> -->
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import NewOrder from "@/components/OrderComponents/NewOrder.vue";
import OrderFilter from "@/components/OrderComponents/OrderFilter.vue";


export default {
  name: "order-management",
  components: {
    NewOrder,
    OrderFilter
  },
  data() {
    return {
      unclaimed: 3,
      pending: 2,
      contacted: 1,
      quoted: 3,
      waiting: 2,
    }
  },
  methods: {
    new_order: function (event) {
      this.$router.push({ name: 'new_order'})
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
  font-size: 15px;
  color: #dd1e26;
}

.has-search .form-control {
  padding-left: 2.375rem;
  width: 300px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
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

.back-red {
  background-color: #dd1e26;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.back-red i {
  color: #fff; 
  font-size: 25px;
  padding: 10px;
}

.back-white {
  background-color: #fff;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.back-white i {
  color: #dd1e26; 
  font-size: 25px;
  padding: 10px;
}

.new-order {
  width: 140px;
  border-radius: 25px;
  padding: 6px;
  cursor:pointer;
}

.new-order:hover {
  background-color: #c91414;
  box-shadow: 0px 3px 5px 0px #898585;
}

.new-order span {
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  padding: inherit;
}
</style>