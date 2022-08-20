interface Cart{


    items: Array<CartItem>,

    cash: number,
    credit_card: number,
    credit_card_folio: string,

    indistinct_payment_method: number,
    indistinct_payment_method_description: string,    
}