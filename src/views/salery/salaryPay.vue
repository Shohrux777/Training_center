<template>
  <div >
    <div class="payList">
      <div class="px-3 pb-2 pt-3 mb-3 border-bottom">
        <div class="row">
          <div class="col-12">
          <div class="">
            <span class="font-weight-bold">Бонус к зарплате</span> <span class="ml-2"></span>
          </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          
        </div>
      </div>

    <div class="px-2 py-3">
        <loader v-if="loading"/>
        <table class="myTablePayedSalary">
          <thead>
            <tr class="header ">
              <th  width="40" class="text-left">№</th>
              <th width="200">{{$t('teacher')}}</th>
              <th>{{$t('phone')}}</th>
              <th>{{$t('summ')}}</th>
              <!-- <th>{{$t('real_summ')}}</th> -->
              <th width="190" class="text-center ">{{$t('Action')}}</th>
        

            </tr>
          </thead>
          <tbody>
            <tr v-for="(row,rowIndex) in clientList" :key="rowIndex" >
              <td> <span >{{rowIndex+1}}</span> </td>
              <td> <span >{{row.user.fio}}</span> </td>
              <td> <span >{{row.user.phone_number}}</span> </td>
              <!-- <td> <span >{{row.summ}}</span> </td> -->
              <td> <span >{{row.real_summ.toFixed(2)}}</span> </td>
              
              <td class="text-right mr-2 d-flex">
                <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 8px;" color="success"  @click="payTeacher(row)" :data-row="rowIndex"
                  size="sm">{{$t('pay')}}</mdb-btn>
                  <mdb-btn class="mr-1 py-1 px-2"  style="font-size: 8px;" color="warning"  @click="$router.push('/salary_datail/'+ row.id)" :data-row="rowIndex"
                  size="sm">{{$t('show')}}</mdb-btn>
              </td>
              

            </tr>
          </tbody>
        </table>
    </div>
    </div>
    <modal-train  :show="pay_show" headerbackColor="white"  titlecolor="black" :title="user_name" 
        @close="pay_show = !pay_show" width="550px">
          <template v-slot:body>
            <div class="p-4" >
              <div style="position:relative;" class="mt-2">
                <input-icon v-model="price" type="number" valid icon="dollar-sign"></input-icon>
                <small style="position:absolute; top:-19px; left:8px; color:#747474;">Cумма выплаты</small>
              </div>
              <div class=" mt-3" style="position:relative;">
                <div class="d-flex justify-content-start align-items-center pt-2">
                  <erpSelectReg
                    :options="salaryType"  
                    @select="selectOptionReg"
                    :selected="salary_type"
                    :label="$t('company')"
                  />
                  <small style="position:absolute; top:-9px; left:8px; color:#747474; font-size:13px;">{{$t('salary_type')}}</small>
                </div>
              </div>
              <div class="mt-3 mb-2 text-right border-top">
                <mdb-btn  @click="submit_pay" color="primary" m="t2" style="font-size: 10.5px"
                  p="r5 l5 t2 b2"> Оплата
                </mdb-btn>
              </div>
              
            </div>
          </template>
      </modal-train>
    <Toast ref="message"></Toast>
 </div>
</template>

<script>
import {mdbBtn} from 'mdbvue'
import erpSelectReg from "../../components/erpSelect.vue";
import {mapActions, mapGetters} from 'vuex'
export default {
  components:{
    mdbBtn, erpSelectReg
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
      price: null,

      pay_show: false,
      bonus_id: null,
      user_name: '',
      salary_type: '',
      salary_type_id: null,

      salaryType: [
        {
          name: 'Премия',
          id: 1
        },
        {
          name: 'Аванс',
          id: 2
        },
        {
          name: 'Зарплата',
          id: 3
        }
      ]
    }
  },
  
  async mounted() {
    await this.update();
  },
  computed: mapGetters(['allGroups']),

  methods: {
    ...mapActions(['fetchGroups', ]),

    selectOptionReg(option){
      this.salary_type = option.name;
      this.salary_type_id = option.id;
    },

    async update(){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazUserSalary/getPagination?page=0&size=1000');
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        if(data){
          this.clientList = data.items_list
          // this.$refs.message.success('Added_successfully')
          this.loading = false;
          console.log(this.clientList)
        }
        
      }
      catch{
        this.loading = false;
        this.$refs.message.error('network_ne_connect')
      }
    },
    async payTeacher(option){
      console.log('option')
      console.log(option)
      this.pay_show = true;
      this.bonus_id = option.id;
      this.user_name = option.user.fio;
    },
    async submit_pay(){
      try{
        this.loading = true;
        const res = await fetch(this.$store.state.hostname + '/OquvMarkazUserSalary/paySalaryForUser?id=' + this.bonus_id + '&cash_summ=' + this.price + '&card_summ=' + this.salary_type_id);
        const data = await res.json();
        console.log('this is by id')
        console.log(data)
        if(data){
          this.$refs.message.success('Added_successfully')
          this.loading = false;
          this.price = null;
          this.bonus_id = null;
          this.pay_show =false;
          await this.update();
        }
        
      }
      catch{
        this.loading = false;
        this.$refs.message.error('network_ne_connect')
      }
    }
  
  },
}
</script>

<style lang="scss">


.myTablePayedSalary {
  /* border-collapse: collapse; */
  table-layout:fixed;
  width: 100%;
  overflow: hidden;
  // border: 1px solid #ddd;
  font-size: 18px;
  max-height:80px; overflow-x:auto
}
.myTablePayedSalary th{
  font-weight: 600;
  font-size:11px;
}
.myTablePayedSalary td{
  font-size:11.5px;
}
.myTablePayedSalary th, .myTablePayedSalary td {
  text-align: left;
  padding: 2px 10px;
}
.myTablePayedSalary tr {
  border-bottom: 1px dashed rgb(156, 162, 255);
}
.myTablePayedSalary tr:hover {
  background: #eee;
}

.myTablePayedSalary tr.header, .myTablePayedSalary tr:hover {
  // background-color: #f1f1f1;
}
.delIcon{
  color: rgb(251, 70, 70);
  font-size: 13px;
}

</style>