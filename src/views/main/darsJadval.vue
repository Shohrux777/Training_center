<template>
  <div class="mainPageForRegistration mt-4">
    <h5 class="ml-4  py-2  text_color ">  {{option.fio}}</h5>
    <loaderTable v-if="loading_jadval"/>
    <div v-else class="weekdays row_w w-100">
      <div class="dayTimes w-100" id="daytimes">
        <div class="time_name"></div>
        <div class="times" v-for="(item,k) in hour" :key="k" >
          <span v-if="k%2==0">{{item.time}}</span>
        </div>
      </div>
      <div class="col_12" v-for="(day,i) in week" :key="i">
        <div class="dayTimes border w-100">
          <div class="day_name ">
            <span>{{day.name}}</span>
          </div>
          <div class="times " v-for="(time, j) in day.hour" :key="j" :class="{'bg-primary': time.hourtype}" >
            <div class="avtiveTimes" v-if="time.classtype" :style="{'width': time.diff + 'px'}">
              <span > {{time.begin_time}}</span> <span class="ml-3">{{time.end_time}}</span>
              <div class="w-100">
                <span>{{time.group_name}}</span>
              </div>
              <div class="w-100">
                <button @click="AddClientToGP(time)" class="btn_week">Доб. ученика</button>
              </div>
              <div class="info" style="position:absolute; top:5px; right:5px; cursor:pointer;" @click="getItem(time)">
                <mdb-icon icon="info-circle" style="font-size:18px;" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-train  :show="add_client_to_group" headerbackColor="white"  titlecolor="black" :title="$t('add_client_to_gp')" 
      @close="add_client_to_group = false" width="500px">
        <template v-slot:body>
          <addClientToGroup v-if="add_client_to_group"  @close="add_client_to_group = false" :group="group"/>
        </template>
    </modal-train>
    
    <Toast ref="message"></Toast>
  </div>
</template>

