<template>
    <v-menu offset-y 
        nudge-left="120"
        :nudge-width="200"
        nudge-bottom="14"
    >
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>notifications</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-list>
            <v-list-tile-title><center style="font-size: 20px;">Notifications</center></v-list-tile-title>
            <hr style="margin-bottom: 0px"/>
            <v-list-tile-title><center><font color="red">See all</font></center></v-list-tile-title>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: "notification-menu",
}
</script>

<style>

</style>

