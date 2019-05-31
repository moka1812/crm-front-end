<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn round v-on="on" class="new-order">
        <div class="back-white plus">
          <i class="fas fa-plus"></i>
        </div>
            New order
      </v-btn>
    </template>
    <v-card>
      <order-form type='new' @ok="okHandle" @cancle="cancleHandle"/>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import OrderForm from "@/components/OrderComponents/OrderForm.vue";

export default {
  name: "new-order",
  components: {
    OrderForm
  },
  data(){
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      orderCreatingErrorCode: 'order/orderCreatingErrorCode',
    })
  },
  methods: {
    ...mapActions({
        createOrder: 'order/createOrder',
    }),
    //Create new order
    okHandle: function(data) {
      this.createOrder(data).then(() => {
        //Create New Order Successfully, Close Dialog
        if (this.orderCreatingErrorCode == 201) {
          this.dialog = false
        }
      })
    },

    cancleHandle: function() {
      this.dialog = false
    },
  }
}
</script>

<style scoped>
.new-order {
  background-color: #dd1e26 !important;
  color: #fff !important;
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

.plus {
  background-color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 5px;
}

.plus i {
  color: #dd1e26;
  font-size: 10px;
  padding: 8px;
}
</style>