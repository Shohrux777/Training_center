<template>
  <div>
    <div class="border-bottom navbar_sticky">
      <router-link to="/mentor_group">
        <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            Вернуться к группы</h5>
      </router-link>
    </div>
    <!-- <check v-if="check_show" @update="groupUpdate" @close="check_show = !check_show " /> -->
    <div class="payList">
      <div class="group_info p-3">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3 mt-2">
            <div class="shadow card p-3 ">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Группа:</span>
                <span class="ml-2 text-primary">{{group_data.name}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Cтатус</span>
                <span v-if="group_data.opened_group_status" class="ml-2 text-success" style="font-size: 12.5px;">Активный</span>
                <span v-else class="ml-2 text-danger" style="font-size: 12.5px; ">Начало неизвестно</span>
              </div>
              
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mt-2">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Ментор:</span>
                <span class="ml-2 text-primary">{{group_data.user_fio}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">{{$t('phone1')}}:</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">{{group_data.user.phone_number}}</span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mt-2">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Оплата:</span>
                <span class="ml-2 text-primary">{{group_data.fan.price}}</span>
              </div>
              <div class="mt-1">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Период:</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">1 месяца</span>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-3 mt-2">
            <div class="shadow card p-3">
              <div class="d-flex align-items-center">
                <span class="font-weight-bold" style="font-size: 14px;">Урок:</span>
                <span class="ml-2 text-primary">{{group_data.fan.name}}</span>
              </div>
              <div class="mt-1 d-flex">
                <span class="font-weight-bold" style="font-size: 12px; color:#6E6E6E;">Неделю</span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">
                  <div class="day_item d-flex" >
                    <div class="day_week_item_string" v-for="(link,k) in group_data.week_days" :key="k">
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 0">Пт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 1">Вт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 2">Ср </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 3">Чт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 4">Пт </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 5">Сб </span>
                      <span style="font-size: 12px; color:#6E6E6E" class="mr-1" v-if ="link == 6">Вс </span>
                    </div>
                  </div>
                </span>
                <span class="ml-2" style="font-size: 12.5px; color:#6E6E6E">{{group_data.begin_time.slice(0,5)}} -- {{group_data.end_time.slice(0,5)}}</span>
              </div>
            </div>
          </div>
        </div>

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
        <div class="d-flex justify-content-start align-items-center flex-wrap">
          <input-icon style="width: 280px; height:30px;" v-model="search" :placeholder="$t('search_here')"></input-icon>
          <mdb-btn class="mr-1 ml-0  py-1 px-3"  style="font-size: 9px; height:27.5px;" color="info"  @click="searchClick()" 
            size="sm">{{$t('search')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2  ml-4"  style="font-size: 9px;" color="success" @click="$router.push('/mentor_check/' + id)" 
            size="sm"><mdb-icon icon="calendar-check" far class="mr-1"/> {{$t('checkGroup')}}
          </mdb-btn>
           <mdb-btn class="mr-1 py-1 px-2  ml-2"  style="font-size: 9px;" color="info" @click="$router.push('/book_mark/' + id)" 
            size="sm"><mdb-icon icon="bookmark" far class="mr-1"/> {{$t('books')}}
          </mdb-btn>
        </div>
      </div>

    <div class="px-3">
      <loader v-if="loading"/>
      <table class="myTableGroupList ">
        <thead>
          <tr class="header ">
            <th  width="40" class="text-left">№</th>
            <th >{{$t('passport_number_str')}}</th>
            <th >{{$t('client_name')}}</th>
            <th>{{$t('born_date')}}</th>
            <th>{{$t('phone')}}</th>
            <!-- <th >{{$t('address')}}</th> -->
            <!-- <th >{{$t('lessons_cout')}}</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in group_client_list" :key="rowIndex"  :class="{'bg_warning': row.payments_count == 0, 'bg-danger text-white': row.lessons_cout == 0 && row.payments_count > 0 }">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.oquvchi.passport_number_str}}</span> </td>
            <td> <span >{{row.oquvchi.fio}}</span> </td>
            <td> <span >{{row.oquvchi.born_date}}</span> </td>
            <td> <span >{{row.oquvchi.phone_number}}</span> </td>
          </tr>
        </tbody>
      </table>
    </div>
    <modal-train  :show="add_client_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
      @close="add_client_to_group = false" width="550px">
        <template v-slot:body>
          <addClientToGroup v-if="add_client_to_group"  @close="add_client_to_group = false" :group="group_data"/>
        </template>
    </modal-train>
      <!-- <payed v-show="payShow" ref="payed" @close="payShow = !payShow" @print="checkprint" :summa="selectSumma" :summaString="summaString" @submitSuccess="submitSuccess"/> -->
      <Toast ref="message"></Toast>
    </div>
 </div>
</template>

<script>
// import lineSelect from "../../components/lineSelect.vue";
import {mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import addClientToGroup from '../main/group_add_client.vue'

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    // payed, check,
    InputIcon,
    addClientToGroup
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
      group_data: {
        begin_time: '00:000',
        end_time: '00:000',
        gruppa_opened_date: '2022-03-18T',
        user: {
          phone_number: '',
        },
        fan: {
          price: '',
        }
      },
      chooseClient: {
        oquvchi: {
          fio: ''
        },
        group:{
          name: ''
        }
      },
      group_name: '',
      group_id: null,

      search: '',
      test_show: false,
      delete_show: true,

      add_client_to_group: false,
    }
  },
  async created()
  {
    
    if(this.id > 0)
    {
      this.loading = true;
      await this.fetchGroupsClientList(this.id)
       console.log('this.group_client_list')
        console.log(this.group_client_list)
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/' + this.id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.group_name = data.name;
          this.group_id = data.id;
          this.group_data = data;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
      
      this.loading = false;
    }
  },
  async mounted() {
    await this.fetchGroups();
    await this.fetchClient();
    // await this.submit();
  },
  computed: mapGetters(['allGroups', 'group_client_list']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList']),

    async groupUpdate(){
      try{
        this.loading = true;
        await this.fetchGroupsClientList(this.group_id)
        this.loading = false;

      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
    },


    submitSuccess(){
       this.$refs.message.success('Added_successfully');
      this.payShow = false;
    },

    checkprint(){
      this.check_show = true;
    },


    // ===> Navber click buttons <===
    async activ(option){
      console.log('option')
      console.log(option)
      this.selectSumma = option.group.fan.price
      this.summaString = option.group.fan.price.toString().replace(/(\d)(?=(\d{3})+(\.(\d){0,2})*$)/g, '$1 ');
      this.$refs.payed.changingEnter(1, option.group.fan.price, {name: option.oquvchi.fio, user_id:option.oquvchi.id, fan:option.group.fan,  count:option.lessons_cout, group_id: option.group.id});  
      this.payShow = true;
      
    },
    async searchClick(){
      console.log(this.search)
    },
    testClick(){
      this.test_show = true;
    },
    AddClient(){
      this.add_client_to_group = true;
    },
    deleteClient(){
      this.delete_show = true;
      console.log('delete')
    },
    deleteClientId(){
      console.log('deleteId')
    }

    // ===> Navber click buttons <===

   
  },
}
</script>

<style lang="scss">


.myTableGroupList {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTableGroupList th{
  // font-weight: 600;
  font-size:11px;
}
.myTableGroupList td{
  font-size:11.5px;
}
 .myTableGroupList td{
  text-align: left;
  padding: 12px 10px;
}
.myTableGroupList th{
  text-align: left;
  padding: 7px 10px;
}

.myTableGroupList tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
}

.myTableGroupList tr:hover {
  // background-color: #f1f1f1;
  background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(128,248,174,1) 0%, rgba(223,244,148,1) 90% );
  cursor: pointer;
}
.myTableGroupList .header{
  color: white;
  background-image: radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% );
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
.bg_warning{
  background: rgb(251, 255, 169);
}

</style>