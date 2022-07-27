<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/client">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_client')}}</h5>
      </router-link>
     
    </div>
    <div class="client_add px-5 pt-4">
      <form @submit.prevent="submit">
        <div class="row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('namei')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon valid  v-model="name"  validate error="wrong" success="right" icon="user"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div> 
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('namef')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon valid  v-model="passport_number"  validate error="wrong" success="right" icon="user"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.passport_number.$dirty && !$v.passport_number.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div> 
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumber')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-phone  v-model="phoneNumber"  valid error="wrong" success="right" icon="phone-alt"/>
            <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumberTeleg')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-phone  v-model="phoneNumber1"   error="wrong" success="right" icon="telegram-plane" fab/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('phoneNumberFather')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-phone  v-model="phoneNumber2"   error="wrong" success="right" icon="phone-volume"/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.phoneNumber.$dirty && !$v.phoneNumber.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('born_date')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon type="date" valid v-model="born_date" icon=""/>
            <!-- <small class="invalid-text pt-4" style="margin-left:5px; "  v-if="$v.car_number.$dirty && !$v.car_number.required" >
              {{$t('name_invalid_text')}}
            </small>
            <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_company_name_to_chek')}}
            </small> -->
          </div>
        </div>

        

        

        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('groups')}}</p>
          </div>
          <div class="col_5 px-2">
            <ErpSelectIcon
              :options="allGroups.rows"  
              @select="selectOptionGroup"
              :selected="groups_name"
              :label="$t('groups')"

            />
            <small v-if="$v.groups_name.$dirty && groups_id == null" class="invalid-text mt-0 ml-2" >
              {{$t('select_item')}}
            </small>
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('contragent')}}</p>
          </div>
          <div class="col_5 px-2">
            <ErpSelectIcon
              :options="all_contragent_t.rows"  
              @select="selectOption"
              :selected="contragent_name"
              :label="$t('contragent')"

            />
            <small v-if="$v.contragent_name.$dirty && contragent_id == null" class="invalid-text mt-0 ml-2" >
              {{$t('select_item')}}
            </small>
          </div>
        </div>
        <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('level')}}</p>
          </div>
          <div class="col_5 px-2">
            <ErpSelectIcon
              :options="allLevel.rows"  
              @select="selectOptionLevel"
              :selected="level_name"
              :label="$t('level')"
            />
            <small v-if="$v.level_name.$dirty && level_id == null" class="invalid-text mt-0 ml-2" >
              {{$t('select_item')}}
            </small>
          </div>
        </div>

        <div class=" row_w mt-4">
          <div class=" col_3">
            <!-- <h6 class="text-primary mt-1">Выходные</h6> -->
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">Выходные</p>
          </div>
          <div class=" week_day_item d-flex align-items-center py-2 px-1 ml-2 " v-for="(item,i) in free_day" :key="i" @click="choose_freeDay(i)">
            <div class="item_circle d-flex justify-content-center align-items-center">
              <span class="into_circle d-flex justify-content-center align-items-center" :class="{'into_circle_active': item.type}">
                <mdb-icon style="font-size: 10px; " color="white" icon="check"></mdb-icon>
              </span>
            </div>
            <span style="font-size:14px; ">{{item.name}}</span>
          </div>

          
        </div>

        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">Свободное время</p>
            <!-- <h6 class="text-primary">Свободное время</h6> -->
          </div>
          <div class="px-1 col_5">
            <input-icon type="time" style="width: 30%;" valid v-model="free_time" icon=""/>
          </div>
        </div>
        

        
        <!-- <div class="mt-4 row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('picture')}}</p>
          </div>
          <div class="col_5" style="position: relative;">
            <div class="d-flex justify-content-start align-items-center">
              <div class="contragent_img" v-show="!PicShow" style="position: relative;">
                <img  :src="image" id="prewImage" style="height: 150px;" class="img-fluid img-thumbnail img-responsive shadow" alt="">
                <div @click="delImage">
                  <svg xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x border p-1" style="border-radius:50%;
                    position: absolute; top:8px; right: 8px; cursor:pointer;" width="25" height="25" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </div>
            </div>
            <input hidden  id="inputFileToLoad" @change="previewFile()" accept="image/png, image/gif, image/jpeg" type="file" ref="file_Img" class="shadow text-right ml-2"  />
              <label for="inputFileToLoad" class="download">
                <span>{{$t('download...')}}</span>
              </label>
          </div>
        </div> -->

                           
        <div class="footer_sticky">
          <div class="blue-gradient">
            <hr class="mt-5 "/>
          </div>
          <mdb-row class="mt-0" >
            <mdb-col col="8">
              <div class="mt-0 mb-2 text-right">
                <mdb-btn  @click="submit_continue" color="primary" m="r3" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">  {{$t('Add_and_continue')}}
                </mdb-btn>
                <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
                  p="r4 l4 t2 b2">
                  <mdb-icon  />{{$t('add')}}</mdb-btn>
              </div>
            </mdb-col>
          </mdb-row>
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
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import TextArea from '../../components/textArea.vue';
import ErpSelectIcon from '../../components/erpSelectIcon.vue'


