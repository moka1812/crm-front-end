<template>
<div>
    <div class="contract-notes">
        <v-layout align-start justify-start column>
            <span v-for="item in notesListResult" :key="item.note_id">
                {{item.create_data}} &nbsp;-&nbsp; {{item.note}}
            </span>
        </v-layout>
    </div>
    <v-flex xs12 sm12 md12>
        <v-text-field
            v-on:keyup="addNote"
            v-model="text_note"
            label="Enter notes here..."
            outline
            class='toggle'></v-text-field>
    </v-flex>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: "contract-notes-tab",
  components: {
  },
  data() {
    return {
      notesListResult: [
                {
                  note_id: 1,
                  create_data: '2019:03:04',
                  note:'Laptop abc xyz'
                },
                {
                  note_id: 2,
                  create_data: '2019:03:04',
                  note:'Laptop abc xyz'
                },
                {
                  note_id: 3,
                  create_data: '2019:03:04',
                  note:'Laptop abc xyz'
                }
      ],
      notesListRequest: false,
      text_note: "",
    }
  },
  mounted() {
  },
  methods: {
    addNote: function(e) {
        if (e.keyCode === 13) {
          const note_id = this.notesListResult.length + 1;
          this.notesListResult.push(
            {
              note_id: note_id,
              create_data: this.formatDate(new Date()),
              note: this.text_note
            }
          );
          this.text_note="";
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
  padding: 2vw 1vw 2vw 1vw;
  border: 1px solid #9D9D9D;
  border-radius: 2px;
}

.contract-notes span {
  margin-bottom: 5px;
}
</style>
