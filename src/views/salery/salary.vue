<template>
  <div>
    <div  class="payList">
      <div class="border-bottom navbar_sticky">
        <router-link to="/salaryPay">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
              </svg>
              Вернуться к Зарплата</h5>
        </router-link>
      </div>



      <div class="p-4">
        <div class="row">
          <div class="col-4">
          <!-- <div class="d-flex">
              <lineSelect
              :options="allGroups.rows"
              @select="selectgroup"
              :selected="group_name"
              :label="$t('groups')"
            />
          
          </div> -->
          </div>
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <div class="row w-100">
            <div class="col-4">
              <div class="d-flex justify-content-start align-items-center pt-1">
                <input-icon style="width: 100%; height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_here')" ></input-icon>
                <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px; width:80px" color="info"  @click="searchClick()" 
                  size="sm">{{$t('search')}}
                </mdb-btn>
              </div>
            </div>
            <div class="col-2 d-flex justify-content-start align-items-center " >
              <div class="w-100">
                <month  height="30" @select="selectMonth"/>
              </div>
            </div>
            <div class="col-sm-4 col-md-3 col-lg-3">
              <div class="d-flex justify-content-start align-items-center pt-2">
                <erpSelectReg
                    :options="salaryType"  
                    @select="selectOptionReg"
                    :selected="salary_type"
                    size="sm"
                    :label="$t('company')"
                  />
                <small style="position:absolute; top:-9px; left:18px; color:#747474; font-size:11.5px;">{{$t('salary_type')}}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTablePayedInfoCheck ">
        <thead>
          <tr class="header py-3" style="background: #a9ffb4;">
            <th  width="40" class="text-left">№</th>
            <th>{{$t('teacher')}}</th>
            <th>{{$t('phone')}}</th>
            <th>{{$t('address')}}</th>
            <th>{{$t('price')}}</th>
            <th>{{$t('date')}}</th>
            <!-- <th >{{$t('lessons_cout')}}</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in clientList" :key="rowIndex" >
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.user.fio}}</span> </td>
            <td> <span >{{row.user.phone_number}}</span> </td>
            <td> <span >{{row.user.address}}</span> </td>
            <td> <span><span class="font-weight-bold text-danger">-</span> {{row.payed_summ.toFixed(2)}}</span> </td>
            <td> <span >{{row.created_date_time.slice(0,10)}}</span>  <span class="ml-2">{{row.created_date_time.slice(11,16)}}</span> </td>

            
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
            
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex justify-content-end px-3 pt-2 mt-4 border-top">
      <!-- <mdb-btn class="mr-1 py-1 px-3"  style="font-size: 10px;" color="success"  @click="submitCheck()" 
        size="sm">{{$t('add')}}</mdb-btn> -->
    </div>
   
    </div>
     <modal-train  :show="add_client_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
      @close="add_client_to_group = false" width="550px">
        <template v-slot:body>
          <addClientToGroup v-if="add_client_to_group"  @close="add_client_to_group = false" :group="group_data"/>
        </template>
    </modal-train>
      <Toast ref="message"></Toast>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import addClientToGroup from '../main/group_add_client.vue'
import month from '../../components/month.vue'
import erpSelectReg from "../../components/erpSelect.vue";

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    month,
    addClientToGroup,
    erpSelectReg
  },
  data() {
    return {
      id: this.$route.params.id,
      
      check_show: false,
      summaString: '0',
      selectSumma: 0,
      payShow: false,
      loading:false,
      clientList: [],
      ceshList: [],
      defaultList: [],
   
      group_name: '',
      group_id: null,

      search: '',
      test_show: true,
      delete_show: false,

      add_client_to_group: false,


      today_date: '',
      check_client_list: [],

      salary_type: '',
      salary_type_id: null, 
      salaryType: [
        {
          name: 'Все',
          id: 0
        },
        {
          name: 'Премия',
          id: 1
        },
        {
          name: 'Аванс',
          id: 2
        },
        {
          name: 'Зарплата',
          id: 3
        }
      ]
    }
  },
  
  async mounted() {
    let date = new Date();
    this.today_date = date.toISOString().slice(0,10);
    this.loading = true;
      this.check_client_list = [];
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazUserSalaryMonthlies/getPaginationForPayedSlaryDetailInfo?page=0&size=100');
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        if(data){
          this.check_client_list = data.items_list
          this.clientList = data.items_list
          this.defaultList = data.items_list;
          this.ceshList = this.clientList;
          // this.$refs.message.success('Added_successfully')
          this.loading = false;
        }
        
      }
      catch{
        this.loading = false;
        this.$refs.message.error('network_ne_connect')
      }
      this.loading = false;
  },
  computed: mapGetters(['allGroups', 'group_client_list']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList']),

    selectOptionReg(option){
      this.salary_type = option.name;
      this.salary_type_id = option.id;

      if(option.id == 0){
        this.clientList = this.defaultList;
      }
      else{
        this.clientList = [];
        for(let i=0; i<this.defaultList.length; i++){
          if(this.salary_type_id == this.defaultList[i].payed_for_card_summ){
            this.clientList.push(this.defaultList[i])
          }
        }
      }
    },
    // ===> send client check to base<===
    submitCheck(){
      console.log(this.check_client_list)
    },

    selectMonth(date){
      // console.log('Oxir oqibat ishladi xudoga shukur');
      // console.log(date.begin_date);
      // console.log(date.end_date);
      this.clientList = [];
      let begin_d = new Date(date.begin_date)
      let end_d = new Date(date.end_date)

      for(let i=0;i<this.check_client_list.length; i++){
        let listD = new Date(this.check_client_list[i].created_date_time)
        if(begin_d<listD && end_d>listD){
          this.clientList.push(this.check_client_list[i])
        }
      }
      this.ceshList = this.clientList;
    },
    // ===> send client <===

    searchClick(){
      this.clientList = this.ceshList;
      this.loading = true;
      console.log('ds')
      if(this.search != ''){
        let userSearchList = [];
        for(let i=0; i<this.clientList.length;i++){
          if(this.clientList[i].user.fio.toLowerCase().includes(this.search.toLowerCase())){
            userSearchList.push(this.clientList[i])
          }
        }
        this.clientList = userSearchList;
      }
      else{
        this.clientList = this.ceshList;
      }
      this.loading = false;
      
    },
   
  },
}
</script>

<style lang="scss">


.myTablePayedInfoCheck {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedInfoCheck th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedInfoCheck td{
  font-size:11.5px;
  
}
.myTablePayedInfoCheck th, .myTablePayedInfoCheck td {
  text-align: left;
  padding: 8px 10px;
}

.myTablePayedInfoCheck tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
  &:hover{
    background: #a9ffb4;
  }
}

.myTablePayedInfoCheck tr.header, .myTablePayedInfoCheck tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}


.item_circle{
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: rgb(255, 94, 94);
}
.into_circle{
  width: 12.5px;
  height: 12.5px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
.into_circle_active{
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #0fe22b ;
}


</style>