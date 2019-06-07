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
  { title: stages.UNABLE_TO_APPRAISE_LIQUIDATED.vi },
  { title: stages.RATE_DISAGREEMENT.vi },
  { title: stages.MONEY_FROM_DIFFERENT_CHANNEL.vi },
  { title: stages.TERMS_DISAGREEMENT.vi },
  { title: stages.CALL_AGAIN_LATER.vi },
  { title: stages.WAITING_FOR_MORE_INFO.vi },
  { title: stages.CONSIDERING.vi },
  { title: stages.WAITING_FOR_RATE.vi },
  { title: stages.FRAUD.vi },
]

export default {
    name: "quoted-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>
