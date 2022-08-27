import cash_register_steps from "../constants/cash_register_steps";


const cashRegister = {
    namespaced: true,
    state: () => ({
        businessLine: 1,
        products: [],
        cartItems: [],
        categories: [],
        initialAmount: null,
        sells: [],
        isOpen:false,
        cash_register_step: cash_register_steps.SummaryCashRegister
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
        }

    },
    getters: {
        total({cartItems}){
            return parseFloat(cartItems.reduce((previousValue, currentValue) =>{                
                return previousValue + Number(currentValue.price) * Number(currentValue.quantity);
            }, 0)).toFixed(2)       
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