<script>
import addClientToGroup from './group_add_client.vue'
import {mdbIcon} from 'mdbvue'
export default {
  components:{
    mdbIcon,
    addClientToGroup
  },
  data() {
    return {
      group: {},
      add_client_to_group: false,
      loading_jadval: false,
       hour:[
        {
          hourtype:false,
          id:0,
          time: '8:00',
        },
        {
          hourtype:false,
          id:1,
          time: '8:30',
        },
        {
          hourtype:false,
          id:2,
          time: '9:00',
        },
        {
          hourtype:false,
          id:3,
          time: '9:30',
        },
        {
          hourtype:false,
          id:4,
          time: '10:00',
        },
        {
          hourtype:false,
          id:5,
          time: '10:30',
        },
        {
          hourtype:false,
          id:6,
          time: '11:00',
        },
        {
          hourtype:false,
          id:7,
          time: '11:30',
        },
        {
          hourtype:false,
          id:8,
          time: '12:00',
        },
        {
          hourtype:false,
          id:9,
          time: '12:30',
        },
        {
          hourtype:false,
          id:10,
          time: '13:00',
        },
        {
          hourtype:false,
          id:11,
          time: '13:30',
        },
        {
          hourtype:false,
          id:12,
          time: '14:00',
        },
        {
          hourtype:false,
          id:13,
          time: '14:30',
        },
        {
          hourtype:false,
          id:14,
          time: '15:00',
        },
        {
          hourtype:false,
          id:15,
          time: '15:30',
        },
        {
          hourtype:false,
          id:16,
          time: '16:00',
        },
        {
          hourtype:false,
          id:17,
          time: '16:30',
        },
        {
          hourtype:false,
          id:18,
          time: '17:00',
        },
        {
          hourtype:false,
          id:19,
          time: '17:30',
        },
        {
          hourtype:false,
          id:20,
          time: '18:00',
        },
        {
          hourtype:false,
          id:21,
          time: '18:30',
        },
        {
          hourtype:false,
          id:22,
          time: '19:00',
        },
        {
          hourtype:false,
          id:23,
          time: '19:30',
        },
        {
          hourtype:false,
          id:24,
          time: '20:00',
        },
        {
          hourtype:false,
          id:25,
          time: '20:30',
        },
        {
          hourtype:false,
          id:26,
          time: '21:00',
        },
        {
          hourtype:false,
          id:27,
          time: '21:30',
        },
        {
          hourtype:false,
          id:28,
          time: '22:00',
        },

      ],
      week: [
        {
          id:0,
          typeof:false,
          name: 'Понедельник',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:1,
          typeof:false,
          name: 'Вторник',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:2,
          typeof:false,
          name: 'Среда',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:3,
          typeof:false,
          name: 'Четверг',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:4,
          typeof:false,
          name: 'Пятница',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:5,
          typeof:false,
          name: 'Суббота',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:6,
          typeof:false,
          name: 'Воскресенье',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        }
      ],

    }
  },
  props:{
    option: {
      type : Object,
      default(){
        return {}
      }
    },
    type:{
      type : String,
      default : 'text'
    },
  },
  watch:{
    option(){
      console.log('qeweqweqwe')
      console.log(this.option)
      this.changeUserId(this.option.id);
    }
  },
  methods: {
    getItem(data){
      console.log(data)
      this.$router.push('/groupList/' + data.groupId)
    },
    AddClientToGP(option){
      // console.log('option')
      // console.log(option)
      this.group = option
      this.add_client_to_group = true;
    },
    empty(){
     this.week = [
        {
          id:0,
          typeof:false,
          name: 'Понедельник',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:1,
          typeof:false,
          name: 'Вторник',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:2,
          typeof:false,
          name: 'Среда',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:3,
          typeof:false,
          name: 'Четверг',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:4,
          typeof:false,
          name: 'Пятница',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:5,
          typeof:false,
          name: 'Суббота',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        },
        {
          id:6,
          typeof:false,
          name: 'Воскресенье',
          hour:[
            {
              hourtype:false,
              id:0,            
            },
            {
              hourtype:false,
              id:1,            
            },
            {
              hourtype:false,
              id:2,            
            },
            {
              hourtype:false,
              id:3,            
            },
            {
              hourtype:false,
              id:4,
            },
            {
              hourtype:false,
              id:5,
            },
            {
              hourtype:false,
              id:6,
            },
            {
              hourtype:false,
              id:7,
            },
            {
              hourtype:false,
              id:8,
            },
            {
              hourtype:false,
              id:9,
            },
            {
              hourtype:false,
              id:10,
            },
            {
              hourtype:false,
              id:11,
            },
            {
              hourtype:false,
              id:12,
            },
            {
              hourtype:false,
              id:13,
            },
            {
              hourtype:false,
              id:14,
            },
            {
              hourtype:false,
              id:15,
            },
            {
              hourtype:false,
              id:16,
            },
            {
              hourtype:false,
              id:17,
            },
            {
              hourtype:false,
              id:18,
            },
            {
              hourtype:false,
              id:19,
            },
            {
              hourtype:false,
              id:20,
            },
            {
              hourtype:false,
              id:21,
            },
            {
              hourtype:false,
              id:22,
            },
            {
              hourtype:false,
              id:23,
            },
            {
              hourtype:false,
              id:24,
            },
            {
              hourtype:false,
              id:25,
            },
            {
              hourtype:false,
              id:26,
            },
            {
              hourtype:false,
              id:27,
            },
            {
              hourtype:false,
              id:28,
            },

          ]
        }
      ]
    },
    async changeUserId(id){
      try{
        this.loading_jadval = true;
        var daytimes = document.getElementById('daytimes').offsetWidth;
        this.empty();
        console.log('bu uning id si gisoblanadi=====>' + id)
        const response = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/getPaginationByOqituvchiId?page=0&size=100&oqituvchi_id=' + id);
        const data = await response.json();
        console.log(data)
        if(data.items_count>0){
          for(let k=0; k<data.items_list.length; k++){
            console.log(data.items_list[k])
            var beginId = -1;
            var EndId = -1;
            console.log(data.items_list[k].begin_time.slice(3,5))
            if(parseInt(data.items_list[k].begin_time.slice(3,5)) >= 30){
              beginId = ((parseInt(data.items_list[k].begin_time.slice(0,3))-8)*2)+1;
            }
            else{
              console.log('jun')
              beginId = (parseInt(data.items_list[k].begin_time.slice(0,3))-8)*2;
            }

            if(parseInt(data.items_list[k].end_time.slice(3,5)) > 30){
              EndId = ((parseInt(data.items_list[k].end_time.slice(0,3))-8)*2)+1;
            }
            else if(parseInt(data.items_list[k].end_time.slice(3,5)) == 0){
              EndId = ((parseInt(data.items_list[k].end_time.slice(0,3))-8)*2)-1;
            }
            else{
              console.log('test')
              EndId = (parseInt(data.items_list[k].end_time.slice(0,3))-8)*2;
            }
            for(let i=0;i<data.items_list[k].week_days.length;i++){
              for(let j=beginId; j<=EndId;j++){
                this.week[data.items_list[k].week_days[i]].hour[beginId].group_name = data.items_list[k].name
                this.week[data.items_list[k].week_days[i]].hour[beginId].begin_time = data.items_list[k].begin_time.slice(0,5)
                this.week[data.items_list[k].week_days[i]].hour[beginId].end_time = data.items_list[k].end_time.slice(0,5)
                this.week[data.items_list[k].week_days[i]].hour[beginId].diff = ((daytimes)/30) * (EndId-beginId+1);
                this.week[data.items_list[k].week_days[i]].hour[beginId].classtype = true;
                this.week[data.items_list[k].week_days[i]].hour[j].hourtype = true;
                this.week[data.items_list[k].week_days[i]].hour[j].groupId = data.items_list[k].id;
                var groupId = {
                name: 'test' 
                }
                this.week[data.items_list[k].week_days[i]].hour.push(groupId)
                this.week[data.items_list[k].week_days[i]].hour.splice(this.week[data.items_list[k].week_days[i]].hour.length-1, 1)
              }
            }
            
            console.log(beginId)
            console.log(EndId)
            console.log(this.week)
          }
        }
        // else{

        // }
        this.loading_jadval = false;
      }
      catch{
        this.$refs.message.error('network_ne_connect')
        this.loading_jadval = false;
      }
    }
  },
  // async mounted() {
  //   var daytimes = document.getElementById('daytimes').offsetWidth
  //   console.log(daytimes)
  //   const res = await fetch(this.$store.state.hostname + '/OquvMarkazPupilGroups/' + 3);
  //     const data = await res.json();
  //     if(data.id){
  //       console.log(data)
  //       var beginId = -1;
  //       var EndId = -1;
  //       console.log(data.begin_time.slice(3,5))
  //       if(parseInt(data.begin_time.slice(3,5)) >= 30){
  //         beginId = ((parseInt(data.begin_time.slice(0,3))-8)*2)+1;
  //       }
  //       else{
  //         console.log('jun')
  //         beginId = (parseInt(data.begin_time.slice(0,3))-8)*2;
  //       }

  //       if(parseInt(data.end_time.slice(3,5)) > 30){
  //         EndId = ((parseInt(data.end_time.slice(0,3))-8)*2)+1;
  //       }
  //       else if(parseInt(data.end_time.slice(3,5)) == 0){
  //         EndId = ((parseInt(data.end_time.slice(0,3))-8)*2)-1;
  //       }
  //       else{
  //         console.log('test')
  //         EndId = (parseInt(data.end_time.slice(0,3))-8)*2;
  //       }
  //       for(let i=0;i<data.week_days.length;i++){
  //         for(let j=beginId; j<=EndId;j++){
  //           this.week[data.week_days[i]].hour[beginId].group_name = data.name
  //           this.week[data.week_days[i]].hour[beginId].begin_time = data.begin_time.slice(0,5)
  //           this.week[data.week_days[i]].hour[beginId].end_time = data.end_time.slice(0,5)
  //           this.week[data.week_days[i]].hour[beginId].diff = ((daytimes)/30) * (EndId-beginId+1);
  //           this.week[data.week_days[i]].hour[beginId].classtype = true;
  //           this.week[data.week_days[i]].hour[j].hourtype = true;
  //           this.week[data.week_days[i]].hour[j].groupId = data.id;
  //           var groupId = {
  //           name: 'test' 
  //           }
  //           this.week[data.week_days[i]].hour.push(groupId)
  //           this.week[data.week_days[i]].hour.splice(this.week[data.week_days[i]].hour.length-1, 1)
  //         }
  //       }
        
  //       console.log(beginId)
  //       console.log(EndId)
  //       console.log(this.week)
  //     }
  // },
}
</script>

