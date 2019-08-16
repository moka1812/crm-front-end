<template>
  <v-layout justify-center class="call-content">
    <div class="button">
      <v-btn fab dark small class="mx-2" :class="classCSS" @click.stop="dialog = true">
        <i class="material-icons">call</i>
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="300"
      class="dialog-content"
    >
      <v-card>
        <v-card-title class="headline">Chọn số điện thoại để gọi cho khách hàng</v-card-title>

        <v-layout align-center justify-center column class="call-info">
          <v-layout align-center justify-center row>
            <div>
              <span>Số điện thoại 1:</span><br>
              <strong>{{phoneNumber1}}</strong>
            </div>
            <div class="button">
              <v-btn fab dark small class="mx-1 btn-call">
                <i class="material-icons">call</i>
              </v-btn>
            </div>
          </v-layout>
          <div class="class-border" style="max-width: 200px;"></div>
          <v-layout align-center justify-center row>
            <div>
              <span>Số điện thoại 2:</span><br>
              <strong>{{phoneNumber2}}</strong>
            </div>
            <div class="button">
              <v-btn fab dark small class="mx-1 btn-call">
                <i class="material-icons">call</i>
              </v-btn>
            </div>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "reminder-call-dialog",
  components: {
  },
  data () {
    return {
      dialog: false,
      classCSS:'btn-call-reminder',
    }
  },
  props: {
    flagCustomer: String,
    phoneNumber1: String,
    phoneNumber2: String,
  },
  created() {
    this.createCss();
  },
  methods : {
    createCss() {
      if (this.flagCustomer==='customer') {
        this.classCSS = 'btn-call-customer'
      }
    }
  }
}
</script>
<style>
.button button {
  margin-right: 5px;
  font-size: 0.7vw !important;
}

.button .btn-call {
  background-color: #C2E6FD!important;
  color: #0197F6!important;
}

.button .btn-call-reminder {
  background-color: #C2E6FD!important;
  color: #0197F6!important;
}

.button .btn-call-customer {
  background-color: #FFFFFF!important;
  color: #DD1E26!important;
}

.call-content {
  max-width: 65px!important;
  font-size: 1vw;
}

.call-content .dialog-content {
  margin: 0px!important;
}

.headline {
  text-align: center;
}
.call-info {
  padding-bottom: 20px;
}
.call-info span {
  color: #A5A5A7;
}
.call-content .class-border {
  border: 1px solid #BFBFBF;
  margin: 10px 20px;
}
</style>