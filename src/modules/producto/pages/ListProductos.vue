<template>
    <div class="d-flex justify-content-center mt-5">
      <router-link class="btn btn-success ms-3 me-3" :to="{name : 'crear-producto'}">
          <i class="fa fa-plus"></i>&nbsp;
          Agregar
      </router-link>
      <input class="max-width form-control ms-3 me-3" v-model="search" placeholder="Buscar Producto ..."/>
    </div>
  
    <div class="ms-5 me-5 mt-5">
      <table class="table table-hover table-bordered table-striped">
          <thead>
              <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(producto, index) in filteredData" :key="producto.codigoProducto">
                  <th class="align-middle" scope="row">{{ index + 1 }}</th>
                  <td class="align-middle">{{ producto.nombreProducto }}</td>
                  <td class="align-middle">{{ producto.descripcionCategoria }}</td>
                  <td class="align-middle">Q.{{ producto.precioProducto.toFixed(2) }}</td>

              </tr>
              <tr v-if="filteredData.length === 0">
                      <th style="text-align: center" colspan="3">  
                          Sin Resultados 
                      </th>
              </tr>
          </tbody>
      </table>
    </div>
</template>

<script>
    let URI = process.env.VUE_APP_API;
    export default {
        data()
        {
            return{
                productos : [],
                search : ''
            }
        },
        mounted() 
        {
            this.getProductos();
        },
        methods : 
        {
            async getProductos()
            {
                try 
                {
                    const data = await fetch(`${ URI }/getProductos`)
                    .then( resp => resp.json() );

                    this.productos = data;
                    console.log(data)
                } 
                catch (error) 
                {
                    console.log(error);
                }
            },
        },
        computed : 
        {
            filteredData()
            {
                return this.productos.filter(item => {
                    return item.nombreProducto.toLowerCase().includes(this.search.toLowerCase());
                }); 
            }
        }
    }
</script>

<style>
    .max-width
    {
        width: 75%;
    }
</style>