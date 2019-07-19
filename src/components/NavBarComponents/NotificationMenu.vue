<template>
    <v-menu offset-y 
        nudge-left="120"
        :nudge-width="200"
        nudge-bottom="14"
    >
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="getNotification()">
                <v-icon>notifications</v-icon>
            </v-btn>
            <v-badge v-show="count != null && count > 0" overlap color="#FFA500" :style="{'margin-top':'20px', 'margin-right':'10px'}">
                <template v-slot:badge>
                    {{count}}
                </template>
            </v-badge>
        </template>
        <v-card>
            <v-list>
            <v-list-tile-title><center style="font-size: 20px;">Notifications</center></v-list-tile-title>
            <hr style="margin-bottom: 0px"/>
            <v-list two-line class="notificationList">
                <template v-for="(notification, index) in notifications"
                >
                    <v-list-tile
                        id="notification"
                        :key="index"
                        @click="click(index)"
                    >
                        <v-list-tile-content :class="{active : notification.readable == false}" :style="{'padding-left': '10px'}">
                            <v-list-tile-title>Order #{{notification.order}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{notification.message}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <hr class="no-margin" :key="`divider-${index}`"/>
                </template>
            </v-list>
            <v-list-tile-title><center><font color="red">See all</font></center></v-list-tile-title>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { setInterval, clearInterval } from 'timers';

export default {
    name: "notification-menu",
    data() {
        return {
            schedule: null
        }
    },
    mounted(){
        this.schedule = setInterval(this.getNewNotification, 1000)
    },
    computed: {
        ...mapGetters({
            newNotificationResult: 'notification/newNotificationResult',
            notificationResult: 'notification/notificationResult',
        }),
        count() {
            return this.newNotificationResult.length
        },
        notifications() {
            return this.notificationResult.slice(0, 5)
        }
    },
    methods: {
        ...mapActions({
            getNewNotification: 'notification/getNewNotification',
            getNotification: 'notification/getNotification',
            readNotification: 'notification/readNotification',
            getOrderDetailFromNotification: 'order/getOrderDetailFromNotification'
        }),
        click(index) {
            const orderID = this.notificationResult[index].order
            this.getOrderDetailFromNotification({id: orderID})
            const NotificationID = this.notificationResult[index].id
            this.readNotification({id: NotificationID})
        }
    },
    beforeDestroy() {
        clearInterval(this.schedule)
    }
}
</script>

<style scoped>
.notificationList {
    padding-top: 0px;
    padding-bottom: 0px;
}
.no-margin {
    margin-top: 0px;
    margin-bottom: 0px
}
.active {
    background-color: #e5e5e5; 
}
hr {
    border-color: #d1d1d1
}
</style>

<style>
#notification {
    padding: 0px 0px;
}
</style>
