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
export default {
    name: "waiting-button",
    data() {
        return {
            items: [
                { title: 'Contracted Started' },
                { title: 'No Pick-up' },
                { title: 'No Show' },
                { title: 'Waiting for information' },
                { title: 'Considering' }
            ]
        }
    }
}
</script>

<style scoped>

</style>