<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Abrir Caja</h3>
    </div>
    <div class="card-body">
      <Transition v-if="current_step == 1">      
        <summary-cash-register @cash-register-created="cash_register_created" ></summary-cash-register>
      </Transition>

      <Transition v-if="current_step == 2">
        <p>Hola</p>
      </Transition>
    </div>
  </div>
</template>

<script>
import SummaryCashRegister from './components/SummaryCashRegister.vue';
export default {
  data(){
    return {
      current_step : 1,
    };
  },
  methods:{
    cash_register_created(){
      this.current_step = 2;
    }
  },
  components:{
    SummaryCashRegister
  }
};
</script>

<style lang="scss" scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>