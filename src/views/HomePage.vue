<template>
  <v-container fluid >
    <SideBar/>
    <NavBar />
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <branch-dialog/>
    <dialog-box/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import SideBar from "@/components/SideBarComponents/SideBar.vue"
import NavBar from "@/components/NavBarComponents/NavBar.vue"
import DialogBox from "@/components/CallComponents/DialogBox.vue"
import BranchDialog from "@/components/BranchDialogComponents/BranchDialog.vue"

export default {
  name: "homepage",
  components: {
    SideBar,
    NavBar,
    DialogBox,
    BranchDialog
  },
};
</script>

<style>
/* Padding item in v-select */
.v-select-list > .v-list__tile__content {
  padding-left: 20px;
}
</style>