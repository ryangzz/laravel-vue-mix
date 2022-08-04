
require('./bootstrap');

import { createApp } from 'vue'
import ExampleComponent from './components/ExampleComponent.vue';

import CashRegisterContainerComponent from './cash_register/CashRegisterContainer.vue';

const app = createApp({
  components:{
    ExampleComponent,
    CashRegisterContainerComponent
  }
})

app.mount("#app");