<style>
.mainPageForRegistration{
  background: #fff;
}
.dayTimes{
  display: flex;
}
.times{
  width: calc(100% / 28);
  position: relative;

}
.avtiveTimes{
  position: absolute;
  border-left: 1px solid #fff;
  top: 0;
  left:2%;
  right: 2%;
  z-index:11;
  height: 100px;
  background: rgba(29, 255, 29, 0);
  text-align: center;
  padding-top:10px;
  color:white
  
}

.avtiveTimes:hover{
  z-index:11;
  height: 100px;
  background: rgba(20, 20, 20, 0.4);
  
}
.avtiveTimes:hover .btn_week{
    opacity: 1;
  }
.times span{
  font-size: 13px;
}
.day_name{
  width: 40px;
  height: 100px;
  position: relative;
  transform: rotate(90deg);
  
}
.time_name{
  width: 40px;
}
.day_name span{
  display: block;
  font-size: 12px;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn_week{
  outline: none;
  opacity: 0;
  border:none;
  border: 0.5px solid white;
  border-radius:3px;
  margin-top:5px;
  background: rgba(0, 0, 0,0.1);
  color:rgb(238, 238, 238);
  font-size: 11.5px;
  padding: 3px 8px;
  
}
.btn_week:focus{
  outline: none;
}
.btn_week:hover{
  background: rgba(0, 0, 0,0.4);
  color:white;
}

/* .day_name p{
  color: brown;
  position: absolute;
  left: -20px;
  transform: rotate(90deg);
  top:50px;
} */
.text_color{
  color: rgb(0, 0, 102);
  font-weight: 500;
  border-bottom: 1px solid rgb(0, 0, 102);
}
</style>