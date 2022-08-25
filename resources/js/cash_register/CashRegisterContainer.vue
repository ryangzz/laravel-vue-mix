<template>
  <div class="card">
    <div class="card-header d-flex align-items-center">
      <button v-if="cash_register_steps.CashRegister == cash_register_step" class="btn btn-link p-0" @click="setCashRegisterStep1">
        <i class="fas fa-arrow-left mr-3"></i>
      </button>
      <i v-else class="fas fa-home mr-3 text-primary"></i>
      <h3 class="card-title mr-3">{{ title }}</h3>

      <Dropdown :options="businessLines" v-model="businessLine" option-label="name" option-value="id" placeholder="Select a business line"></Dropdown>
    </div>
    <div class="card-body">
      <transition name="fade">
        <component 
          :is="cash_register_step"          
          >
        </component>
      </transition>     
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

import SummaryCashRegister from './components/SummaryCashRegister.vue';
import CashRegister        from './components/CashRegister.vue';
import cash_register_steps from "../constants/cash_register_steps";

import Dropdown from 'primevue/dropdown';


export default defineComponent({
  mounted(){
    this.switchBusinessLine({ businessLine: this.businessLine} );
  },
  data(){
    return {      
      cash_register_steps,
      businessLine: 1,
      businessLines: [
        {
          id: 1,
          name: "Fruterias",
        },
        {
          id: 2,
          name: "Barber",
        },
        {
          id: 3,
          name: "Ferreterias",
        },
        {
          id: 4,
          name: "Six",
        },
        {
          id: 5,
          name: "Ropa",
        },
        {
          id: 7,
          name: "Gimansios",
        },
        {
          id: 8,
          name: "Restaurantes",
        },
        {
          id: 9,
          name: "Locales (Tipo islas)",
        },
        {
          id: 10,
          name: "Otros",
        },
      ]
    };
  },
  watch:{
    businessLine: function() {      
      this.switchBusinessLine( { businessLine: this.businessLine} );
    }
  },
  computed:{
    ...mapState('cashRegister', ['cash_register_step', 'isOpen']),
    ...mapGetters('cashRegister', ['title']),
  },  
  methods:{
    ...mapMutations('cashRegister', ['setCashRegisterStep1']),
    ...mapActions('cashRegister', ['switchBusinessLine'])
  },
  components:{
    SummaryCashRegister,
    CashRegister,
    Dropdown,
  }
});

</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>