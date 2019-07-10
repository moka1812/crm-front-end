<template>
    <notifications id="new-notification" group="new-notification" position="bottom right" animation-type="velocity" width="200px">
        <template slot="body" slot-scope="props">
          <div @click="NewNotificationHandle(props.item.title, props.item.text.id, props.close)">
               <div
                  :class="['vue-notification-template', 'vue-notification', props.item.type]"
                >
                <div
                  v-if="props.item.title"
                  class="notification-title"
                >
                  Order #{{props.item.title}}
                  <p id="off" @click.stop="props.close">
                    x
                  </p>
                </div>
                <div
                  class="notification-content"
                  v-html="props.item.text.message"
                >
                </div>
               </div>
          </div>
        </template>
    </notifications>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "new-notification",
    methods: {
    ...mapActions({
      getOrderDetailFromNotification: 'order/getOrderDetailFromNotification',
      readNotification: 'notification/readNotification',
    }),
    NewNotificationHandle: async function(orderID, NotificationID, close) {
      this.getOrderDetailFromNotification({id: orderID})
      this.readNotification({id: NotificationID})
      close()
    }
  }
}
</script>

<style scoped>
#off {
  float: right;
  cursor:pointer;
}
</style>
