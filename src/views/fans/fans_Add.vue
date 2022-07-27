<template>
  <div>
    <loader v-if="loading"/>
    <div class="border-bottom navbar_sticky">
      <router-link to="/fans">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_fans')}}</h5>
      </router-link>
     
    </div>
    <div class="fans_add px-5 pt-4">
      <form @submit.prevent="submit">
        <div class="row_w">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('name')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="name" valid  validate error="wrong" success="right" icon="critical-role" fab/>
            <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.name.$dirty && !$v.name.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div>
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('price')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="price" type="number" valid   icon="dollar-sign"/>
            <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.price.$dirty && !$v.price.required" >
              {{$t('name_invalid_text')}}
            </small>
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
          </div>
        </div> 
        <div class="row_w mt-4">
          <div class="col_3">
            <p class="p-0 m-0 mt-2" style="font-size: 14px;">{{$t('summ_for_teacher')}}</p>
          </div>
          <div class="col_5 px-2">
            <input-icon  v-model="summ_for_teacher"  type="number"  icon="hand-holding-usd"/>
            <!-- <small class="invalid-text mt-1" style="margin-left:5px; "  v-if="$v.summ_for_teacher.$dirty && !$v.summ_for_teacher.required" >
              {{$t('name_invalid_text')}}
            </small> -->
            <!-- <small class="p-0" style="margin-left:5px; font-size: 12px; color: gray;"  v-else >
              {{$t('write_district_name_full')}}
            </small> -->
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
import { mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn, } from "mdbvue"
import { required } from 'vuelidate/lib/validators'
import {mapActions,mapGetters} from 'vuex'
import InputIcon from '../../components/inputIcon.vue';
import TextArea from '../../components/textArea.vue';

export default {
  naem: "fansAdd",
  
  data(){
    return{
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,
      name: '',
      price: null,
      summ_for_teacher: null,
      

    }
  },
  components: {
    mdbInput, mdbRow, mdbCol, mdbIcon, mdbBtn,
    InputIcon,
    TextArea
  },
  validations: {
      name: {required},
      price: {required},

     
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
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazFanlar/' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        this.name = data.name;
        this.price =data.price;
        this.summ_for_teacher = data.summ_for_teacher;
        
      }

    },
    mounted(){
      
    },
    computed: mapGetters(['all_district_t']),

  methods:{
    ...mapActions(['fetch_district_t']),
    
    cls_wnd()
      {
        this.name = '';
        
      },
    save_data :  async function(){
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
                "price": this.price,
                "summ_for_teacher": this.summ_for_teacher,
                "id" : this.id,
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/OquvMarkazFanlar", requestOptions);
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
          this.$router.push("/fans");
        }

      },
    async submit_continue()
      {
        if(await this.save_data())
        {
          if(this.id != 0){
            this.$router.push('/fans_add/0')
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



</style>