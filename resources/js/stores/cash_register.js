import cash_register_steps from "../constants/cash_register_steps";
import payment_types from "../constants/payment_types";


const cashRegister = {
    namespaced: true,
    state: () => ({
        businessLine: 1,
        products: [],
        cartItems: [],
        categories: [],
        initialAmount: null,
        sells: [],
        payment: {
            cash: '',
            credit: '',
            credit_ticket:'',
            other_payment: '',
            other_ticket: '',
            cash_payment: '',
            error_change: false,
            error:null,
        },        
        isOpen:true,
        cash_register_step: cash_register_steps.CashRegister
    }),
    mutations: {
        setBusinessLine(state, {businessLine}){
            state.businessLine = businessLine;
        },
        addProduct(state, product){
            state.cartItems.push({...product, quantity: 1});
        },
        removeProduct(state, productId){
            
        },
        updateProductQuantity(state, {productId, quantity}){
            const item = state.cartItems.find(item => {
                return item.id == productId
            });

            item.quantity = quantity;
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
        addProduct({state, commit}, {product,}){            
            const item = state.cartItems.find(item => {
                return item.id == product.id
            });
            
            if(item == null){
                commit('addProduct', product)                
            }else{
                commit('updateProductQuantity', { productId: product.id, quantity: item.quantity + 1 })
            }
        },
        updateProductQuantity({state, commit}, {product, quantity}){
            commit('updateProductQuantity', { productId: product.id, quantity: quantity })            
        },
        deleteProduct({state, commit}, { productId}){
            const itemIndex = state.cartItems.findIndex(item => {
                return item.id == productId
            });
            
            state.cartItems.splice(itemIndex, 1);
        },
        deleteAllProducts({state}){
            state.cartItems = [];
        },
        searchByCode({state, dispatch}, {code}){
            const product = state.products.find(p => Number(p.code) == Number(code));

            if(product){
                dispatch('addProduct', { product })
            }
        },
        closeCashRegister({state}, {finalAmount}){            
            state.isOpen = false;
        },
        generateSell({state, commit}){            
        },
        async switchBusinessLine({state, commit}, { businessLine}){
            let file = '';
            console.log(businessLine);
            switch (businessLine) {
                case 1:
                    file='/dummy_data/fruteria.json';    
                    break;
                case 2:
                    file='/dummy_data/barber.json';    
                    break;
                case 3:
                    file='/dummy_data/ferreteria.json';    
                    break;
                case 4:
                    file='/dummy_data/six.json';    
                    break;
                case 5:
                    file='/dummy_data/ropa.json';    
                    break;
                case 7:
                    file='/dummy_data/gimnasio.json';    
                    break;
                case 8:
                    file='/dummy_data/restaurante.json';    
                    break;
                case 9:
                    file='/dummy_data/local.json';    
                    break;
                case 10:
                default:
                    file='/dummy_data/otros.json';    
                    break;
                                            
            }       
                             
            const { categories, products} = (await (await fetch(file)).json());            

            state.products = products;
            state.categories = categories;
            state.businessLine = businessLine;
        },
        async stablishTotalAmount({state, getters, commit}, {payment_type}){
            switch (payment_type) {
                case payment_types.CASH:   
                    state.payment.cash = getters.total;
                    state.payment.credit = '';                  
                    state.payment.other_payment = '';
                    break;

                case payment_types.CREDIT:                
                    state.payment.cash = '';
                    state.payment.credit = getters.total;                  
                    state.payment.other_payment = '';
                    break;
                
                case payment_types.OTHER:                
                    state.payment.cash = '';
                    state.payment.credit = '';                  
                    state.payment.other_payment = getters.total;
                    break;
            
                default:
                    console.warn('payment_type unknown');
                    break;
            }
        },
        async removeAmountToTypePayment({state, getters, commit}, {payment_type}){
            switch (payment_type) {
                case payment_types.CASH:   
                    state.payment.cash = '';                    
                    break;

                case payment_types.CREDIT:                                    
                    state.payment.credit = '';                                      
                    break;
                
                case payment_types.OTHER:                                    
                    state.payment.other_payment = '';
                    break;            
                default:
                    console.warn('payment_type unknown');
                    break;
            }
        },
        async stablishRemaining({state, getters, commit}, {payment_type}){
            switch (payment_type) {
                case payment_types.CASH:   
                    state.payment.cash = getters.amountToEstablish;                    
                    break;

                case payment_types.CREDIT:                                    
                    state.payment.credit = getters.amountToEstablish;
                    break;
                
                case payment_types.OTHER:                                    
                    state.payment.other_payment = getters.amountToEstablish;
                    break;            
                default:
                    console.warn('payment_type unknown');
                    break;
            }
        },

    },
    getters: {
        total({cartItems}){
            return parseFloat(cartItems.reduce((previousValue, currentValue) =>{                
                return previousValue + Number(currentValue.price) * Number(currentValue.quantity);
            }, 0)).toFixed(2)       
        },
        totalQuantityItems({cartItems}){
            return cartItems.reduce((previousValue, currentValue) =>{
                return previousValue + currentValue.quantity;
            }, 0)
        },
        amountToEstablish({payment}, {total}){            
            return parseFloat(total) - parseFloat(payment.cash != '' ? payment.cash : 0 ) - parseFloat(payment.credit != '' ? payment.credit : 0) - parseFloat(payment.other_payment != '' ? payment.other_payment : 0);
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