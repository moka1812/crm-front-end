<template>
<div>
    <div class="contract-notes">
        <v-layout align-start justify-start column>
            <span v-for="item in notesListResult" :key="item.create_data">
                {{item.create_data}} &nbsp;-&nbsp; {{item.note}}
            </span>
        </v-layout>
    </div>
    <v-flex xs12 sm12 md12>
        <v-text-field
            v-on:keyup="addNote"
            label="Enter notes here..."
            outlined
            class='toggle'></v-text-field>
    </v-flex>
</div>
</template>

<script>

export default {
  name: "contract-notes-tab",
  components: {
  },
  data() {
    return {
      notesListResult: [
                {
                    create_data: '2019:03:04',
                    note:'Laptop abc xyz'
                },
                {
                    create_data: '2019:03:04',
                    note:'Laptop abc xyz'
                },
                {
                    create_data: '2019:03:04',
                    note:'Laptop abc xyz'
                }
      ],
      notesListRequest: false,
    }
  },
  mounted() {
  },
  methods: {
    addNote: function(e) {
        if (e.keyCode === 13) {
            notesListResult.push(
                {
                    create_data: '2019:03:04',
                    note:'Laptop abc xyz'
                }
            );
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
