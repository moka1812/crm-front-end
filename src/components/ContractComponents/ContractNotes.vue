<template>
<div>
    <div class="contract-notes">
        <textarea :value="notes" disabled rows="10" style="width:100%;height:100%;"></textarea>
    </div>
    <v-flex xs12 sm12 md12 class="border-text">
        <v-text-field
            v-on:keyup.enter="onEnterNote"
            v-model="text_note"
            label="Nhập ghi chú..."
            outline></v-text-field>
    </v-flex>
    <confirm-dialog 
        :textConfirm="textConfirm" 
        :showDialog="showDialog" 
        @callBackFunction="addNote($event)"/>
</div>
</template>

<script>
import ConfirmDialog from '../commonComponent/ConfirmDialog.vue'
import moment from 'moment';
import {mapActions, mapGetters} from 'vuex'
import { isNullOrUndefined } from 'util';

export default {
  name: "contract-notes-tab",
  components: { 
    ConfirmDialog
  },
  props: {
    contractId: String,
  },
  created() {
    this.getNote();
  },
  computed: {
    ...mapGetters({
      userLogin: 'auth/name',
      contractDetail: 'contract/contractDetail',
    })
  },
  data() {
    return {
      notes: "",
      text_note: "",
      textConfirm: "Xác nhận cập nhật ghi chú?",
      showDialog: false
    }
  },
  watch: {
    loadNote() {
      this.getNote()
    },
  },
  methods: {
    ...mapActions({
      getContractByContractId: 'contract/getContractByContractId',
      updateNote: "contract/updateNote",
    }),
    getNote:async function(){
      await this.getContractByContractId({id: this.contractId});
      if (isNullOrUndefined(this.contractDetail) === false &&
          isNullOrUndefined(this.contractDetail.note) === false) {
        this.notes = this.contractDetail.note;
      }
    },
    onEnterNote: function() {
      this.text_note = this.text_note.trim();
      if (this.text_note != "") {
        this.showDialog=true;
      }
    },
    addNote: async function(flag) {
      this.showDialog=false;
      if (flag === true) {
        if (this.text_note != "") {
          this.getNote();
          if (this.notes!=="") {
            this.notes = this.notes.concat("\r\n");
          }
          this.notes = this.notes.concat(this.userLogin)
                          .concat(" - ")
                          .concat(this.formatDate(new Date()))
                          .concat(" - ")
                          .concat(this.text_note);
          this.text_note="";
          await this.updateNote({id : this.contractId, data: {note: this.notes}});
          this.notes = "";
          this.getNote();
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
