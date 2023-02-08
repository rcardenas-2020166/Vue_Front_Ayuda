<template>
  <div class="me-5 ms-5 mt-5">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <i class="fa fa-plus"></i> 
                            Agregar Categoria
                        </h4>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="addCategoria">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" v-model="categoria.nombreCategoria" class="form-control">
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
                categoria : {
                    nombreCategoria : ''
                }
            }
        },

        methods : 
        {
            async addCategoria()
            {
                try 
                {
                    const data = await fetch(`${ URI }/addCategoria`,{
                        method : 'POST',
                        body: JSON.stringify({
                        nombreCategoria: this.categoria.nombreCategoria,
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
                        this.$router.push({name : 'lista-categorias'})
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
            }
        }
    }
</script>

<style>

</style>