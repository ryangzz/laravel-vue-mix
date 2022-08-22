import { createStore } from 'vuex';
import cashRegister from './stores/cash_register';

const store = createStore({
    state()
    {
        return {            
        }
    },
    mutations: {        
    }, modules: {
        cashRegister
    }
})

export default store;