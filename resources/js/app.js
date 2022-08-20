
require('./bootstrap');

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { createStore } from 'vuex';


import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

import ExampleComponent from './components/ExampleComponent.vue';

import CashRegisterContainerComponent from './cash_register/CashRegisterContainer.vue';

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

const app = createApp({
  components:{
    ExampleComponent,
    CashRegisterContainerComponent
  }
})

app.use(PrimeVue);

app.use(store);
app.component('AppDialog', Dialog);
app.component('AppButton', Button);
app.mount("#app");

