<template>
  <div>    
    <div class="row" v-if="isOpen">
      <div class="col-md-6">
        <button
          @click="openCloseCashRegisterModal"
          type="button"
          class="btn btn-block btn-warning text-white btn-lg"
        >
          Cerrar Caja <i class="fas fa-cart-arrow-down"></i>
        </button>
      </div>
      <div class="col-md-6">
        <button
          @click="setCashRegisterStep2"
          type="button"
          class="btn btn-block btn-success btn-lg"
        >
          Nueva Venta <i class="fas fa-cash-register"></i>
        </button>
      </div>

      <div class="col-md-12">
        <hr />
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Ventas del día</h3>
            <div class="card-tools">
              <ul class="pagination pagination-sm float-right">
                <li class="page-item"><a class="page-link" href="#">«</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">»</a></li>
              </ul>
            </div>
          </div>

          <div class="card-body p-0">
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>Cliente</th>
                  <th>Total ($)</th>
                  <th style="width: 40px">Otro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Caminado</td>
                  <td>$250.00</td>
                  <td><span class="badge bg-success">95%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button
        @click="openCreateCashRegisterModal"
        type="button"        
        class="btn btn-block btn-info btn-lg"
      >
        Crear Caja <i class="fas fa-cart-plus"></i>
      </button>
      <p class="my-2">Al abrir una caja, deberás establecer un monto inicial</p>
    </div>
    

    <AppDialog v-model:visible="openCashModalVisible" position="top">
      <template #header>
        <h3>Abrir Caja</h3>
      </template>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="initialAmount" class="w-100"
              >Ingresa la cantidad a abrir caja</label
            >
            <InputNumber id="initialAmount" v-model="initialAmount" mode="currency" currency="USD" locale="en-US"></InputNumber>
            
          </div>
        </div>
      </div>
      <template #footer>
        <AppButton
          label="No"
          @click="closeModal"
          icon="pi pi-times"
          class="p-button-text"
        />
        <AppButton
          label="Yes"
          icon="pi pi-check"
          iconPos="right"
          @click="createCashRegister"
        />
      </template>
    </AppDialog>

    <AppDialog v-model:visible="closeCashModalVisible" position="top">
      <template #header>
        <h3>Cerrar Caja</h3>
      </template>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="finalAmount" class="w-100"
              >Ingresa la cantidad a cerrar caja</label
            >
            <InputNumber id="finalAmount" v-model="finalAmount" mode="currency" currency="USD" locale="en-US"></InputNumber>            
          </div>
        </div>
      </div>
      <template #footer>
        <AppButton
          label="No"
          @click="closeModal"
          icon="pi pi-times"
          class="p-button-text"
        />
        <AppButton
          label="Yes"
          icon="pi pi-check"
          iconPos="right"
          @click="_closeCashRegister"
        />
      </template>
    </AppDialog>
  </div>
</template>

<script>
import InputNumber from "primevue/inputnumber";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      openCashModalVisible: false,
      closeCashModalVisible: false,
      finalAmount: null,
      initialAmount: null,
    };
  },
  computed: {
    ...mapState("cashRegister", ["isOpen"]),
  },
  methods: {
    ...mapMutations('cashRegister', ['setCashRegisterStep2']),
    ...mapActions('cashRegister', ['openCashRegister', 'closeCashRegister']),    
    openCreateCashRegisterModal() {
      this.openCashModalVisible = true;
    },
    createCashRegister() {
      this.closeModal();
      this.openCashRegister({initialAmount: this.initialAmount})
    },
    closeModal() {
      this.openCashModalVisible = false;
    },
    openCloseCashRegisterModal(){
      this.closeCashModalVisible = true;
    },
    _closeCashRegister(){
      this.closeCashRegister({finalAmount: this.finalAmount});
      this.closeCashModalVisible = false;
    }
  },
  components:{
    InputNumber,
  }
};
</script>

<style>
</style>