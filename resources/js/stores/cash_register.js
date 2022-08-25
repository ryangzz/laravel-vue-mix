import cash_register_steps from "../constants/cash_register_steps";


const cashRegister = {
    namespaced: true,
    state: () => ({
        businessLine: 1,
        products: [],
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