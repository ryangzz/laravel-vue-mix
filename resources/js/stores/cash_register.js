import cash_register_steps from "../constants/cash_register_steps";


const cashRegister = {
    namespaced: true,
    state: () => ({
        products: [],
        sells: [],
        isOpen:false,
        cash_register_step: cash_register_steps.SummaryCashRegister
    }),
    mutations: {
        addProduct(state, product){

        },
        removeProduct(state, productId){

        },
        addProductQuantity(state, {productId, addition}){
            
        },
        setCashAmount(state, {amount}){

        },
        setCreditCardAmount(state, {amount, folio}){
            
        },
        setCashClientPayment(state, {amount}){
        },
        setCashRegisterStep1(state,){
            state.cash_register_step = cash_register_steps.SummaryCashRegister;
        },
        setCashRegisterStep2(state,){            
            state.cash_register_step = cash_register_steps.CashRegister;
        }
    },
    actions: {
        generateSell({state, commit}){

        }
    },
    getters: {
        total(){

        },
        amountToEstablish(){

        },
        changeCashAmount(){

        },
        title(state){
            if(state.cash_register_step == cash_register_steps.CashRegister){
                return 'Generar Venta';
            }
    
            return 'Crear Caja';
        }
    }
}

export default cashRegister;