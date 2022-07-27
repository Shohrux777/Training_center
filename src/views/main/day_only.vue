<template>
  <div v-if="all_today_groups.length > 0" class="all_groups p-3 pt-0">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-4" style="position:relative;"
        v-for="(item,i) in all_today_groups" :key="i" 
        >
        <div class="item_group px-2 shadow rounded">
          <div class="d-flex justify-content-between">
            <div class="d-flex align-items-center ">
              <span style="color:#6E6E6E;" class="pt-1 pl-1">{{item.date_only.slice(0,10)}}</span>
            </div>
            <div :class="{'client_count': item.group.opened_group_status ==true, 'client_count_no_active': item.group.opened_group_status ==false,}">
              <span >12</span>
            </div>
          </div>
          <div class="group_name pl-3 mt-3" @click="$router.push('/groupList/'+ item.group.id)">
            <p class="mb-1 text-primary">{{item.group.name}}</p>
            <p class="doctor_name mb-2 ">{{item.group.user_fio}}</p>
            <p class="open_date ">{{item.group.begin_time.slice(0,5)}} <span class="ml-2">{{item.group.end_time.slice(0,5)}}</span></p>
          </div>
          <div class="text-center open_or_close">
            <span class="text-danger" v-if="item.group.opened_group_status == false">начало неизвестно</span>
          </div>

          <div class="days_week">
            <div class="day_item d-flex" >
              <div class="day_week_item_string" v-for="(link,k) in item.group.week_days" :key="k">
                <span class="mr-1" v-if ="link == 0">Пт </span>
                <span class="mr-1" v-if ="link == 1">Вт </span>
                <span class="mr-1" v-if ="link == 2">Ср </span>
                <span class="mr-1" v-if ="link == 3">Чт </span>
                <span class="mr-1" v-if ="link == 4">Пт </span>
                <span class="mr-1" v-if ="link == 5">Сб </span>
                <span class="mr-1" v-if ="link == 6">Вс </span>
              </div>
            </div>
            <div class="month">
              {{(year-parseInt(item.group.gruppa_opened_date.slice(0,4))) * 12 + month - parseInt(item.group.gruppa_opened_date.slice(5,7)) +1 }} месяца
            </div>
          </div>
        </div>
        <div class="forButton">
          <mdb-btn color="primary" style="font-size: 10px" p="r3 l3 t1 b1" @click="accepted(item)">
              {{$t('accept')}}
            </mdb-btn>
            <!-- <mdb-btn color="danger" style="font-size: 10px" p="r3 l3 t1 b1" @click="decline(item)">
              {{$t('decline')}}
            </mdb-btn> -->
        </div>
      </div>
    </div>
    <Toast ref="message"></Toast>

  </div>
  <!-- <div v-if="all_today_groups.length > 0" >
    <div class=" mx-3 p-3">
      <div class="row">
        <div v-for="(item,i) in all_today_groups" :key="i" class="col-sm-12 col-md-6 col-lg-4 ">
          <h6 class="ml-2 mb-0 p-0 text-primary" style="font-size: 14px;">{{item.date_only.slice(0,10)}}</h6>
          <div class=" bg-success border shadow p-1 text-center" style="min-height:100px">
            <h6 class="text-white">{{item.group_name}}</h6>
            <div class="d-flex justify-content-between px-2">
              <div class="d-flex">
                <h6 class="text-white"  style="font-size: 14.5px;" >Учитель: <span class="ml-1">{{item.group.user_fio}}</span></h6>
              </div>
              <div class="d-flex">
                <h6 class="text-white" style="font-size: 14.5px;">Время:
                  <span class="px-1 ml-2 bg-dark rounded" style="font-size: 13.5px;">{{item.group.begin_time.slice(0,5)}}</span> 
                <span class="px-1 ml-1 bg-dark rounded" style="font-size: 13.5px;">{{item.group.end_time.slice(0,5)}}</span></h6>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-2">
              <mdb-btn color="primary" style="font-size: 10px" p="r3 l3 t1 b1" @click="accepted(item)">
                {{$t('accept')}}
              </mdb-btn>
              <mdb-btn color="danger" style="font-size: 10px" p="r3 l3 t1 b1" @click="decline(item)">
                {{$t('decline')}}
              </mdb-btn>
              <mdb-btn color="info" style="font-size: 10px" p="r3 l3 t1 b1" @click="view(item)">
                {{$t('view')}}
              </mdb-btn>
            </div>
          </div>
        </div>
      </div>
    </div>


    <Toast ref="message"></Toast>
  </div> -->
