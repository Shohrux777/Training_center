<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/groups">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_groups')}}</h5>
      </router-link>
     
    </div>
    <div class="groups_add px-5 pt-4">
      <form @submit.prevent="submit">
        <div class="row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="name" valid validate error="wrong" success="right" icon="users"/>
            <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div> 
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('fans')}}</p>
          </div>
          <div class="col_5 px-2" style="position: relative;">
              <erpSelect
                :options="allFans.rows"  
                @select="selectOptionFan"
                :selected="fan_name"
                :label="$t('company')"

              />
              <small v-if="$v.fan_name.$dirty && fan_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </div>
        </div> 
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('teacher')}}</p>
          </div>
          <div class="col_5 px-2" style="position: relative;">
              <erpSelectFio
                :options="allUser.rows"  
                @select="selectOptionUser"
                :selected="user_name"
                :label="$t('company')"
              />
              <small v-if="$v.user_name.$dirty && user_id == null" class="invalid-text mt-0 ml-2" >
                  {{$t('select_item')}}
                </small>
          </div>
        </div>
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('group_open_date')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="open_date" type="date" valid validate error="wrong" success="right" />
            <!-- <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
          
        </div>
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('begin_time')}} <span class="ml-3"></span> {{$t('end_time')}}</p>
          </div>
          <div class="col_2 px-2">
            <input-icon  v-model="begin_time" type="time" valid validate error="wrong" success="right" />
            <!-- <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
           <div class="col_2 px-2">
            <input-icon  v-model="end_time" type="time" valid validate error="wrong" success="right" />
            <!-- <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
          
        </div>
        
        
         <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('week_day')}}</p>
          </div>
          <div class="col_7 px-2">
            <div class="week_group pt-4">
              <div v-for="(item,i) in weekdays" :key="i" class="week_item border"  :class="{'week_item_actie': item.typeof == true}" @click="choose_weekItem(i)">
                <div class="week_name">
                  <span>{{item.name}}</span>
                </div>
                <span>{{item.time}}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('count_of_lessons_in_month')}}</p>
          </div>
          <div class="col_2 px-2">
            <input-icon v-model="count_of_lessons_in_month" type="text" />
          </div>
        </div>

        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('note')}}</p>
          </div>
          <div class="col_5 px-2">
            <text-area v-model="note" rows="3" type="text" icon="comment"/>
          </div>
        </div>
        
                     
        <div class="footer_sticky">
          <div class="blue-gradient">
            <hr class="mt-5 "/>
          </div>
          <div class="mt-0 row_w" >
            <div class="col_8">
              <div class="mt-0 mb-2 text-right">
                <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
                </mdb-btn>
                <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">
                  <mdb-icon  />{{$t('add')}}</mdb-btn>
              </div>
            </div>
          </div>
        </div>
        
        
      </form>
      <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
    </div>
  </div>
</template>

<script>
// import md5 from 'js-md5'
import erpSelect from "../../components/erpSelect.vue";
import erpSelectFio from "../../components/erpSelectFio.vue";
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import TextArea from '../../components/textArea.vue';

export default {
  naem: "groupsAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      name: '',
      note: '',
      fan_name: '',
      fan_id: null,
      user_name: '',
      user_id: null,
      begin_time: '',
      end_time: '',
      open_date: '',
      count_of_lessons_in_month: null,
      weekdays: [
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
      

    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, erpSelect,
    InputIcon,
    TextArea, erpSelectFio
  },
  validations: {
      name: {required},
      fan_name: {required},
      user_name: {required}
     
    },
     props :
    {
      props_name : {
        type : String,
        default : ''
      },
      
    },
    async created()
    {
      
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.name = data.name;
        this.note = data.note;
        this.begin_time = data.begin_time
        this.end_time = data.end_time
        this.user_name = data.user_fio;
        this.user_id = data.oquvMarkazUserid;
        this.fan_name = data.fan_name;
        this.fan_id = data.oquvMarkazFanlarid;
        this.count_of_lessons_in_month = data.count_of_lessons_in_month;
        this.open_date = data.gruppa_opened_date.slice(0,10)
        for(let i=0;i<data.week_days.length; i++){
          this.weekdays[data.week_days[i]].typeof = true
        }
        console.log(this.weekdays)


        
      }

    },
    async mounted(){
      await  this.fetchFans();
      await  this.fetchUser();
    },
    computed: mapGetters(['all_district_t', 'allFans', 'allUser']),

  methods:{
    ...mapActions(['fetch_district_t', 'fetchFans', 'fetchUser']),
  
    selectOptionFan(option){
      console.log(option)
      this.fan_name = option.name;
      this.fan_id = option.id;
    },
    selectOptionUser(option){
       this.user_name = option.fio;
        this.user_id = option.id;
    },
    choose_weekItem(i){
      this.weekdays[i].typeof = !this.weekdays[i].typeof;
      let obj = {name: 'hiy'}
      this.weekdays.push(obj)
      this.weekdays.splice(this.weekdays.length-1,1)
      console.log(this.weekdays.length)
      var count = 0;
      for(let j=0; j<this.weekdays.length; j++){
        if(this.weekdays[j].typeof == true){
          count++;
        }
      }
      this.count_of_lessons_in_month = count*4;
    },



    cls_wnd()
      {
        this.name = '';
        this.note = '';
        this.fan_name = '';
        this.fan_id = null;
        this.user_name = '';
        this.user_id = null;
        this.begin_time = '';
        this.end_time = '';
        this.count_of_lessons_in_month = null;
      },
    
    save_data :  async function(){
      var weekList = [];
      for(let i=0;i<this.weekdays.length; i++){
        if(this.weekdays[i].typeof == true){
          weekList.push(this.weekdays[i].id)
        }
      }
      console.log(weekList)
        if(this.$v.$invalid)
          {
            this.$v.$touch();
            this.$refs.message.warning('please_fill')
            return false;
          }
        
        else{ 
          this.alert_danger = false;
          const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "name" : this.name,
                "note" : this.note,
                "begin_time": this.begin_time,
                "end_time": this.end_time,
                "oquvMarkazUserid": this.user_id,
                "oquvMarkazFanlarid": this.fan_id,
                "week_days": weekList,
                "gruppa_opened_date": this.open_date,
                'count_of_lessons_in_month': this.count_of_lessons_in_month,
                "id" : this.id,
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/OquvMarkazPupilGroups", requestOptions);
              const data = await response.text();
              console.log(data)
              this.loading = false;
              if(response.status == 201 || response.status == 200)
              {
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
        }
    },
    async submit()
      {
        if(await this.save_data())
        {
          this.$store.state.alert = true;
          this.$router.push("/groups");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/groups_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
  }
}
</script>

<style >
.download{
  width: 35%;
  height: 33px;
  border: 0.5px solid #4285F4;
  border-radius: 4px;
  margin-top: 7px;
  display: flex;
  align-items: center;
  color: gray; 
  font-size: 13px;
  cursor:pointer;
}
.download span{
    margin-left: 10px;
}
.week_group{
  display: flex;
  flex-wrap: wrap;
}
.week_item{
  width: calc(100% / 7);
  position: relative;
  /* max-height: 100px; */
  min-height: 45px;
  cursor:pointer;
  background: rgb(246, 246, 246);
  box-shadow: 2px 5px 5px #eee;
  
}
.week_item:hover{
  background: #72ff30;
}
.week_name{
  position: absolute;
  top:-20px;
  width: 100%;
  left: 0px;
  padding: 2px 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 13px;
  background: #3681fa;
  color: #fff;
}
.week_item_actie{
  background: #52f605;
}



</style>