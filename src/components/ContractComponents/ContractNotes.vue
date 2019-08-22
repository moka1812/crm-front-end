<template>
<div>
    <div class="contract-notes">
        <textarea :value="notes" disabled rows="10" style="width:100%;height:100%;"></textarea>
    </div>
    <v-flex xs12 sm12 md12 class="border-text">
        <v-text-field
            v-on:keyup="addNote"
            v-model="text_note"
            label="Nhập ghi chú..."
            outline></v-text-field>
    </v-flex>
</div>
</template>

<script>
import moment from 'moment';
import {mapGetters} from 'vuex'

export default {
  name: "contract-notes-tab",
  components: {
  },
  props: {
    contractId: String,
  },
  computed: {
    ...mapGetters({
      userLogin: 'auth/name'
    })
  },
  data() {
    return {
      notes: "",
      text_note: "",
    }
  },
  mounted() {
  },
  methods: {
    addNote: function(e) {
      if (e.keyCode === 13) {
        this.text_note = this.text_note.trim();
        if (this.text_note != "") {
          if (this.notes!=="") {
            this.notes = this.notes.concat("\r\n");
          }
          this.notes = this.notes.concat(this.userLogin)
                          .concat(" - ")
                          .concat(this.formatDate(new Date()))
                          .concat(" - ")
                          .concat(this.text_note);
          this.text_note="";
        }
      }
    },
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('YYYY:MM:DD hh:mm');
      }
    }
  },
}
</script>

<style>
.contract-notes {
  margin-top: 15px;
  padding: 0 1vw 0 1vw;
  border: 1px solid #9D9D9D;
  border-radius: 2px;
  height: 50vh;
}

.contract-notes span {
  margin-bottom: 5px;
}

.border-text .v-input__slot {
  border: 1px solid #000000 !important;
}
.border-text .v-input__slot:hover, .border-text .v-input__slot::before {
  border: 1px solid #2D80D4 !important;
}
</style>
