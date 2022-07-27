<template>
  <div>
    <div class="border-bottom navbar_sticky">
      <router-link :to="/mentor_page/ + user_id">
        <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            Вернуться к профиль</h5>
      </router-link>
    </div>
    <div class="all_groups p-3 pt-0">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 mt-4" v-for="(item,i) in grouplist" :key="i" @click="$router.push('/groupPupils/'+ item.id)">
          <div class="item_group px-2 shadow rounded">
            <div class="d-flex justify-content-end">
              <div :class="{'client_count': item.opened_group_status ==true, 'client_count_no_active': item.opened_group_status ==false,}">
                <span>12</span>
              </div>
            </div>
            <div class="group_name pl-3 mt-3">
              <p class="mb-1 text-primary">{{item.name}}</p>
              <p class="doctor_name mb-2 ">{{item.user_fio}}</p>
              <p class="open_date ">{{item.begin_time.slice(0,5)}} <span class="ml-2">{{item.end_time.slice(0,5)}}</span></p>
            </div>
            <div class="text-center open_or_close">
              <span v-if="item.opened_group_status == false">начало неизвестно</span>
            </div>

            <div class="days_week">
              <div class="day_item d-flex" >
                <div class="day_week_item_string" v-for="(link,k) in item.week_days" :key="k">
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
                {{(year-parseInt(item.gruppa_opened_date.slice(0,4))) * 12 + month - parseInt(item.gruppa_opened_date.slice(5,7)) +1 }} месяца
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { mdbBtn} from 'mdbvue'

export default {
  components: {
     mdbBtn,
  },
  // props:{
  //   client: {
  //     type: Object,
  //     default(){
  //       return {}
  //     }
  //   },
  // },

  data() {
    return {
      user_id: localStorage.UserId,
      loading: false,
      month: null,
      year: null,
      grouplist: [],
      
    }
  },
  async mounted(){
    console.log(this.user_id)
    await this.getGroups();
    let time = new Date();
    let time2 = new Date();
    this.year = parseInt(time.toISOString().slice(0,4)); 
    this.month = parseInt(time2.toISOString().slice(5,7)); 
    console.log(this.month)
    await this.fetchGroupsPagn();
    console.log('this.allGroupsPagn')
    console.log(this.allGroupsPagn)
  },
  computed: mapGetters(['allGroupsPagn']),
  methods: {
    ...mapActions(['fetchGroupsPagn']),
    async getGroups(){
      try{
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/getPaginationByUserId?page=0&size=100&user_id=' + this.user_id);
        const data = await res.json();
        console.log(data);
        this.grouplist = data.items_list;
        // this.$refs.message.success('Added_successfully')
      }
      catch{
        this.modal_info = this.$i18n.t('network_ne_connect'); 
        this.modal_status = true;
        return false;
      }
    },
  }
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
</style>