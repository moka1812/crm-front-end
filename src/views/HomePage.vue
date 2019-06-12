<template>
  <v-container fluid >
    <SideBar/>
    <NavBar />
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/components/SideBarComponents/SideBar.vue";
import NavBar from "@/components/NavBarComponents/NavBar.vue"

export default {
  name: "homepage",
  components: {
    SideBar,
    NavBar
  }
};
</script>

<style>
/* Padding item in v-select */
.v-select-list > .v-list__tile__content {
  padding-left: 20px;
}
</style>