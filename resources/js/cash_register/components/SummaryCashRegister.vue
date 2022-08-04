<template>
  <div>
    <button
      @click="openCreateCashRegisterModal"
      type="button"
      class="btn btn-block btn-info btn-lg"
    >
      Crear Caja <i class="fas fa-cart-plus"></i>
    </button>
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
    <div class="modal" ref="modal_cash_register" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ingrese el monto inicial</h5>
            <button
              type="button"
              class="close"
              @click="closeModal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input class="form-control" placeholder="Monto Inicial ($)" type="text">
          </div>
          <div class="modal-footer">
            
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"              
            >
              Cerrar
            </button>
            <button @click="createCashRegisterModal" type="button" class="btn btn-primary">Crear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openCreateCashRegisterModal() {      
      $(this.$refs.modal_cash_register).modal('show')      
    },
    createCashRegisterModal(){
        this.closeModal();
        this.$emit('cash-register-created')
    },
    closeModal(){
      $(this.$refs.modal_cash_register).modal('hide')    
    }
  },
  
};
</script>

<style>
</style>