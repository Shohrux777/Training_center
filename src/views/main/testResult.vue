<template>
  <div class="EnterTestResult mt-3 mb-3 px-3">
    <loader-table v-if="loading"></loader-table>
    <form v-else @submit.prevent="submit">
      <div class="client_name text-center mb-4">
        <h6 class="border-bottom pb-2 text-primary">{{client.fio}}</h6>
      </div>
      <div class="">
        <ErpSelectIcon
          :options="allTest.rows"  
          @select="selectOption"
          :selected="test_name"
          :label="$t('test')"
        />
        <small v-if="$v.test_name.$dirty && test_id == null" class="invalid-text mt-0 ml-2" >
          {{$t('select_item')}}
        </small>
      </div>
      <div class="mt-3">
        <small class="ml-1" style="font-size:11.5px; color:#858585;">{{$t('qty_question')}}</small>
        <input-icon   v-model="current_value_in_persantage"  validate error="wrong" success="right" />
      </div>
      <div class="mt-3">
        <small class="ml-1" style="font-size:11.5px; color:#858585;">{{$t('qty_answer')}}</small>
        <input-icon   v-model="current_value"  validate error="wrong" success="right"  />
      </div>
      
      <div class="mt-0 mb-0 mt-4 border-top pt-2 text-right">
        <mdb-btn color="success"  type="submit" style="font-size: 10.5px"
          p="r4 l4 t2 b2">
        {{$t('add')}}</mdb-btn>
      </div>
    </form>

     <Toast ref="message"></Toast>
  </div>
</template>

<script>
import ErpSelectIcon from '../../components/erpSelectIcon.vue'
import {mapActions, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { mdbBtn} from 'mdbvue'
import LoaderTable from '../../components/loaderTable.vue'

export default {
  components: {
    ErpSelectIcon, mdbBtn,
    LoaderTable
  },
  validations: {
    test_name: {required},
  },
  props:{
    client: {
      type: Object,
      default(){
        return {}
      }
    },
  },

  data() {
    return {
      loading: false,

      test_name: '',
      test_id: null,
      current_value_in_persantage: 0,
      current_value: 0,
    }
  },
  async mounted(){
    await this.fetchTest();
  },
  computed: mapGetters(['allTest']),
  methods: {
    ...mapActions(['fetchTest']),
    selectOption(option){
      console.log(option)
      this.test_name = option.name;
      this.test_id = option.id;
    },
    cls_wnd()
    {
      this.current_value = 0;
      this.current_value_in_persantage = 0;
    },
    async submit(){
      if(this.$v.$invalid)
      {
        this.$v.$touch();
        this.$refs.message.warning('please_fill')
        return false;
      }
      const requestOptions = {
        method : "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
          "oquvMarkazTestid" : this.test_id,
          "oquvMarkazClientid": this.client.id,
          "current_value": this.current_value,
          "current_value_in_persantage": this.current_value_in_persantage,
          "id" : 0,
        })
      };
      try{
        this.loading = true;
        const response = await fetch(this.$store.state.hostname + "/OquvMarkazClient/addOquvMarkazTestResult", requestOptions);
        const data = await response.text();
        console.log(data)
        this.loading = false;
        if(response.status == 201 || response.status == 200)
        {
          this.$refs.message.success('Added_successfully')
          this.cls_wnd();
          this.$emit('close')
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

<style>

</style>