<template>
  <div>
      <div class="border-bottom navbar_sticky">
        <router-link v-if="admin_type == 2" :to="/groupPupils/ + id" >
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
              </svg>
              Вернуться к группы</h5>
        </router-link>  
        <router-link v-else :to="/groupList/ + id">
          <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
              </svg>
              Вернуться к группы</h5>
        </router-link>
      </div>
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
                  <div class="day_item d-flex">
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
      <loaderTable v-if="loading"/>
      <div class="book_list mx-4">
        <div class="book_item"  v-for="(item,i) in book_list" :key="i" @click="selectBookUnit(item.id, i)" style="cursor:pointer;">
          <h4 class="pt-4 pb-2  border-bottom mb-0" :class="{'text-primary': i== item_active}">{{item.book.name}}</h4>
          <div class="item_list" v-show="i== item_active">
            <div class="row mb-4">
              <div class="col-lg-2 col-md-3 col-sm-6 col-12 p-0 m-0 mt-4" v-for="(unit,index) in item_list" :key="index" @click="addMark(unit)">
                <div class="d-flex">
                  <div style="width:100%;">
                    <div class="w-100 h-100 d-flex  align-items-center" style="position:relative;">
                      <div class="w-100  " :class="{'bg-success': unit.readed == true, 'bg-warning': unit.readed == false}" style="height:2.5px;"></div>
                      <div class="textFor text-right" style="position:absolute; right:5px; top:35px; height: 40px; overflow: hidden;">
                        <h6>{{unit.unit.name}}</h6>
                      </div>
                    </div>
                  </div>
                  <div style="width:70px;">
                    <div class="circle w-100 d-flex justify-content-center align-items-center" v-if="unit.readed == true">
                      <div style="width: 50px; height:50px; border-radius:50%;" class="bg-success  d-flex justify-content-center align-items-center">
                        <mdb-icon icon="check" style="font-size: 20px; margin-top:2px;" class="m-0  text-white"/>
                      </div>
                    </div>
                    <div class="circle w-100 d-flex justify-content-center align-items-center" v-else>
                      <div style="width: 50px; height:50px; border-radius:50%;" class="bg-warning  d-flex justify-content-center align-items-center">
                        <mdb-icon icon="minus" style="font-size: 20px; margin-top:2px;" class="m-0  text-white"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <mdb-modal :show="show_mark" @close="show_mark = false" size="sm" class="text-center" success>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <p>Ты действительно преподал этот урок?</p>
          <p>{{unit_name}}</p>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn color="success" @click="promise">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="show_mark = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>

      <mdb-modal :show="show_mark_del" @close="show_mark_del = false" size="sm" class="text-center" warning>
        <mdb-modal-header center :close="false">
          <p class="heading">{{$t('Are_you_sure')}}</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <p>Ты действительно не преподал этот урок?</p>
          <p>{{unit_name}}</p>
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn color="success" @click="promiseDel">{{$t('Yes')}}</mdb-btn>
          <mdb-btn color="danger" @click="show_mark_del = false">{{$t('No')}}</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
  </div>
</template>

<script>
import {mdbBtn, mdbIcon, mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter} from 'mdbvue'

export default {
components:{
    mdbBtn,
    mdbIcon,
    mdbModal, mdbModalHeader, mdbModalBody, mdbModalFooter
    // payed, check
  },
  data() {
    return {
      id: this.$route.params.id,
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
      group_name: '',
      group_id: null,
      show_mark: false,
      show_mark_del: false,
      book_list: [],
      item_list: [],
      item_active: -1,
      unit_item: {},

      select_book_id: null,
      select_book_index: -1,

      unit_name: '',

      admin_type: localStorage.UserType,
    }
  },
  async created()
  {
    if(this.id > 0)
    {
      this.loading = true;
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

      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazBookAndGroups/getPaginationByGroupId?page=0&size=100&group_id=' + this.id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.book_list = data.items_list;
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
  methods: {
    addMark(option){
      if(this.admin_type == 2){

        this.unit_item = option;
        this.unit_name = option.unit.name;
        if(option.readed == true){
          this.show_mark_del = true;
        }
        else{
          this.show_mark = true;
        }
      }
    },
    async promise(){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazBookAndGroupDetils/addAcceptAsReaded?id=' + this.unit_item.id);
        const data = await res.json();
        this.loading = false;
        console.log(data)
        if(data){
          this.item_list = data.items_list;
        }
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
      console.log('hiy')
      this.show_mark = false;
      this.selectBookUnit(this.select_book_id, this.select_book_index)
    },
    async promiseDel(){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazBookAndGroupDetils/addReturnAcceptAsUnReaded?id=' + this.unit_item.id);
        const data = await res.json();
        this.loading = false;
        console.log(data)
        if(data){
          this.item_list = data.items_list;
        }
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
      console.log('hiy')
      this.show_mark_del = false;
      this.selectBookUnit(this.select_book_id, this.select_book_index)
    },


    async selectBookUnit(id, index){
      this.select_book_id = id,
      this.select_book_index = index;
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazBookAndGroupDetils/getPaginationBookAndByGroupId?page=0&size=100&book_and_group_id=' + id);
        const data = await res.json();
        console.log(data)
        if(data){
          this.item_list = data.items_list;
        }
        this.loading = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
      this.item_active = index;
      console.log(id)
    }
  },
}
</script>

<style>

</style>