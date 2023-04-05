<template class="container-fluid animated ">
   <IndicatorsInventaty></IndicatorsInventaty>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                        <div class="row" style="border-bottom: 1px solid rgba(0, 0, 0, 0.125)">
                            <div class="col-md-2"><b class="text-left">Filtros De Busqueda</b></div>
                            <div class="col-md-8"></div>
                            <div class="col-md-2"><button type="button" class="btn btn-success btn-sm btn-block mb-1"  id="addinventary">Agregar Inventario <i class="fas fa-plus"></i></button></div>
                        </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Categoria</label>
                                <select
                                    class="form-control"
                                    name="categoria"
                                    id="categoria">
                                    <option value="Todas" selected>
                                        .::Todas::.
                                    </option>
                                    <option v-for="categoria of categorias"
                                        :key="categoria.id"
                                        :value="categoria.id">
                                        {{ categoria.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                                <label for="exampleInputEmail1">BARCODE</label>
                            <div class="p-inputgroup">
                                <span class="p-input-icon-left w-100">
                                    <i class="fas fa-barcode"></i>
                                    <input
                                        class="p-inputtext p-component w-100"
                                        type="number"
                                        placeholder="Busqueda por código"/>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for=""></label>
                                <button type="button" class="mt-2 btn btn-block btn-info">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-sm table-striped table-hover" id="tableInventary" style="width:100%;">
                        <thead class="text-center">
                            <th>No.</th>
                            <th>Producto</th>
                            <th>BarCode</th>
                            <th >Stock</th>
                            <th>Costo Compra</th>
                            <th>Tot Costo Compra</th>
                            <th>Costo Venta</th>
                            <th>Tot Costo Venta</th>
                            <th class="text-center">Acciones</th>
                        </thead>
                        <tfoot>
                            <th class="text-right" colspan="3">-Totales-</th>
                            <th>{{ totalAmountProduct }}</th>
                            <th>{{ 1+2 }}</th>
                            <th>{{ 1+2 }}</th>
                            <th>{{ 1+2 }}</th>
                            <th>{{ 1+2 }}</th>
                            <th>{{ 1+2 }}</th>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datatable from "primevue/datatable";
import IndicatorsInventaty from './IndicatorsInventary.vue';
export default {
    data() {
        return {
            productos: [],
            categorias: [],
            productosInventario:[],
        };
    },
    async created(){
        const { productos } = (await (await fetch('/dummy_data/productos.json')).json());            
        this.productosInventario = productos;
        // this.productos = productos;
        console.log(this.totalAmountProduct);
    },
    computed: {
        totalCostoCompraProduct() {
            return this.productosInventario.reduce((a, b) => a + (b["costp"] || 0), 0);
        },
        totalCostoVentaProduct() {
            return this.productosInventario.reduce((a, b) => a + (b["costs"] || 0), 0);
        },
        totalAmountProduct() {
            return this.productosInventario.reduce((a, b) => a + (b["amount"] || 0), 0);
        },
        totalCompraProductos() {
            return this.productosInventario.reduce(
                (a, b) => a + (b["amount"] * b["costp"] || 0),
                0
            );
        },
        totalVentaProductos() {
            return this.productos.reduce(
                (a, b) => a + (b["amount"] * b["costs"] || 0),
                0
            );
        },
    },
    mounted(){
        jQuery("footer").remove();
    },
    components:{
        IndicatorsInventaty
    },
    watch:{
        productosInventario(newData, OldData){
            jQuery("#tableInventary").DataTable().destroy();
            jQuery("#tableInventary").DataTable({
                data:newData,
                scrollY:"300px",
                columns:[
                    {width:"8%", data:"id_product", render(a,b,c,d){ return `${(d.row + 1)}`;}},
                    {width:"22%", data:"desc"},
                    {width:"10%", data:"barcode"},
                    {width:"8%", data:"amount"},
                    {width:"10%", data:"costp", render(a,b,c,d){ return `$ ${a.toFixed(2)}`}},
                    {width:"12%", data:"costp", render:()=>{ return `$ ${this.totalCostoCompraProduct.toFixed(2)} ` }},
                    {width:"10%", data:"costs", render(a,b,c,d){ return `$ ${a.toFixed(2)}`}},
                    {width:"12%", data:"costs", render:()=>{ return `$ ${this.totalCostoVentaProduct.toFixed(2)} ` }},
                    {width:"8%", data:"id_product", render(a,b,c,d){ return ` <button class="btn btn-sm btn-warning" data-index="${d}"><i class="fas fa-edit"></i></button>`}},
                ],
            })
        }
    }
};
</script>

<style>
  @import '/css/jquery.dataTables.min.css';

</style>