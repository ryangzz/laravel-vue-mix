<template>
  <div class="container-fluid">
    
    <div class="row">
      
      <div class="col-md-8">
        <Sidebar v-model:visible="visibleRight" :base-z-index="10000" position="right">
				  <h4 class="font-weight-normal">Por establecer: $240.00</h4>
          
          <div class="mb-4">
            <h5>Efectivo <i class="fas fa-money-bill-wave"></i></h5>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">$</span>
                <AppInput class="p-inputtext-sm" placeholder="0.00"></AppInput>
                <AppButton class="p-button-help" v-tooltip.top="'Establecer restante'" icon="far fa-hand-lizard"></AppButton>
                <AppButton v-tooltip="'Quitar todo'" icon="fas fa-hand-holding"></AppButton>
            </div>
          </div>

          <div class="mb-4">
            <h5>Tarjeta de credito <i class="far fa-credit-card"></i></h5>
            <div class="p-inputgroup">                
                <span class="p-inputgroup-addon">$</span>
                <AppInput class="p-inputtext-sm" placeholder="0.00"></AppInput>                
                <AppButton class="p-button-help" v-tooltip.top="'Establecer restante'" icon="far fa-hand-lizard"></AppButton>
                <AppButton v-tooltip="'Establecer todo'" icon="fas fa-hand-holding-usd"></AppButton>                
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0">Folio:</h6>
              <AppInput style="height:30px" type="text" class="mt-1" placeholder="#ticket, folio, etc"></AppInput>
            </div>

          </div>

          <div class="mb-4">
            <Fieldset legend="Otros" :toggleable="true" :collapsed="true">

              <!-- <h5>Otro <i class="fas fa-pen"></i></h5> -->
              <div class="p-inputgroup">                
                  <span class="p-inputgroup-addon">$</span>
                  <AppInput class="p-inputtext-sm" placeholder="0.00"></AppInput>
                  <AppButton class="p-button-help" v-tooltip.top="'Establecer restante'" icon="far fa-hand-lizard"></AppButton>
                  <AppButton v-tooltip="'Establecer todo'" icon="fas fa-hand-holding-usd"></AppButton>
              </div>
              <div class="d-flex justify-content-end align-items-center">                
                <AppInput style="height:30px" type="text" class="mt-1" placeholder="Cheque, credito, cupon, etc."></AppInput>
              </div>
              <hr>
              <h5>Cambio <i class="fas fa-coins"></i></h5>
              <div class="d-flex justify-content-between">                                
                <InputNumber currency="USD" locale="en-US" class="p-inputtext-sm" style="width:40%" placeholder="Pagará con:"></InputNumber>                
                <AppInput disabled class="p-inputtext-sm text-right" style="width:40%" placeholder="Cambio:"></AppInput>                
              </div>
            </Fieldset>
          </div>

          <AppButton @click="makePayment" class="p-button-rounded w-100 p-button-success mt-4 d-flex justify-content-center">
              Generar venta <i class="ml-2 pi pi-check "></i>  
          </AppButton>            
          
	      </Sidebar>
        <Card>
          <template #content>
            <div class="p-inputgroup">
                <span class="p-input-icon-left w-100">
                  <i class="fas fa-barcode"></i>
                  <input
                    ref="inputBarcode"
                    class="p-inputtext p-component w-100"
                    type="number"
                    @keyup.enter="submitSearchCode"
                    v-model="searchCodeInput"
                    placeholder="Busqueda por código"
                  />
                </span>
                <AppButton @click="submitSearchCode" icon="pi pi-search" class="p-button-secondary"></AppButton>
            </div>
            
            <Divider></Divider>
            <div class="d-flex flex-sm-row flex-column justify-content-between my-2">
              <h4>Favoritos</h4>
              <span class="p-input-icon-right">
                <i class="pi pi-search"></i>
                <AppInput
                  v-model="searchTextFavorites"
                  class="p-inputtext-sm"
                  placeholder="Busqueda por favoritos"
                ></AppInput>
              </span>
            </div>
            <Carousel
              :value="productsFiltered"
              :num-visible="3"
              :num-scroll="3"
              :responsive-options="responsiveOptions"
            >
              <template #item="slotProps">
                <h6 class="mb-1 font-weight-bold">{{ slotProps.data.name }}</h6>
                <div
                  class="
                    pr-4
                    d-flex
                    justify-content-between
                    align align-items-center
                  "
                >
                  <p>${{ slotProps.data.price }}</p>
                  <AppButton
                    @click="addCart(slotProps.data)"
                    icon="pi pi-shopping-cart"
                    class="p-button-rounded p-button-success p-button-outlined"
                  />
                </div>
              </template>
            </Carousel>

            <Divider></Divider>
            <div class="d-flex justify-content-between my-2">
              <h4>Categorias</h4>
            </div>
            <div class="container">
              <div class="row">
                <div
                  class="col-sm-6 col-lg-4"
                  v-for="(category, idx) of categories"
                  :key="category.label"
                >
                  <AppButton
                    @click="openCategoryModal(category)"
                    :class="getColorCategory(idx)"
                    type="button"
                    :icon="category.icon"
                    iconPos="right"
                    :label="category.label"
                    class="w-100 text-left mr-2 mb-2"
                  ></AppButton>
                </div>
              </div>
            </div>
          </template>
          <template #footer> </template>
        </Card>
      </div>

      <div class="col-md-4 h-100">
        <Card class="right-panel">
          <template class="pedo" #content>
            <h4>Total: <strong>${{total}}</strong></h4>
            <p v-if="cartItems.length == 0">Sin productos</p>
            <div v-else class="product-scroll">
              <div class="px-1" v-for="item of cartItems" :key="item.id">
                <div class="d-flex justify-content-between">
                  <h6 class="w-50">{{ item.name }}</h6>
                  <div
                    class="w-50 d-flex align-items-center justify-content-end"
                  >
                    <p
                      style="font-size: 2.8vh"
                      class="text-muted mb-0 font-weight-lighter"
                    >
                      ${{ parseFloat(item.price).toFixed(2) }}/u.
                    </p>
                    <p class="mx-1 mb-0">-</p>
                    <p class="font-weight-bold mb-0">${{ parseFloat(item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="w-75 p-inputgroup" style="height: 5.5vh">
                    <AppButton
                      icon="pi pi-plus"
                      class="p-button-info p-button-sm"
                      @click="addQuantity(item)"
                    ></AppButton>
                    <InputNumber
                      class="p-inputtext-sm text-center"
                      placeholder="Cantidad"
                      min="1"
                      v-model="item.quantity"
                    ></InputNumber>
                    <AppButton
                      @click="subQuantity(item)"
                      :disabled="item.quantity == 1"
                      icon="pi pi-minus"
                      class="p-button-warning p-button-sm"
                    ></AppButton>
                  </div>
                  <div class="w-25 text-right">
                    <AppButton
                      @click="deleteProduct({productId: item.id})"
                      style="height: 5.5vh"
                      icon="pi pi-trash"
                      class="p-button-sm p-button-danger"
                    />
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <AppButton @click="makePayment" class="p-button-rounded w-100 p-button-success mt-4 d-flex justify-content-center">
              Pagar <i class="ml-2 pi pi-money-bill "></i>  
            </AppButton>            
          </template>
        </Card>
      </div>
    </div>
  </div>

  <AppDialog
    :maximizable="true"
    :draggable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    v-model:visible="displayModalSearchProducts"
  >
    <template #header>
      <h3>¡Varios Productos fueron encontrados con ese codigo!</h3>
    </template>

    <div class="w-100">
      <Listbox
        :options="products"
        :filter="true"
        option-label="name"
        class="w-100"
        list-style="max-height:250px"
        filter-placeholder="Buscar"
      >
        <template #option="slotProps">
          <div class="d-flex justify-content-between">
            <p>{{ slotProps.option.name }} - $ {{ slotProps.option.price }}</p>
            <AppButton
              @click="addCart(slotProps.option)"
              icon="pi pi-shopping-cart"
              class="p-button-rounded p-button-success p-button-outlined"
            />
          </div>
        </template>
      </Listbox>
    </div>
  </AppDialog>

  <AppDialog
    :maximizable="true"
    :draggable="false"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    v-model:visible="displayModalProductsCategory"
  >
    <template #header>
      <h3>{{ titleCategoryModal }}</h3>
    </template>

    <div class="w-100">
      <Listbox
        :options="productsCategorySelected"
        :filter="true"
        option-label="name"
        class="w-100"
        list-style="max-height:250px"
        filter-placeholder="Buscar"
      >
        <template #option="slotProps">
          <div class="d-flex justify-content-between">
            <p>{{ slotProps.option.name }} - $ {{ slotProps.option.price }}</p>
            <AppButton
              @click="addCart(slotProps.option)"
              icon="pi pi-shopping-cart"
              class="p-button-rounded p-button-success p-button-outlined"
            />
          </div>
        </template>
      </Listbox>
    </div>
  </AppDialog>

  <Toast ref="toast" position="top-right" />

  <div class="circle-link">
    <Speeddial
      :model="items"
      :tooltip-options="{ position: 'left' }"
      :radius="80"
      direction="up-left"
      type="quarter-circle"
      button-class="p-button-success"
    ></Speeddial>
  </div>

  
</template>

<script lang="js">
import { defineComponent,  } from "vue";

import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Carousel from "primevue/carousel";
import Divider from "primevue/divider";
import VirtualScroller from "primevue/virtualscroller";
import Toast from "primevue/toast";
import Datatable from "primevue/datatable";
import Column from "primevue/column";
import Listbox from "primevue/listbox";
import Speeddial from "primevue/speeddial";
import Sidebar from "primevue/sidebar";
import Tooltip from "primevue/tooltip";
import Fieldset from "primevue/fieldset";
import InputNumber from "primevue/inputnumber";
import { mapState, mapActions, mapGetters } from "vuex";


export default defineComponent({
  data() {
    return {
      searchTextFavorites: "",
      titleCategoryModal: "",
      searchCodeInput : "",
      categorySelected: null,
      visibleRight: false,      
      displayModalProductsCategory: false,
      displayModalSearchProducts: false,      
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "600px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "480px",
          numVisible: 2,
          numScroll: 2,
        },
      ],
      cartProducts: [],
      items: [
        {
          label: "Pagar",
          icon: "pi pi-money-bill",
          command: () => {            
            this.makePayment()
          },
        },
        {
          label: "Borrar productos",
          icon: "pi pi-trash",
          command: () => {
            const toast = this.$refs.toast;
            toast.add({
              severity: "error",
              summary: "Delete",
              detail: "Productos eliminados",
            });

            this.deleteAllProducts();
          },
        },
        {
          label: "Capturar código",
          icon: "fas fa-barcode",
          command: () => {
            const toast = this.$refs.toast;
            const x = this.$refs.inputBarcode;
            //x.focus();
            console.log(x.focus());
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters('cashRegister', ['total']),
    ...mapState('cashRegister', ['products', 'categories', 'cartItems']),
    productsFiltered(){
      const favoriteProducts = this.products.filter(p => p.is_favorite);
      if (this.searchTextFavorites == "") {
        return favoriteProducts;
      }

      return favoriteProducts.filter((p) => {
        return p.name
          .toLocaleLowerCase()
          .includes(this.searchTextFavorites.toLocaleLowerCase());
      });
    },
    productsCategorySelected(){
      return this.products.filter(p => {
        return p.category_id == this.categorySelected.id
      })
    }
  },

  methods: {
    ...mapActions('cashRegister', ['addProduct', 'searchByCode', 'deleteAllProducts', 'updateProductQuantity', 'deleteProduct']),
    subQuantity(item){
      this.updateProductQuantity({product:item, quantity: item.quantity - 1})      
    },
    addQuantity(item){
      this.updateProductQuantity({product:item, quantity: item.quantity + 1})      
    },
    submitSearchCode(){   
      this.searchByCode({code: this.searchCodeInput });      
      this.searchCodeInput = null;
      this.$refs.toast.add({
        severity: "success",
        summary: "Producto encontrado y añadido",
        life: 1000,
      });
      //this.openSearchedProductModal()
    },
    addCart(product) {      
      const toast = this.$refs.toast;

      this.addProduct({product});


      toast.add({
        severity: "success",
        summary: "Producto añadido",
        life: 1000,
      });

      this.cartProducts.push(product);
    },
    getColorCategory(index) {
      const mod = index % 3;

      switch (mod) {
        case 0:
          return "p-button-outlined p-button-help";
        case 1:
          return "p-button-outlined p-button-primary";
        case 2:
          return "p-button-outlined p-button-secondary";
      }
      return "p-button-success";
    },
    openSearchedProductModal(){
      this.displayModalSearchProducts = true;
    },
    openCategoryModal(category) {
      this.categorySelected = category;
      this.displayModalProductsCategory = true;
      this.titleCategoryModal = category.label;
    },
    makePayment(){
      this.visibleRight = true;
    }
  },
  directives: {
    'tooltip': Tooltip
  },
  components: {
    Card,
    AppInput: InputText,
    Carousel,
    Divider,
    Datatable,
    Column,
    Toast,
    Speeddial,
    Sidebar,
    Listbox,
    Fieldset,
    InputNumber,
    VirtualScroller,
  },
});
</script>


<style>
.circle-link {
  position: fixed !important;
  margin-right: 10px;
  width: 30px !important;
  height: 50px !important;
  bottom: 50px !important;
  right: 40px !important;
  text-align: center;
  z-index: 1020;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
}

.product-item img {
  width: 75px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
}

.product-item .product-list-detail {
  flex: 1 1 0;
}

.product-item .product-list-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.product-item .product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
  font-size: 0.875rem;
}

.product-item .product-category {
  vertical-align: middle;
  line-height: 1;
  font-size: 0.875rem;
}

@media screen and (max-width: 576px) {
  .product-item {
    flex-wrap: wrap;
  }

  .product-item .image-container {
    width: 100%;
    text-align: center;
  }

  .product-item img {
    margin: 0 0 1rem 0;
    width: 100px;
  }
}

.product-scroll{
    height: 50vh;
    overflow-y: scroll;

}

.product-scroll::-webkit-scrollbar-thumb {
    background: #ccc;
    scrollbar-width: thin;
    border-radius: 8px;    

}

.product-scroll::-webkit-scrollbar{
  width: 8px;
}

/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.product-scroll::-webkit-scrollbar-thumb:hover {
    background: #b3b3b3;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Cambiamos el fondo cuando esté en active */
.product-scroll::-webkit-scrollbar-thumb:active {
    background-color: #999999;
}

.right-panel>.p-card-body{
  padding-bottom: 0px !important;
}

.p-sidebar-header{
  padding-bottom: 0px !important;
}

.p-inputnumber-input{
  width: 100%;
  text-align: center !important;
}

</style>