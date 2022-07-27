<template>
  <div class="today_clients">
    <loader v-if="loading"/>
    <div v-else class="TablePatientDocId p-3">
          <table class="myTable">
            <thead>
              <tr class="header ">
                <th  width="40" class="text-left">№</th>
                <th>{{$t('passport_number')}}</th>
                <th >{{$t('client_name')}}</th>
                <th>{{$t('phone')}}</th>
                <th>{{$t('phone_number_1')}}</th>
                <th >{{$t('phone_number_2')}}</th>
                <!-- <th >{{$t('address')}}</th> -->
                <th >{{$t('free_day')}}</th>
                <th >{{$t('free_time')}}</th>
                <th>{{$t('level')}}</th>
                <th>{{$t('contragent')}}</th>
                <th  width="80">{{$t('Action')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,rowIndex) in client_list_by_date" :key="rowIndex">
                <td> <span >{{rowIndex+1}}</span> </td>
                <td> <span >{{row.passport_number_str}}</span> </td>
                <td> <span >{{row.fio}}</span> </td>
                <td> <span >{{row.phone_number}}</span> </td>
                <td> <span >{{row.phone_number_1}}</span> </td>
                <td> <span >{{row.phone_number_2}}</span> </td>
                <td>
                  <div class="day_item d-flex" >
                    <div class="day_week_item_string" v-for="(link,k) in row.free_days" :key="k">
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 0">Пт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 1">Вт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 2">Ср </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 3">Чт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 4">Пт </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 5">Сб </span>
                      <span style="font-size: 11px;" class="mr-1" v-if ="link == 6">Вс </span>
                    </div>
                  </div>
                </td>
                <td> <span >{{row.free_time}}</span> </td>
                <td> <span >{{row.client_type.name}}</span> </td>
                <td> <span ><mdb-icon fab :icon="row.contragent.icon_base_64_str" :style="{'color': row.contragent.note}" class="mr-2"/> {{row.contragent.name}}</span> </td>

                <td class="text-center mr-2">
                  <mdb-btn class="mr-1 py-1 px-3"  style="font-size: 8px;" color="primary"  @click="testResult(row)" :data-row="rowIndex"
                    size="sm">{{$t('testResult')}}
                  </mdb-btn>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
      <modal-train  :show="show_test" headerbackColor="light"  titlecolor="black" :title="$t('Add_test')" 
        @close="show_test = false" width="550px">
          <template v-slot:body>
            <testResult @close="show_test = false" :client="client_info"></testResult>
          </template>
      </modal-train>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import testResult from './testResult.vue'
import {mdbBadge, mdbBtn, mdbIcon} from 'mdbvue'
import {mapActions, mapGetters} from 'vuex'
export default { 
components:{
  mdbBadge,
  mdbBtn,
  mdbIcon,
  testResult
},
data() {
  return {
    loading:false,
    clientListToday: [],
    show_test : false,
    client_info: {},
  }
},
async mounted() {
  this.loading = true;
  let a = {
    begin: "",
    end: '',
  }
  let bat = new Date();
  a.begin =bat.toISOString().slice(0,10) + 'T00:00:00.000Z';
  a.end = bat.toISOString().slice(0,10) + 'T23:59:59.000Z';
  try{
    await this.fetchClientListByDate(a)
    this.loading = false;
  }
  catch{
    this.$refs.message.error('network_ne_connect')
    this.loading = false;
  }
  // this.update();

},
computed: mapGetters(['client_list_by_date']),
methods: {
  ...mapActions(['fetchClientListByDate']),
  async update(){
    try{
      const response = await fetch(this.$store.state.hostname + "/OquvMarkazClient/getPaginationWaiting?page=0&size=100");
      const data = await response.json();
      console.log('today client')
      console.log(data)
      this.clientListToday = data.items_list
      this.loading = false;

    }
    catch{
      this.$refs.message.error('network_ne_connect')
      this.loading = false;
    }
  },

  testResult(option){
    this.show_test = true;
    console.log('fsdfsd')
    console.log(option)
    this.client_info = {fio: option.fio, id: option.id}
    // this.
  }
},
}
</script>

<style lang="scss">
.TablePatientDocId{
    // height: 400px;
    // overflow: hidden;
    // overflow-y: auto;
    // border: 1px solid #ddd;
  }
  .myTable {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTable th{
  font-weight: 600;
  font-size:11.5px;
}
.myTable td{
  font-size:12px;
}
.myTable th, .myTable td {
  text-align: left;
  padding: 7px;
}

.myTable tr {
  border-bottom: 1px solid rgb(240, 240, 240);
}

.myTable tr.header, .myTable tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}
</style>