<template>
    <v-menu top>
      <template v-slot:activator="{ on }">
        <v-btn flat icon v-on="on">
            <v-icon color="#70cc3b">reply</v-icon>
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
  { title: stages.DUPLICATE },
  { title: stages.SPAM },
  { title: stages.UNCLAIMED },
]

export default {
    name: "unclaimed-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>
