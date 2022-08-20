<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
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

<script lang="ts">
import { defineComponent } from "vue";

import SummaryCashRegister from './components/SummaryCashRegister.vue';
import CashRegister        from './components/CashRegister.vue';

export default defineComponent({
  data(){
    return {      
      componentStep: ComponentOptions.CashRegister
    };
  },
  computed:{
    title() {
      if(this.componentStep == ComponentOptions.CashRegister){
        return 'Generar Venta';
      }

      return 'Crear Caja';
    }
  },  
  methods:{
    cash_register_created(): void{
      this.componentStep = ComponentOptions.CashRegister;
    }
  },
  components:{
    SummaryCashRegister,
    CashRegister,
  }
});

enum ComponentOptions {
  SummaryCashRegister = "SummaryCashRegister",
  CashRegister = "CashRegister",
}
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