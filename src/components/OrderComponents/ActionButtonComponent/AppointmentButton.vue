<template>
    <v-menu top>
      <template v-slot:activator="{ on }">
       <v-btn flat icon v-on="on">
            <v-icon color="#70cc3b">check_circle_outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click=""
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
import stages from './stages'

const stageItems = [
  { title: stages.NO_PICK_UP.vi },
  { title: stages.NO_SHOW.vi },
  { title: stages.MONEY_FROM_DIFFERENT_CHANNEL.vi },
  { title: stages.CALL_AGAIN_LATER.vi },
  { title: stages.CONSIDERING.vi },
  { title: stages.APPOINTMENT_1.vi },
  { title: stages.APPOINTMENT_2.vi },
  { title: stages.APPOINTMENT_3.vi },
  { title: stages.APPOINTMENT_4.vi },
  { tile:  stages.CUSTOMER_PENDING.vi },
]

export default {
    name: "appointment-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>
