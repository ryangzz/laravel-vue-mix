<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Abrir Caja</h3>
    </div>
    <div class="card-body">
      <transition name="fade">
        <component 
          :is="componentStep"
          @cash-register-created="cash_register_created"
          >
        </component>
      </transition>     
    </div>
  </div>
</template>

<script >
import SummaryCashRegister from './components/SummaryCashRegister.vue';
import CashRegister        from './components/CashRegister.vue';
export default {
  data(){
    return {
      current_step : 1,
      componentStep: 'SummaryCashRegister'
    };
  },
  methods:{
    cash_register_created(){
      this.componentStep = 'CashRegister';
    }
  },
  components:{
    SummaryCashRegister,
    CashRegister
  }
};
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