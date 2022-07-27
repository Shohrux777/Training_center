<template>
  <div>
    <!-- <check v-if="check_show" @update="groupUpdate" @close="check_show = !check_show " /> -->
    <div class="payList">
      <div class="group_info p-3">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <div class="col-sm-12 col-md-6 col-lg-3">
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
          <mdb-btn class="mr-1 py-1 px-2  ml-4"  style="font-size: 9px;" color="success"  @click="$router.push('/checkGroup/' + id)" 
            size="sm"><mdb-icon icon="calendar-check" far class="mr-1"/> {{$t('checkGroup')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px; " color="primary"  @click="$router.push('/testResultGroup/' + id)" 
            size="sm"> <mdb-icon icon="clipboard-list" class="mr-1"/> {{$t('test')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px;" color="mdb-color"  @click="AddBook()" 
            size="sm"><mdb-icon icon="book" class="mr-1"/> {{$t('BookAdd')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px; " color="info"  @click="$router.push('/book_mark/' + id)" 
            size="sm"> <mdb-icon icon="clipboard-list" class="mr-1"/> {{$t('show_book')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px;" color="secondary"  @click="AddClient()" 
            size="sm"><mdb-icon icon="exchange-alt" class="mr-1"/> {{$t('convert')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px;" color="primary"  @click="$router.push('/payGroup/' + id)" 
            size="sm"><mdb-icon icon="credit-card" class="mr-1"/> {{$t('pay')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px;" color="mdb-color"  @click="AddClient()" 
            size="sm"> <mdb-icon icon="user" class="mr-2"/>{{$t('add')}}
          </mdb-btn>
          <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 9px;" color="danger"  @click="deleteClient()" 
            size="sm"> <mdb-icon icon="trash" class="mr-2"/>{{$t('delete')}}
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
            <th>{{$t('phone_number_2')}}</th>
            <!-- <th >{{$t('address')}}</th> -->
            <!-- <th >{{$t('lessons_cout')}}</th> -->
            <th width="90" class="text-right mr-2">{{$t('Action')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row,rowIndex) in group_client_list" :key="rowIndex"  :class="{'bg_warning': row.payments_count == 0}">
            <td> <span >{{rowIndex+1}}</span> </td>
            <td> <span >{{row.oquvchi.passport_number_str}}</span> </td>
            <td> <span >{{row.oquvchi.fio}}</span> </td>
            <td> <span >{{row.oquvchi.born_date}}</span> </td>
            <td> <span >{{row.oquvchi.phone_number}}</span> </td>
            <td> <span >{{row.oquvchi.phone_number_2}}</span> </td>
            <!-- <td> <p class="m-0">{{row.oquvchi.address}}</p> </td> -->
            <!-- <td> <span >{{row.lessons_cout}}</span> </td> -->
            <td class="text-right mr-2">
              <mdb-btn class="mr-1 py-1 px-2" v-if="delete_show" style="font-size: 8px;" color="danger"  @click="deleteClientId(row)" :data-row="rowIndex"
                size="sm">{{$t('delete')}}</mdb-btn>
            </td>
            

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
    <modal-train  :show="show_delete" headerbackColor="white"  titlecolor="black" :title="$t('deleteToGroup')" 
      @close="show_delete = false" width="550px">
        <template v-slot:body>
          <div>
            <h6 class="text-center my-2">{{client_name}}</h6>
            <div class="d-flex justify-content-start align-items-center pt-2 px-3 py-4" style="position:relative;">
              <erpSelectReg
                :options="rasxodType"  
                @select="selectOptionReg"
                :selected="rasxod_type"
                :label="$t('company')"
              />
              <small style="position:absolute; top:7px; left:22px; color:#747474; font-size:11.5px;">{{$t('trash_type')}}</small>
            </div>
            <div class="mt-0 pt-4 pb-4 text-right border-top">
              <mdb-btn color="success"  @click="deleteClientToGroup" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
              {{$t('add')}}</mdb-btn>
            </div>
          </div>
        </template>
    </modal-train>

    <modal-train  :show="add_book_show" headerbackColor="white"  titlecolor="black" :title="$t('BookAdd')" 
      @close="add_book_show = false" width="550px">
        <template v-slot:body>
          <div>
            <h6 class="text-center my-2">{{group_data.name}}</h6>
            <div class="d-flex justify-content-start align-items-center pt-2 px-3 py-4" style="position:relative;">
              <erpSelectReg
                :options="Book.rows"
                @select="selectOptionBook"
                :selected="book_name"
                :label="$t('company')"
              />
              <small style="position:absolute; top:7px; left:22px; color:#747474; font-size:11.5px;">{{$t('Book')}}</small>
            </div>
            <div class="mt-0 pt-4 pb-4 text-right border-top">
              <mdb-btn color="success"  @click="addBookToGroup" style="font-size: 10.5px"
              p="r4 l4 t2 b2">
              {{$t('add')}}</mdb-btn>
            </div>
          </div>
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
import erpSelectReg from "../../components/erpSelect.vue";
import InputIcon from '../../components/inputIcon.vue';
import addClientToGroup from './group_add_client.vue'

export default {
  components:{
    mdbBtn, 
    mdbIcon,
    // payed, check,
    InputIcon,
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

      add_book_show: false,
      book_name: '',
      book_id: null,

      show_delete: false,
      delete_id: null,
      client_name: '',

      rasxod_type: '',
      rasxod_type_id: null,
      rasxodType: [
      {
        name: 'Пробный',
        id: 1,
      },
      {
        name: 'До окончания курса',
        id: 2,
      },
      {
        name: 'После окончания курса',
        id: 3,
      },
      ],
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
    await this.fetchBook();
    // await this.submit();
  },
  computed: mapGetters(['allGroups', 'group_client_list', 'Book']),

  methods: {
    ...mapActions(['fetchGroups', 'fetchClient', 'fetchGroupsClientList', 'fetchBook']),

    selectOptionReg(option){
      this.rasxod_type = option.name;
      this.rasxod_type_id = option.id;
    },
    selectOptionBook(option){
      this.book_name = option.name;
      this.book_id = option.id;
      console.log(this.book_id, this.book_name)
    },
    async deleteClientToGroup(){
      if(this.rasxod_type =='')return;
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroupDetailInfo/deleteOquvchiWithStatus?pupil_group_detail_info_id=' + this.delete_id + '&note=' + this.rasxod_type);
        const data = await res.json();
        console.log(data);
        this.$refs.message.success('Added_successfully')
        this.show_delete = false;
         await this.fetchGroupsClientList(this.id)
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect');
        this.modal_status = true;
        return false;
      }
    },
    async addBookToGroup(){
      if(this.book_name == '' || this.book_id == null){
        this.$refs.message.warning('please_fill')
        return false;
      }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazBookid" : this.book_id,
          "oquvMarkazPupilGroupsid": this.id,
          "id": 0
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazBookAndGroups/addBooksToGroupAutoWithitems", requestOptions);
        const data = await response.text();
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.add_book_show = false;
          this.book_name = '';
          this.book_id = null;
          this.$refs.message.success('Added_successfully')
          return true;
        }
        else{
          this.modal_info = data;
          this.modal_status = true;
          return false;
        }
      }
      catch{
        this.loading = false;
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
      }
    },

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
    AddBook(){
      this.add_book_show = true;
    },
    deleteClient(){
      this.delete_show = true;
      console.log('delete')
    },
    deleteClientId(item){
      console.log(item.id)
      this.delete_id = item.id;
      this.client_name = item.oquvchi.fio
      this.show_delete = true;
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
  padding: 2px 10px;
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