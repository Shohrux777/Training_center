<template>
  <div>
    <div class="payList">
      <div class="px-3 pb-2 pt-3 mb-3 border-bottom">
        <div class="row">
          <div class="col-12">
          <div class="">
             <span class="font-weight-bold">Группа:</span> <span class="ml-2">{{group_name}}</span>
            <span class="px-1 ml-2 bg-dark rounded text-white" style="font-size: 13.5px;">{{group_begin}}</span>
            <span class="px-1 ml-2 bg-dark rounded text-white" style="font-size: 13.5px;">{{group_end}}</span>
          </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          
        </div>
      </div>

    <div>
        <loader v-if="loading"/>
        <table class="myTablePayedInfo">
          <thead>
            <tr class="header ">
              <th  width="40" class="text-left">№</th>
              <th width="200">{{$t('client_name')}}</th>
              <th>{{$t('teacher')}}</th>
              <th>{{$t('phone')}}</th>
              <th>{{$t('passport_number')}}</th>
              <th width="90" class="text-right mr-2">{{$t('Action')}}</th>
        

            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,rowIndex) in clientList" :key="rowIndex">
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.clinet_name}}</span> </td>
              <td> <span >{{row.user_name}}</span> </td>
              <td> <span >{{row.client.phone_number}}</span> </td>
              <td> <span >{{row.client.passport_number_str}}</span> </td>
              
              <td class="text-right mr-2">
                <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 8px;" color="danger"  @click="cause(row)" :data-row="rowIndex"
                  size="sm">{{$t('cause')}}</mdb-btn>
              </td>
              

            </tr>
          </tbody>
        </table>
    </div>
      <Toast ref="message"></Toast>
    </div>
 </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
export default {
  components:{
    mdbBtn, 
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
      
      group_name: '',
      group_id: null,
      group_begin: '',
      group_end: '',
    }
  },
  async created()
    {
      
      if(this.id > 0)
      {
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazDailyPupilsCalculationInfo/getPaginationByMainCalculationIdForView?page=0&size=100&calc_id=' + this.id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data.items_list)
        this.clientList = data.items_list
        this.group_name = data.items_list[0].group_name;
        this.group_begin = data.items_list[0].group.begin_time.slice(0,5)
        this.group_end = data.items_list[0].group.end_time.slice(0,5)
        this.loading = false;
      }

    },
  async mounted() {
   
  },
  computed: mapGetters(['allGroups']),

  methods: {
    ...mapActions(['fetchGroups', ]),

    async groupUpdate(){
       try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/OquvMarkazPupilGroupDetailInfo/getPaginationByGroupId?page=0&size=100&group_id=" + this.group_id);
          const data = await response.json();
          console.log(data)
          this.clientList = data.items_list
          this.loading = false;

        }
        catch{
          this.$refs.message.error('network_ne_connect')
          this.loading = false;
        }
    },
    async cause(option){
      console.log('option')
      console.log(option)
      try{
          this.loading = true;
          const response = await fetch(this.$store.state.hostname + "/OquvMarkazDailyPupilsCalculationInfo/getDisableNotComePupilForLessons?id=" + option.id);
          const data = await response.json();
          console.log(data)
          this.$refs.message.success('Added_successfully')
          this.loading = false;
        }
        catch{
          this.$refs.message.error('network_ne_connect')
          this.loading = false;
        }
    },
   



    async cardPay(data){
      console.log(data)

      const requestOptions = {
              method : "POST",
              headers: { "Content-Type" : "application/json" },
              body: JSON.stringify({
                "summ": 500000,
                "credit": 0,
                "debit": 0,
                "cash": 200000,
                "card": 0,
                "online": 0,
                "salary": 0,
                "oquvMarkazClientid": data.OquvMarkazClientid,
                "payment_list": [
                  {
                    "oquvMarkazClientid": data.OquvMarkazClientid,
                    "oquvMarkazFanlarid": data.group.OquvMarkazFanlarid,
                    "summ": 200000,
                    "id": 0,
                    "active_status": true,
                    "created_date_time": "2022-03-11T06:29:47.730Z",
                    "updated_date_time": "2022-03-11T06:29:47.730Z",
                    "inv_accepted_status": true
                  }
                ],
              })
            };
            try{
              this.loading = true;
              const response = await fetch(this.$store.state.hostname + "/OquvMarkazCheck", requestOptions);
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
}
</script>

<style lang="scss">


.myTablePayedInfo {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedInfo th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedInfo td{
  font-size:11.5px;
}
.myTablePayedInfo th, .myTablePayedInfo td {
  text-align: left;
  padding: 2px 10px;
}

.myTablePayedInfo tr {
  border-bottom: 1px dashed rgb(240, 240, 240);
}

.myTablePayedInfo tr.header, .myTablePayedInfo tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}

</style>