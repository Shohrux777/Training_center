<template>
  <div class="mentor_page">
    <div class="mentor_main_page d-flex justify-content-center align-items-center">
      <div class="d-flex justify-content-center mentor_info rounded shadow">
        <div class="w-100 text-center ">
          <h4  class="text-white mt-5">{{mentor_name}}</h4>
          <h6  class="text-white mt-3 text-center">{{mentor_phone}}</h6>
          <div class="d-flex justify-content-center mt-5 ">
            <div class="group text-center" style="cursor:pointer;" @click="$router.push('/mentor_group')">
              <div class="d-flex">
                <mdb-icon icon="users" class="text-white mr-2 applied" style="font-size:17px;"/>
                <h6 class="text-white applied">{{$t('groups')}}</h6>
              </div>
              <h5 class="text-white mt-2 applied">{{group_qty}}</h5>
            </div>
            <div class="group text-center ml-5" style="cursor:pointer;" @click="$router.push('/mentor_pay/' + bonusId)">
              <div class="d-flex justify-content-center">
                <mdb-icon icon="hand-holding-usd" class="text-white mr-2 applied" style="font-size:17px;"/>
                <h6 class="text-white applied">{{$t('salary')}}</h6>
              </div>
              <h5 class="text-white mt-2 applied">{{real_summ}} сўм</h5>
            </div>
            
            
          </div>
        </div>
        
        
      </div>
    </div>
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbIcon} from 'mdbvue'

export default {
  components:{
    mdbIcon
  },

  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      id: this.$route.params.id,

      mentor_name: '',
      mentor_phone: '',
      group_qty: 0,
      real_summ: 0,
      bonusId:null,
    }
  },
  async created()
    {
      if(this.id > 0)
      {
        try{
          const res = await fetch(this.$store.state.hostname + '/OquvMarkazUser/' + this.id);
          const data = await res.json();
          console.log(data);
          this.mentor_name = data.fio;
          this.mentor_phone = data.phone_number;
          // this.$refs.message.success('Added_successfully')
        }
        catch{
          this.modal_info = this.$i18n.t('network_ne_connect'); 
          this.modal_status = true;
          return false;
        }
        
        
      }

    },
    async mounted() {
      await this.getGroups()
      await this.getSalary()
    },
  methods: {
    async getGroups(){
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/getPaginationByUserId?page=0&size=100&user_id=' + this.id);
        const data = await res.json();
        console.log(data);
        this.group_qty = data.items_count;
        // this.$refs.message.success('Added_successfully')
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
    async getSalary(){
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazUserSalary/getPaginationByUserId?page=0&size=100&user_id=' + this.id);
        const data = await res.json();
        console.log(data);
        this.real_summ = data.items_list[0].real_summ.toFixed(1);
        this.bonusId = data.items_list[0].id;
        localStorage.bonusId = data.items_list[0].id
        // this.$refs.message.success('Added_successfully')
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.applied{
  background: transparent;
  pointer-events: none;
}
.mentor_page{
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/mounted.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  .mentor_main_page{
    background-color: rgba(0, 0, 0,0.7);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 0.1px solid black;

    .mentor_info{
      background-color: rgba(0, 0, 0,0.7);
      width: 700px;
      height: 275px;
    }
    
  }

}
@media only screen and (max-width: 900px){
  .mentor_page .mentor_main_page .mentor_info{
    width: 80%;
    height: 275px;
  }

}
@media only screen and (max-width: 600px){
  .mentor_page .mentor_main_page .mentor_info{
    width: 95%;
    height: 275px;
  }

}
</style>