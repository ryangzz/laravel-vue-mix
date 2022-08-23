<template>
  <div class="card">
    <div class="card-header d-flex align-items-center">
      <button v-if="cash_register_steps.CashRegister == cash_register_step" class="btn btn-link p-0" @click="setCashRegisterStep1">
        <i class="fas fa-arrow-left mr-3"></i>
      </button>
      <i v-else class="fas fa-home mr-3 text-primary"></i>
      <h3 class="card-title">{{ title }}</h3>
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
import { mapGetters, mapMutations, mapState } from "vuex";

import SummaryCashRegister from './components/SummaryCashRegister.vue';
import CashRegister        from './components/CashRegister.vue';
import cash_register_steps from "../constants/cash_register_steps";


export default defineComponent({
  data(){
    return {      
      cash_register_steps
    };
  },
  computed:{
    ...mapState('cashRegister', ['cash_register_step', 'isOpen']),
    ...mapGetters('cashRegister', ['title']),
  },  
  methods:{
    ...mapMutations('cashRegister', ['setCashRegisterStep1'])
  },
  components:{
    SummaryCashRegister,
    CashRegister,
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