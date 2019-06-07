<template>
    <v-menu top min-width="150px">
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
  { title: stages.WINDOW_SHOPPING.vi },
  { title: stages.DUPLICATE.vi },
  { title: stages.SPAM.vi },
  { title: stages.ORDER_CLAIMED.vi },
]

export default {
    name: "waiting-button",
    data() {
        return {
          items: stageItems
        }
    }
}
</script>

<style scoped>

</style>