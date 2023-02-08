<template>
  <div class="me-5 ms-5 mt-5">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <i class="fa fa-plus"></i> 
                            Agregar Producto
                        </h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addProducto">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" v-model="producto.nombre" class="form-control">
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Descripción</label>
                                        <input type="text" v-model="producto.descripcion" class="form-control">
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Precio</label>
                                        <input type="number" v-model="producto.precio" class="form-control">
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Categoría</label>
                                        <select  v-model="producto.codigoC" class="form-select" aria-label="Default select example">
                                            <option v-for="categoria of categorias" :key="categoria.codigoCategoria" 
                                                :value="categoria.codigoCategoria">{{ categoria.nombreCategoria }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-success ms-2 me-2">
                                        <i class="fa fa-plus"></i>
                                        Agregar
                                    </button>
                                    <router-link :to="{name:'lista-categorias'}" class="btn btn-primary ms-2 me-2">
                                        <i class="fa fa-arrow-left"></i>
                                            Regresar
                                    </router-link>
                                </div>
                            </div>                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let URI = process.env.VUE_APP_API;
    export default {
        data()
        {
            return{
                producto : {
                    nombre : '',
                    descripcion : '',
                    precio : '',
                    codigoC : null
                },
                categorias : []
            }
        },
        mounted()
        {
            this.getCategorias();
        },
        methods : 
        {
            async addProducto()
            {
                console.log(this.producto)
                try 
                {
                    const data = await fetch(`${ URI }/addProducto`,{
                        method : 'POST',
                        body: JSON.stringify({
                        nombreProducto: this.producto.nombre,
                        descripcionProducto: this.producto.descripcion,
                        precioProducto: this.producto.precio,
                        codigoCategoria: this.producto.codigoC,
                        }),
                    
                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(resp => resp.json());
                    if(data.Code === 200 )
                    {
                        this.$swal(
                        'Registro Agregado!',
                        data.message,
                        'success');
                        this.$router.push({name : 'lista-productos'})
                    }
                    else
                    {
                        this.$swal(
                        'Opppsss!',
                        data.message,
                        'error');
                    }
                } 
                catch (error) 
                {
                    console.log(error);
                }
            },
            async getCategorias()
            {
                try 
                {
                    const data = await fetch(`${ URI }/getCategorias`)
                    .then( resp => resp.json() );

                    this.categorias = data;
                } 
                catch (error) 
                {
                    console.log(error);
                }
            }
        }
    }
</script>

<style>

</style>