</template>

<script>
import { mdbBtn, } from "mdbvue"
import {mapGetters, mapActions} from 'vuex'
export default {
data() {
  return {
    day_time: '',
    day_only: [],
    month: null,
    year: null,
  }
},
components:{
  mdbBtn
},
async mounted() {
  let time = new Date();
    let time2 = new Date();
    this.year = parseInt(time.toISOString().slice(0,4)); 
    this.month = parseInt(time2.toISOString().slice(5,7)); 
    console.log(this.month)
  // await this.updates();
  // await this.updateGroup();
},
  computed: mapGetters(['all_today_groups']),
methods: {
  ...mapActions(['fetch_today_groups_get_list']),
  async updates(){
    console.log('day_only')
    try{
      let time1 = new Date();
      this.day_time = time1.toISOString().slice(0,10); 
      let a = this.day_time + 'T00:00:00.000Z' ;
      const response = await fetch(this.$store.state.hostname + '/OquvMarkazDailyPupilsCalculationInfo/getAllCalculatedLessonsList?date=' + a);
      const data = await response.json();
      console.log(data)
      if(data){
          this.$refs.message.success('Added_successfully')
      }
    }
    catch{
      // this.$refs.message.error('network_ne_connect')
    } 
    
  },
  async updateGroup(){
    try{
      const response = await fetch(this.$store.state.hostname + '/OquvMarkazDailyPupilsCalculation/getPaginationNoAcceptedMain?page=0&size=100');
      const data = await response.json();
      console.log(data)
      this.day_only = data.items_list;
    }
    catch{
      this.$refs.message.error('network_ne_connect')
    } 
  },
  async accepted(option){
    console.log(option)
    try{
      const response = await fetch(this.$store.state.hostname + '/OquvMarkazDailyPupilsCalculation/acceptAllPupilsAndCalculatedBonus?caculation_id=' + option.id);
      const data = await response.json();

      if(data.id){
          this.$refs.message.success('Added_successfully')
          await this.fetch_today_groups_get_list();
      }
    }
    catch{
      this.$refs.message.error('network_ne_connect')
    } 
  },
  async decline(option){
    console.log(option)
    // try{
    //   const response = await fetch(this.$store.state.hostname + '/OquvMarkazDailyPupilsCalculation/acceptAllPupilsAndCalculatedBonus?caculation_id=' + option.id);
    //   const data = await response.json();
    //   console.log(data)
    //   if(data){
    //       this.$refs.message.success('Added_successfully')
    //       this.updateGroup();
    //   }
    // }
    // catch{
    //   this.$refs.message.error('network_ne_connect')
    // } 
  },
  async view(option){
    console.log(option)
    this.$router.push('/view/' + option.id)
  }
},
}
</script>

<style lang="scss">
.item_group{
  position: relative;
  cursor:pointer;
  min-height: 220px;

  &:hover{
    border: 1px solid #eee;
  }


  .client_count{
    background: #00f260; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #00f260, #0575e6); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #00f260, #05e6d3);
    color: white;
    font-weight: bold;
    width: 50px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-right:0px;
    margin-top:10px;
  }
  .client_count_no_active{
    background: #ec008c; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ec008c, #fc6767); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ec008c, #fc6767);
    color: white;
    width: 50px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin-right:0px;
    margin-top:10px;
  }
  .group_name{
    font-size: 16.5px;
    overflow: hidden;

    .doctor_name{
      font-size: 13px;
      color:#6E6E6E;
    }
    .open_date{
      font-size: 12.5px;
      color:#6E6E6E;
    }
  }
  .days_week{
    position: absolute;
    width: 100%;
    bottom: 5px;
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    color:#6E6E6E;

  }
  .day_week_item_string span{
    font-size: 11px;
  }
  .month{
    font-size: 11px;
  }
  .open_or_close{
    color:#6E6E6E;
    font-size: 11.5px;
    margin-top: -5px;
  }
}
.forButton{
  position: absolute;
  top:60%;
  z-index: 1111;
  left: 15px;
  right: 15px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  &:hover{
    opacity: 1;
    background: rgba(10, 10, 10,0.5);
  }
}
</style>