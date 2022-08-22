<template>
  <div class="card">
    <div class="card-header d-flex align-items-center">
      <button class="btn btn-link p-0" @click="setCashRegisterStep1">
        <i class="fas fa-arrow-left mr-3"></i>
      </button>
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

export default defineComponent({
  data(){
    return {      
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