export default {
  naem: "companyAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,


      name: '',
      phoneNumber: '',
      phoneNumber1: '',
      phoneNumber2: '',
      address: '',
      born_date:'',
      
      alert_danger: false,
      PicShow: true,
      base64: '',
      image: '',
      note: '',
      passport_number: '',
      car_number: '',
      contragent_company_name: '',
       contragent_name: '',
      contragent_id: null,
      groups_name: '',
      groups_id: null,
      level_name: '',
      level_id:null,
      
      free_day:[
        {name: 'Пн', id: 0, type: false},
        {name: 'Вт', id: 1, type: false},
        {name: 'Ср', id: 2, type: false},
        {name: 'Чт', id: 3, type: false},
        {name: 'Пт', id: 4, type: false},
        {name: 'Сб', id: 5, type: false},
        {name: 'Вс', id: 6, type: false},
      ],
      free_time: '',

    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, 
    InputIcon,
    TextArea, ErpSelectIcon
  },
  validations: {
      name: {required},
      passport_number: {required},
      phoneNumber: {required},
      level_name: {required},
      contragent_name: {required},
      groups_name: {required}
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
      if(this.props_name.length > 0)
      {
          this.name = this.props_name; 
          this.id = 0;
          this.PicShow = true;
         return 
      }
      if(this.id > 0)
      {
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazClient/' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.name = data.fio;
        
        var y = data.phone_number.slice(4,13).replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.phoneNumber = !y[2] ? y[1] : '(' + y[1] + ') ' + y[2] + (y[3] ? '-' + y[3] : '');

        var w = data.phone_number_1.slice(4,13).replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.phoneNumber1 = !w[2] ? w[1] : '(' + w[1] + ') ' + w[2] + (w[3] ? '-' + w[3] : '');

        let x = data.phone_number_2.slice(4,13).replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.phoneNumber2 = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

        this.address = data.address;
        this.born_date = data.born_date;
        this.passport_number = data.passport_number_str;

        this.level_name = data.client_type.name;
        this.level_id = data.client_type.id;
        this.contragent_name = data.contragent.name;
        this.contragent_id = data.contragent.id;
        this.groups_name = data.groups.name;
        this.groups_id = data.groups.id;
        this.free_time = data.free_time;
        for(let i=0; i<data.free_days.length; i++){
          this.free_day[data.free_days[i]].type = true;
        }

        // if(data.image_str){
        //   this.image =  data.image_str;
        //   this.base64 = data.image_str;
        // }
        // this.image = this.$store.state.server_ip +  data.image_base_64;
        // this.base64 = data.image_base_64;
        
      }

    },
    async mounted(){
      await this.fetch_contragent_t();
      await this.fetchGroups();
      await this.fetchLevel();
    },
    computed: mapGetters(['all_district_t', 'all_contragent_t','allGroups', 'allLevel']),

  methods:{
    ...mapActions(['fetch_district_t', 'fetchClient', 'fetch_contragent_t','fetchGroups', 'fetchLevel']),
    delImage(){
      this.base64 = ''
      this.PicShow = true
      this.image = ''
    },
    selectOptionGroup(option){
      console.log(option)
      this.groups_name = option.name;
      this.Groups_id = option.id;
    },
    selectOption(option){
      console.log(option)
      this.contragent_name = option.name;
      this.contragent_id = option.id;
    },
    selectOptionLevel(option){
      this.level_name = option.name;
      this.level_id = option.id;
    },
    choose_freeDay(i){
      this.free_day[i].type = !this.free_day[i].type;
      this.free_day.push({name:'test', id: 7, type: false})
      this.free_day.splice(this.free_day.length-1,1)
      
    },

    async previewFile(){
      const preview = document.getElementById('prewImage');
        const file = document.querySelector('input[type=file]').files[0];
        this.PicShow = true;
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        this.image =  reader.result;
        preview.src = reader.result;
      }, true);
      if (file) {
          this.PicShow = false
        reader.readAsDataURL(file);
      }
    },
    cls_wnd()
      {
        this.name = '';
        this.phoneNumber = '';
        this.phoneNumber1 = '';
        this.phoneNumber2 = '';
        this.address = '';
        this.base64 = '';
        this.image_base_64 = '';
        this.PicShow = true;
        this.passport_number = '';
        this.born_date = '';
        this.contragent_name = '';
        this.contragent_id = null;
        this.groups_name = '';
        this.groups_id = null;
        this.level_name = '';
        this.level_id = null;
      },
    save_data :  async function(){

      // var img = document.getElementById('prewImage');
      //   if(img.src.slice(0,4) != 'http'){
      //     this.base64 = img.src;
      //   }

        var days_free = [];
        for(let i=0; i<this.free_day.length; i++){
          if(this.free_day[i].type == true){
            days_free.push(this.free_day[i].id)
          }
        }
        await this.loadingPhone();
        // console.log(this.born_date)
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
                "fio" : this.name,
                "phone_number": '+998' + this.phoneNumber,
                "phone_number_1": '+998' + this.phoneNumber1,
                "phone_number_2": '+998' + this.phoneNumber2,
                "address": this.address,
                "born_date": this.born_date,
                "image_str": this.base64,
                "passport_number_str": this.passport_number,
                "free_days": days_free,
                "free_time": this.free_time,
                "free_pupil_time": this.free_time,
                "oquvMarkazClientTypeid": this.level_id,
                "oquvMarkazContragentid": this.contragent_id,
                "oquvMarkazgroupsid": this.groups_id,
                "id" : this.id,
              })
            };
            try{
              this.loading = true;
              console.log(requestOptions.body)
              const response = await fetch(this.$store.state.hostname + "/OquvMarkazClient", requestOptions);
              const data = await response.text();
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
          this.$router.push("/client");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/client_add/0')
            this.cls_wnd();
          }
          else{
            this.cls_wnd();
          }
        }
      },
    loadingPhone(){
      var phoneLk = '';
      for(let i=0; i<this.phoneNumber.length; i++){
        console.log(this.phoneNumber[i])
        if(this.phoneNumber[i] == '-' || this.phoneNumber[i] == '(' || this.phoneNumber[i] == ')' || this.phoneNumber[i] == ' '){
          console.log('--')
        }else{
          phoneLk += this.phoneNumber[i];
        }
      }
      this.phoneNumber = phoneLk
      var phoneLk1 = '';
      for(let i=0; i<this.phoneNumber1.length; i++){
        console.log(this.phoneNumber1[i])
        if(this.phoneNumber1[i] == '-' || this.phoneNumber1[i] == '(' || this.phoneNumber1[i] == ')' || this.phoneNumber1[i] == ' '){
          console.log('--')
        }else{
          phoneLk1 += this.phoneNumber1[i];
        }
      }
      this.phoneNumber1 = phoneLk1
      var phoneLk2 = '';
      for(let i=0; i<this.phoneNumber2.length; i++){
        console.log(this.phoneNumber2[i])
        if(this.phoneNumber2[i] == '-' || this.phoneNumber2[i] == '(' || this.phoneNumber2[i] == ')' || this.phoneNumber2[i] == ' '){
          console.log('--')
        }else{
          phoneLk2 += this.phoneNumber2[i];
        }
      }
      this.phoneNumber2 = phoneLk2
    }
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

.free_day{

}
.week_day_item{
  cursor: pointer;
}

.item_circle{
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #eee;
}
.into_circle{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgb(255, 255, 255);
}
.into_circle_active{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #0fe22b ;
  /* box-shadow: 1px 1px 5px #4285F4, -1px -1px 5px #4285F4, -1px 1px 5px #4285F4, 1px -1px 5px #4285F4 ; */
}


</style>