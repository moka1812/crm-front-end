<template>
  <v-container fluid >
    <SideBar/>
    <NavBar />
    <v-content>
      <v-container fluid ma-0 pa-0 fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <order-edit/>
    <branch-dialog/>
    <incoming-box/>
    <vue-snotify/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import OrderEdit from "@/components/OrderComponents/OrderEdit.vue"
import SideBar from "@/components/SideBarComponents/SideBar.vue"
import NavBar from "@/components/NavBarComponents/NavBar.vue"
import BranchDialog from "@/components/BranchDialogComponents/BranchDialog.vue"
import IncomingBox from "@/components/CallComponents/IncomingBox.vue"

export default {
  name: "homepage",
  components: {
    SideBar,
    NavBar,
    BranchDialog,
    OrderEdit,
    IncomingBox,
  },
};
</script>


<style>
/* Padding item in v-select */
.v-select-list > .v-list__tile__content {
  padding-left: 20px;
}

.snotifyToast{
  box-shadow: rgba(0, 0, 0, 0.8) 0px 4pt 8pt;
}
</style>