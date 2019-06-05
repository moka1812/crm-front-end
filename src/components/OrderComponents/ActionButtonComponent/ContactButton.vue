<template>
    <v-menu top>
      <template v-slot:activator="{ on }">
        <v-btn flat icon v-on="on">
            <v-icon color="#f3f711">sync</v-icon>
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
  { title: stages.NOT_ELIGIBLE },
  { title: stages.NOT_IN_SERVICE_REGION },
  { title: stages.NO_PICK_UP },
  { title: stages.WINDOW_SHOPPING },
  { title: stages.UNABLE_TO_APPRAISE_LIQUIDATED },
  { title: stages.RATE_DISAGREEMENT },
  { title: stages.MONEY_FROM_DIFFERENT_CHANNEL },
  { title: stages.TERMS_DISAGREEMENT },
  { title: stages.CALL_AGAIN_LATER },
  { title: stages.WAITING_FOR_MORE_INFO },
  { title: stages.WRONG_INFO },
]

export default {
    name: "contact-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>
