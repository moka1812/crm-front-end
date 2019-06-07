<template>
    <v-menu top>
      <template v-slot:activator="{ on }">
        <v-btn flat icon v-on="on">
            <v-icon color="#43425d">assignment_turned_in</v-icon>
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
  { title: stages.NOT_ELIGIBLE.vi },
  { title: stages.RATE_DISAGREEMENT.vi },
  { title: stages.TERMS_DISAGREEMENT.vi },
  { title: stages.FRAUD.vi },
  { title: stages.ACTIVE_CONTRACT.vi },
]

export default {
    name: "contract-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>
