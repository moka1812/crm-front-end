<template>
  <div class ="contract-document">
      <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
        <v-spacer></v-spacer>
        <v-layout align-center justify-end row>
          <v-btn round class="btn-upload" :to="{ name: 'abc' }">
            <i class="material-icons">cloud_upload</i>
            Upload
          </v-btn>
      </v-layout>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="documentListResult"
      :loading="documentListRequest"
      item-key="original"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content display-document-edit">
            <span>{{ props.item.documnet }}</span>
            <v-btn class="btn-edit">
              <i class="material-icons">mode_edit</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">{{ props.item.uploader }}</td>
          <td class="text-xs-center content ">{{ props.item.create_date }}</td>
          <td class="text-xs-center content">{{ props.item.last_update }}</td>
          <td class="text-xs-center content" >
            <v-btn class="btn-view">
              <i class="material-icons">visibility</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">
            <v-btn class="btn-download">
              <i class="material-icons">file_download</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">
            <v-btn class="btn-download">
              <i class="material-icons">delete</i>
            </v-btn>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
  </div>
</template>

<script>

export default {
  name: "contract-document-tab",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "Documnet", value: "documnet", align: 'left', sortable: false, class: "header"
        },
        {
          text: "Uploader", value: "uploader", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Create Date", value: "create_date", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Last Update", value: "last_update", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "View", value: "view", align: 'center', sortable: false, class: "header  hard-width-3vw"
        },
        {
          text: "Download", value: "download", align: 'center', sortable: false, class: "header  hard-width-3vw"
        },
        {
          text: "Delete", value: "delete", align: 'center', sortable: false, class: "header hard-width-3vw"
        }
      ],
      documentListResult: [
                {
                    documnet: 'Document document document  1',
                    uploader:'Admin Admin Admin Admin',
                    create_date: '2019/03/01',
                    last_update: '2019/03/02'
                },
                {
                    documnet: 'Document document  document  2',
                    uploader:'Admin Admin Admin Admin',
                    create_date: '2019/03/11',
                    last_update: '2019/03/12'
                },
                {
                    documnet: 'Document document  document  3',
                    uploader:'Admin Admin Admin Admin',
                    create_date: '2019/03/24',
                    last_update: '2019/03/26'
                }
      ],
      documentListRequest: false,
    }
  },
  mounted() {
  },
  methods: {
    onEnter: function() {
       alert('on enter event');
    }
  },
}
</script>

<style>
.contract-document .v-toolbar{
  margin: 0px !important;
}
table.v-table tbody td:first-child,
table.v-table tbody td:not(:first-child),
table.v-table tbody th:first-child,
table.v-table tbody th:not(:first-child),
table.v-table thead td:first-child,
table.v-table thead td:not(:first-child),
table.v-table thead th:first-child,
table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}

.display-document-edit {
  display: inline-flex !important;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.display-document-edit span {
  margin-right: 7px;
  margin-left: 5px;
}

.btn-edit, .btn-view, .btn-download, .btn-delete {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 1vw !important;
}

.btn-upload i {
  margin-right: 3px;
}
.btn-upload {
  background-color: #2589BD !important;
  padding: 1px;
  font-size: 1vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

td.content {
  font-size: 1vw !important;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #ebecec;
}

.hard-width-3vw {
  width: 3vw !important;;
}
</style>
