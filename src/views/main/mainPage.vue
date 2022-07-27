<template>
  <div class="bg_mainPage">
    <loader v-if="loading"/>
    <div v-else class="glavniyPage">
      <div class="navbarMenu d-flex justify-content-between  ">
        <div class="logo">
          <h5 class="logo_padding m-0 ml-2 text-white">Extre Center</h5>
        </div>
        <div class="menu d-flex pr-3">
          <a class="m-0 text-white fza logo_padding ml-3 activeItem">Регистрация</a>
          <!-- <a href="/waiter" class="m-0 text-white fza logo_padding ml-3">{{$t('waiting_client')}}</a> -->
          <a href="/kassa" class="m-0 text-white fza logo_padding ml-3">Касса</a>
          <a href="/notPayed" class="m-0 text-white fza logo_padding ml-3">Не оплаченный список</a>
          <!-- <a href="/jadval" class="m-0 text-white fza logo_padding ml-3">Расписание</a> -->
          <!-- <a href="/salaryPay"  class="m-0 text-white fza logo_padding ml-3">Бонус к зарплате</a> -->
        </div>
      </div>

      <div class="searchMenu m-3 card">
        <div class="searchMain p-2">
          <div class="row_w">
            <div class="col_5 px-2">
              <h5 class="ml-2 text_orange">Поиск клиента</h5>
              <div class="d-flex">
                  <input-search  @select="selectClient" 
                    url="/OquvMarkazClient/getPaginationByClientName?page=0&size=100&fio="
                   :option="allClient.rows" ref="search_client" icon="search"></input-search>
                  <mdb-btn color="success" type="submit" style="font-size: 10px; height: 35px; width:100px; margin:1px 4px 0 4px;" 
                    p="r2 l2 t2 b2"  @click="add_pupil =!add_pupil">{{$t('add')}}
                  </mdb-btn>
              </div>
              
            </div>
            <div class="col_4 px-2">
              <h5 class="ml-2 text_orange">Поиск учителя</h5>
              <input-search @select="selectUsers" :option="allUser.rows"  icon="user"></input-search>
            </div>
            <div class="col_3 px-2">
              <h5 class="ml-2 text_orange">Поиск урока</h5>
              <input-search-name @select="selectFans" :option="allFans.rows"  icon="scroll"></input-search-name>
            </div>
          </div>
        </div>
      </div>
      

      <div class="m-3 bg-white p-3 card">
        <mdb-tabs
          :active="0"
          default
          pills
          style="font-size:12px;"
          :transition-duration="0.5"
          transition-style="linear"
          :links="slotTemp"
          
        >
        <template slot='today_groups'>
            <day_only />
        </template>
        <template slot='today'>
            <today_client ></today_client>
        </template>
        <template slot='all_group'>
            <allgroups ></allgroups>
        </template>
        
        </mdb-tabs>
      </div>

      <!-- User orqali grouplarni jadvalini chiqarish -->
      <div class="card m-3">
        <jadval v-show="user_jadval_show" :option="user_info"/>
      </div>
      <!-- User orqali grouplarni jadvalini chiqarish -->



      <!-- Fanlar orqali grouplarni chiqarish -->
      <div class="groupSelectFans card p-3 m-3" v-if="fans_show">
        <p class="border-bottom pb-1 pl-2" style="font-size:16px; color:#804406">{{fan_name}}</p>
        <selectFanGroup :groupList="groupList"></selectFanGroup>
      </div>
      <!-- Fanlar orqali grouplarni chiqarish -->


      <modal-train  :show="add_pupil" headerbackColor="white"  titlecolor="black" :title="$t('Add_client')" 
        @close="add_pupil = false" width="70%">
          <template v-slot:body>
            <addpupil @close="add_pupil = false"></addpupil>
          </template>
      </modal-train>
      <modal-train  :show="info_pupil" headerbackColor="white"  titlecolor="black" :title="client_name" 
        @close="closeInfoUser" width="85%">
          <template v-slot:body>
            <infopupil @close="info_pupil = false" :option="client_info"></infopupil>
          </template>
      </modal-train>
      <modal-train  :show="add_client_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
      @close="add_client_to_group = false" width="500px">
        <template v-slot:body>
          <addClientToGroup v-if="add_client_to_group" @close="add_client_to_group = false" :group="group"/>
        </template>
    </modal-train>

    </div>
    <Toast ref="message"></Toast>

  </div>
  
</template>

