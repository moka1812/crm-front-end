<template>
  <div class="text-center">
    <v-layout wrap class="customer-items">
        <v-flex xs12 sm12 md6 lg6 xl6 v-for="(item, index) in items" :key="item.customerId">
          <v-card class="customer-item" :class="index%2===0?'margin-right':''" v-if="showData(index)">
            <v-layout align-start justify-start column>
              <div class="button">
                <v-btn class="btn-edit" @click="detail(item.customerId)">
                  <i class="material-icons">mode_edit</i>
                </v-btn>
              </div>
              <v-layout align-start justify-start row fill-height style="width:100%;">
                <v-flex xs2 class="avatar-box">
                  <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
                </v-flex>
                <v-flex xs10>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div class="customer-title-name">
                            <i class="material-icons" :class="getClassStatus(item.status, item.matures_date)">fiber_manual_record</i>
                            <strong style="margin-right:2px;">{{item.customerName}}</strong>
                            <span>(#{{item.customerId}})</span>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><span>CMND/HC:{{item.externalId}}</span></td>
                        <td><span>Chi nhánh:{{item.office}}</span></td>
                      </tr>
                      <tr>
                        <td><span>Liên hệ:{{item.lastContact}}</span></td>
                        <td><span>HĐ mở:{{item.activeLoan}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </v-flex>
              </v-layout>
              <div class="class-border"></div>
              <v-layout align-center justify-center row class="button">
                  <v-btn class="btn-call">
                    <i class="material-icons">call</i>
                  </v-btn>
                  <v-btn class="btn-mail">
                    <i class="material-icons">mail_outline</i>
                  </v-btn>
                  <v-btn class="btn-zalo">
                    <img src="../../assets/icon-zalo-24.png">
                  </v-btn>
                  <v-btn class="btn-facebook">
                    <img src="../../assets/icon-fb-24.png">
                  </v-btn>
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
    </v-layout>
    <v-layout align-end justify-end row class="paging">
      <v-pagination v-model="curentPage"
                    :length="totalPage" 
                    :color="'#DD1E26'"
                    :total-visible="5"></v-pagination>
    </v-layout>
  </div>
</template>
<script>
import moment from 'moment'
import {isNullOrUndefined} from 'util'
export default {
  name: "customer-page",
  components: {},
  data: function() {
    return {
      curentPage: 1,
      rowOfPage: 6,
      totalPage: 0,
      items: [],
      classStatusCustomer: "online-status-customer",
    };
  },
  watch: {
    pagination: {
      handler: 'getListCustomers',
      immediate: true
    }
  },
  methods: {
    showData(row) {
      const lastRowNumber = this.curentPage * this.rowOfPage - 1;
      const firstRowNumber = lastRowNumber - this.rowOfPage + 1;
      if (row >= firstRowNumber && row <= lastRowNumber) {
        return true;
      }
      return false;
    },
    getTotalPage(totalRows) {
      return Math.ceil(totalRows/this.rowOfPage);
    },
    getClassStatus(status, matures_date){
      if (status==='Active') {
        if (this.isOverdue(matures_date)===true) {
          return 'overdue-status';
        }
        return 'active-status';
      } else if (status==='Waiting') {
        return 'waiting-status';
      } else if (status==='Closed') {
        return 'close-status';
      }
    },
    isOverdue(matures_date) {
      if (isNullOrUndefined (matures_date) === false &&  matures_date !== "") {
          try {
            const matures_date_tmp = new moment(matures_date, "YYYY-MM-DD[T]HH:mm");
            if (matures_date_tmp.isValid() === true) {
              const overdueDate = matures_date_tmp.toDate();
              const currentDate = new Date();
              if (overdueDate - currentDate < 0) {
                return true;
              }
            }
          } catch(e) {
            console.log('Exception: ', e);
            return false;
          }
      }
      return false;
    },
    getListCustomers() {
      this.items = [
        {customerId:'id1',customerName:'Name1',externalId:'CMND1',status:'Active',office:'TML',lastContact:'8/1/2019',matures_date:'2019-11-11T16:01:14.117509+07:00',activeLoan:'1'},
        {customerId:'id2',customerName:'Name2',externalId:'CMND2',status:'Waiting',office:'TML',lastContact:'8/2/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'2'},
        {customerId:'id3',customerName:'Name3',externalId:'CMND3',status:'Closed',office:'TML',lastContact:'8/3/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'3'},
        {customerId:'id4',customerName:'Name4',externalId:'CMND4',status:'Active',office:'TML',lastContact:'8/4/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'4'},
        {customerId:'id5',customerName:'Name5',externalId:'CMND5',status:'Active',office:'TML',lastContact:'8/5/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'5'},
        {customerId:'id6',customerName:'Name6',externalId:'CMND6',status:'Closed',office:'TML',lastContact:'8/6/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'6'},
        {customerId:'id7',customerName:'Name7',externalId:'CMND7',status:'Active',office:'TML',lastContact:'8/7/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'7'},
        {customerId:'id8',customerName:'Name8',externalId:'CMND8',status:'Active',office:'TML',lastContact:'8/8/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'8'},
        {customerId:'id9',customerName:'Name9',externalId:'CMND9',status:'Active',office:'TML',lastContact:'8/9/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'9'},
        {customerId:'id10',customerName:'Name10',externalId:'CMND10',status:'Active',office:'TML',lastContact:'8/10/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'10'},
        {customerId:'id11',customerName:'Name11',externalId:'CMND11',status:'Active',office:'TML',lastContact:'8/11/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'11'},
        {customerId:'id12',customerName:'Name12',externalId:'CMND12',status:'Active',office:'TML',lastContact:'8/12/2019',matures_date:null,activeLoan:'12'},
        {customerId:'id13',customerName:'Name13',externalId:'CMND13',status:'Active',office:'TML',lastContact:'8/13/2019',matures_date:'',activeLoan:'13'},
        {customerId:'id14',customerName:'Name14',externalId:'CMND14',status:'Active',office:'TML',lastContact:'8/14/2019',matures_date:'abc',activeLoan:'14'},
        {customerId:'id15',customerName:'Name15',externalId:'CMND15',status:'Active',office:'TML',lastContact:'8/15/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'15'},
        {customerId:'id16',customerName:'Name16',externalId:'CMND16',status:'Active',office:'TML',lastContact:'8/16/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'16'},
        {customerId:'id17',customerName:'Name17',externalId:'CMND17',status:'Active',office:'TML',lastContact:'8/17/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'17'},
        {customerId:'id18',customerName:'Name18',externalId:'CMND18',status:'Active',office:'TML',lastContact:'8/18/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'18'},
        {customerId:'id19',customerName:'Name19',externalId:'CMND19',status:'Active',office:'TML',lastContact:'8/19/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'19'},
        {customerId:'id20',customerName:'Name20',externalId:'CMND20',status:'Active',office:'TML',lastContact:'8/20/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'20'},
        {customerId:'id21',customerName:'Name21',externalId:'CMND21',status:'Active',office:'TML',lastContact:'8/21/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'21'},
        {customerId:'id22',customerName:'Name22',externalId:'CMND22',status:'Active',office:'TML',lastContact:'8/22/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'22'},
        {customerId:'id23',customerName:'Name23',externalId:'CMND23',status:'Active',office:'TML',lastContact:'8/23/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'23'},
        {customerId:'id24',customerName:'Name24',externalId:'CMND24',status:'Active',office:'TML',lastContact:'8/24/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'24'},
        {customerId:'id25',customerName:'Name25',externalId:'CMND25',status:'Active',office:'TML',lastContact:'8/25/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'25'},
        {customerId:'id26',customerName:'Name26',externalId:'CMND26',status:'Active',office:'TML',lastContact:'8/26/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'26'},
        {customerId:'id27',customerName:'Name27',externalId:'CMND27',status:'Active',office:'TML',lastContact:'8/27/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'27'},
        {customerId:'id28',customerName:'Name28',externalId:'CMND28',status:'Active',office:'TML',lastContact:'8/28/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'28'},
        {customerId:'id29',customerName:'Name29',externalId:'CMND29',status:'Active',office:'TML',lastContact:'8/29/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'29'},
        {customerId:'id30',customerName:'Name30',externalId:'CMND30',status:'Active',office:'TML',lastContact:'8/30/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'30'},
        {customerId:'id31',customerName:'Name31',externalId:'CMND31',status:'Active',office:'TML',lastContact:'8/31/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'31'},
        {customerId:'id32',customerName:'Name32',externalId:'CMND32',status:'Active',office:'TML',lastContact:'9/1/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'32'},
        {customerId:'id33',customerName:'Name33',externalId:'CMND33',status:'Active',office:'TML',lastContact:'9/2/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'33'},
        {customerId:'id34',customerName:'Name34',externalId:'CMND34',status:'Active',office:'TML',lastContact:'9/3/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'34'},
        {customerId:'id35',customerName:'Name35',externalId:'CMND35',status:'Active',office:'TML',lastContact:'9/4/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'35'},
        {customerId:'id36',customerName:'Name36',externalId:'CMND36',status:'Active',office:'TML',lastContact:'9/5/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'36'},
        {customerId:'id37',customerName:'Name37',externalId:'CMND37',status:'Active',office:'TML',lastContact:'9/6/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'37'},
        {customerId:'id38',customerName:'Name38',externalId:'CMND38',status:'Active',office:'TML',lastContact:'9/7/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'38'},
        {customerId:'id39',customerName:'Name39',externalId:'CMND39',status:'Active',office:'TML',lastContact:'9/8/2019',matures_date:'2019-08-11T16:01:14.117509+07:00',activeLoan:'39'},
      ];
      this.totalPage = this.getTotalPage(this.items.length);
    },
    detail: function (id) {
      if (isNullOrUndefined(id) === false) {
        this.$router.push({path: '/customers/customer-detail', query: {id: id}});
      }
    }
  }
};
</script>
<style>
.customer-items .customer-item {
  margin-top: 15px;
  padding: 0px 10px 10px 10px;
}

@media (max-width: 970px) { 
  .customer-items .margin-right,
  .customer-items .margin-right {
    margin-right: 0px;
  } 
}

@media (min-width: 970px) { 
  .customer-items .margin-right,
  .customer-items .margin-right {
    margin-right: 15px;
  }
}

.customer-item .button {
  margin-top: 5px;
  text-align: right;
  width: 100%;
}

.customer-item .button button {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
}

.customer-item .button .btn-edit {
  color: #A4AFB7 !important;
  height: auto !important;
}

.customer-item .button .btn-edit i {
  font-size: 1.2vw !important;
  font-weight: bold !important;
}

.customer-item .button .btn-call, 
.customer-item .button .btn-mail,
.customer-item .button .btn-zalo,
.customer-item .button .btn-facebook {
  color: #A4AFB7 !important;
  height: auto !important;
  margin-right: 3vw !important;
}

.customer-item .customer-title-name {
  display: inline-flex;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.customer-item .customer-title-name i {
  font-size: 1.5vw !important;
}

.customer-item .avatar-box {
  vertical-align: middle;
  align-items: center;
  min-width: 6vw !important;
  min-height: 6vw !important;
}
.customer-item .avatar-img {
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  min-width: 60px;
  min-height: 60px;
}

.paging {
  margin-top: 15px;
}

.active-status {
  color: #00FF5F;
}

.waiting-status {
  color: #F6AC3B;
}

.close-status {
  color: #CECFD0;
}

.overdue-status {
  color: #DD1E26;
}

.customer-item .class-border {
  border: 1px solid #F1F1F3 !important;
  width: 100%;
  margin-left: 0px;
}
</style>