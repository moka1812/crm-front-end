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
  { title: stages.NOT_ELIGIBLE },
  { title: stages.RATE_DISAGREEMENT },
  { title: stages.TERMS_DISAGREEMENT },
  { title: stages.FRAUD },
  { title: stages.ACTIVE_CONTRACT },
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