<script>
import day_only from './day_only.vue'
import {mdbBtn, mdbIcon,  mdbCol, mdbRow, mdbTabs} from 'mdbvue'
import {mapGetters, mapActions} from 'vuex'
import addpupil from '../client/client_ad.vue'
import infopupil from '../client/client_info.vue'
import jadval from './darsJadval.vue'
import inputSearch from '../../components/inputSearch.vue'
import addClientToGroup from './group_add_client.vue'
import today_client from './today_client.vue'
import allgroups from './all_groups'
import selectFanGroup from './select_fan.vue'
export default {
  components: { inputSearch, jadval, addpupil, infopupil,day_only, addClientToGroup, today_client,allgroups, selectFanGroup,
   mdbCol, mdbRow, mdbIcon, mdbTabs, mdbBtn, mdbIcon },
  data() {
    return {
      loading: false,
      searchStudent: '',
      service_show: true,
      add_pupil: false,
      info_pupil: false,
      slotTemp: [
        { text: 'Сегодня группы', slot: 'today_groups' },
        { text: 'Сегодня студенты', slot: 'today'},
        { text: 'Все группы', slot: 'all_group' }],

      group: {},
      add_client_to_group: false,
      user_jadval_show: false,
      loading_fans: false,
      fans_show: false,

      groupList: [],
      fan_name: '',

      client_name: '',
      client_info: {},
      user_info: {},

      
      
    }
  },
  async mounted() {
    let time1 = new Date();
    this.day_time = time1.toISOString().slice(0,10); 
    let a = this.day_time + 'T00:00:00.000Z' ;
    this.loading = true;
    await this.fetch_today_groups(a);
    await this.fetch_today_groups_get_list();
    await this.fetchClient();
    await this.fetchUser();
    await this.fetchFans();
    this.loading = false;
  },
  computed: mapGetters(['allClient', 'allUser', 'allFans']),

  methods: {
    ...mapActions(['fetchClient', 'fetchUser', 'fetchFans', 'fetch_today_groups', 'fetch_today_groups_get_list']),
    selectClient(data){
      this.client_info = data;
      this.client_name = data.fio
      this.info_pupil = true;
      console.log(data)
    },
    selectUsers(data){
      this.user_jadval_show = true;
      this.fans_show = false;
      this.user_info = data;
      console.log(data)
    },
    closeInfoUser(){
      this.info_pupil = false;
      this.$refs.search_client.clear();
      // this.
    },
    addClientToGroupFunc(option){
      console.log(option)
      this.add_client_to_group = true;
      this.group = option;
    },
    async selectFans(option){
      console.log(option)
      this.fan_name = option.name
      this.user_jadval_show = false;
      this.fans_show = true;
      try{
        this.loading_fans = true;
        const response = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/getPaginationByFanId?page=0&size=100&fan_id=' + option.id);
        const data = await response.json();
        console.log('info fans')
        console.log(data)
        this.groupList = data.items_list;
        for(let i=0;i<this.groupList.length; i++){
          let weekdays = [
            {
              id:0,
              typeof:false,
              name: 'Понедельник',
            },
            {
              id:1,
              typeof:false,
              name: 'Вторник'
            },
            {
              id:2,
              typeof:false,
              name: 'Среда'
            },
            {
              id:3,
              typeof:false,
              name: 'Четверг'
            },
            {
              id:4,
              typeof:false,
              name: 'Пятница'
            },
            {
              id:5,
              typeof:false,
              name: 'Суббота'
            },
            {
              id:6,
              typeof:false,
              name: 'Воскресенье'
            }

          ]
          for(let j=0; j<this.groupList[i].week_days.length; j++){
            weekdays[this.groupList[i].week_days[j]].typeof = true;
          }
          this.groupList[i].weekdays = weekdays;
        }
        this.loading_fans = false;
        
      }
      catch{
        this.loading_fans = false;
        this.$refs.message.error('network_ne_connect')
        // this.loading_jadval = false;
      }


    }
  },
}
</script>

<style>
.bg_mainPage{
  min-height: 100%;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
}
.glavniyPage{
  min-height: 100vh;
  /* background: rgba(14, 14, 14, 0.5); */
}
.logo_padding{
  padding: 14.7px 0;
}
.navbarMenu{
  position: sticky;
  top:0;
  z-index: 12;
  background: #132735;
  /* border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px; */
  /* box-shadow: 5px 2px 5px #ddd; */
}
.activeItem{
  color: #fff;
  border-bottom: 3px solid rgb(250, 133, 0)
}
.fza{
  font-size: 13px;
}


.searchMenu{
  height: 100%;
  padding: 10px 0 15px 0;
}
.searchMain{
  height: 100%;
}
.text_orange{
  color:orange;
  font-size: 15px;
  /* font-style: italic; */
}
.text_color{
  color: rgb(0, 0, 102);
  font-weight: 500;
  border-bottom: 1px solid rgb(0, 0, 102);
}

.add_client_fans{
  position: absolute;
  right: 0px;
  top:0px;
}
.btn_add_client{
  padding: 4px 12px;
  font-size: 12px;
  color: white;
  cursor: pointer;
  background-color: #21D4FD;
  background-image: linear-gradient(19deg, #21D4FD 10%, #6056ee 100%);
}
.btn_add_client:hover{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

</style>