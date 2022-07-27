<template>
  <div class="group_add_client px-3 py-3">
    <loaderTable v-if="loading"></loaderTable>
    <div v-else>
      
      <div class="d-flex mt-3">
          <input-search  @select="selectClient" style="height:35px;" :option="allClient.rows" ref="search_client" 
          url="/OquvMarkazClient/getPaginationByClientName?page=0&size=100&fio=" icon="search"></input-search>
          <mdb-btn   @click="add_pupil =!add_pupil" class="btn-grad"
              style="font-size: 9px; height: 32px; width:100px; margin:1px 4px 0 4px;
              " 
              p="r2 l2 t2 b2">
            {{$t('add')}}
          </mdb-btn>
      </div>
      
      <div class="dashed_info mt-4 " >
        <small class="font-weight-bold">{{$t('groups')}}:</small>
        <span class="ml-2">{{group.name}}</span>
      </div>
      <div class="mt-2 dashed_info">
        <small class="font-weight-bold">{{$t('begin_time')}}:</small>
        <span class="ml-2">{{group.begin_time.slice(0,5)}} --- {{group.end_time.slice(0,5)}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('teacher')}}:</small>
        <span class="ml-2">{{group.user.fio}}</span>
      </div>


      <div class="dashed_info mt-5 " >
        <small class="font-weight-bold">{{$t('passport_number')}}:</small>
        <span class="ml-2">{{client_info.passport_number_str}}</span>
      </div>
      <div class="dashed_info mt-2" >
        <small class="font-weight-bold">{{$t('fio')}}:</small>
        <span class="ml-2">{{client_info.fio}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('phone')}}:</small>
        <span class="ml-2">{{client_info.phone_number}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('phoneNumberTeleg')}}:</small>
        <span class="ml-2">{{client_info.phone_number}}</span>
      </div>
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('born_date')}}:</small>
        <span class="ml-2">{{client_info.born_date}}</span>
      </div>
      
      <div class="dashed_info mt-2 " >
        <small class="font-weight-bold">{{$t('address')}}:</small>
        <span class="ml-2">{{client_info.address}}</span>
      </div>









      <div class="mt-4 pt-2 pb-2 d-flex justify-content-center border-top">
        <mdb-btn outline="success"  style="font-size: 10px; height: 35px; min-width:150px; margin:1px 4px 0 4px;" 
            p="r4 l4 t2 b2"  @click="submit">{{$t('save')}}
          </mdb-btn>
      </div>
      
    </div>

    <modal-train  :show="add_pupil" headerbackColor="white"  titlecolor="black" :title="$t('Add_client')" 
      @close="add_pupil = false" width="1050px">
        <template v-slot:body>
          <addpupil @close="add_pupil = false"></addpupil>
        </template>
    </modal-train>

    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>

      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import addpupil from '../client/client_ad.vue'
import {mapGetters, mapActions} from 'vuex'
import inputSearch from '../../components/inputSearch.vue'

export default {
  components: { inputSearch, mdbBtn, addpupil },
  data() {
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      client_info : '',
      client_name : '',
      client_id : '',
      add_pupil: false,
    }
  },
  props:{
    group:{
      type : Object,
      default(){
        return {}
      }
    },
  },
  mounted() {
    this.fetchClient();
    console.log('this.group')
    console.log(this.group)
  },
  computed: mapGetters(['allClient',]),
  methods: {
    ...mapActions(['fetchClient', 'fetchGroupsClientList']),
    selectClient(data){
      console.log(data)
      this.client_info = data;
      this.client_name = data.fio;
      this.client_id = data.id;
    },

    async submit(){
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazClientid" : this.client_id,
          'oquvMarkazPupilGroupsid': this.group.id,
          "id" : 0,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazPupilGroupDetailInfo", requestOptions);
        const data = await response.text();
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.client_info = {};
          this.fetchGroupsClientList(this.group.id)
          await this.cickOutWaiter();
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
    async cickOutWaiter(){
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazClient/disableOrEnableWaitingStatusoquvmarkazClient?clinet_id=' + this.client_id +'&status=false');
        const data = await res.json();
        console.log(data)
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss">
.dashed_info{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #ddd;
  color:rgb(117, 117, 117);
  font-style: italic;
  font-size: 13.5px;
  small{
    font-size: 13px;
  }
  span{
    // font-weight: bold;
    font-size: 13.8px;
    color:rgb(44, 33, 83)
  }
}


  .btn-grad {background-image: linear-gradient(to right, #485563 0%, #29323c  51%, #485563  100%)}
  .btn-grad {
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    display: block;
  }

  .btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
         
         
</style>