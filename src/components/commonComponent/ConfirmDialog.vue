<template>
  <v-dialog v-model="showDialog" persistent max-width="290">
    <v-card class="confirm-dialog">
      <v-card-title class="title">Thông Báo</v-card-title>
      <v-card-text class="text">{{this.textConfirm}}</v-card-text>
      <v-layout align-center justify-space-around row>
        <v-btn class="btn-cancel" round text @click="onChangeConffirm(false)">Hủy</v-btn>
        <v-btn class="btn-agree" round text @click="onChangeConffirm(true)">Đồng Ý</v-btn>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "confirm-dialog",
  components: {
  },
  props: {
    textConfirm: String,
    showDialog: Boolean,
  },
  methods: {
    onChangeConffirm: function(flag) {
      this.$emit('callBackFunction', flag);
    },
  },
}
</script>
<style scope>
.confirm-dialog .btn-cancel{
  background-color: #FFFFFF !important;
  color: #DD1E26 !important;
}

.confirm-dialog .btn-agree{
  background-color: #DD1E26 !important;
  color: #FFFFFF !important;
}

.confirm-dialog .text {
  font-size: 17px!important;
}

.confirm-dialog {
  padding-bottom: 15px;
}
</style>