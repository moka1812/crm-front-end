<template>
  <div class="container-fluid full-height">
    <SideBar/>
    <NavBar />
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </div>
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

<style scoped>
.full-height {
  height: 100%;
}
</style>