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

export default {
    name: "contact-button",
    props: {
      stages: Array,
    },
    data() {
        return {
          items: this.stages
        }
    }
}
</script>

<style scoped>

</style>
