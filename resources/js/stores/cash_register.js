import cash_register_steps from "../constants/cash_register_steps";


const cashRegister = {
    namespaced: true,
    state: () => ({
        products: [],
        initialAmount: null,
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
        openCashRegister({state}, {initialAmount}){
            state.cash_register_step = cash_register_steps.CashRegister;            
            state.initialAmount = initialAmount;
            state.isOpen = true;
        },
        closeCashRegister({state}, {finalAmount}){            
            state.isOpen = false;
        },
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