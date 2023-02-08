<template>
  <div class="me-5 ms-5 mt-5">
        <div class="row mt-2">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <i class="fa fa-trash"></i> 
                            Eliminar Categoria
                        </h4>
                    </div>
                    <div v-if="categoria" class="card-body">
                        <form @submit.prevent="deleteCategoria">
                            <div class="row">
                                <div class="col-12 mb-2">
                                    <div class="col-12 mb-2">
                                        <div class="form-group">
                                            <label>Código</label>
                                            <input type="number" disabled :value="id" class="center form-control text-center">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Nombre</label>
                                        <input type="text" disabled v-model="categoria.nombreCategoria" class="form-control">
                                    </div>
                                </div>
                                <div class="col-12 d-flex justify-content-center">
                                    <button type="submit" class="btn btn-danger ms-2 me-2">
                                        <i class="fa fa-trash"></i>
                                        Eliminar
                                    </button>
                                    <router-link :to="{name:'lista-categorias'}" class="btn btn-primary ms-2 me-2">
                                        <i class="fa fa-arrow-left"></i>
                                            Regresar
                                    </router-link>
                                </div>
                            </div>                        
                        </form>
                    </div>
                        <div v-if="!categoria" class="card-body">
                            <div class="alert alert-danger" role="alert">
                                <i class="fa fa-bug"></i> &nbsp;
                                Registro No Encontrado
                            </div>
                            <router-link :to="{name:'lista-categorias'}" class="btn btn-primary ms-2 me-2">
                                <i class="fa fa-arrow-left"></i>&nbsp;
                                Regresar
                            </router-link>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let URI = process.env.VUE_APP_API;
    export default {
        props : 
        {
            id : 
            {
                type : Number,
                required : true
            }
        },
        data(){
            return{
                categoria : null
            }
        },
        mounted()
        {
            this.getCategoria();
        },
        methods : 
        {
            async getCategoria()
            {
                try
                {
                    const data = await fetch(`${ URI }/getCategoria/${ this.id }`)
                    .then(resp => resp.json());

                    if(data.Code === 200)
                    {
                        const { categoria } = data;
                        this.categoria = categoria[0]   
                    }
                    else
                    {
                        this.categoria = null
                    }
                }
                catch(error)
                {
                    console.log(error);
                }
            },
            async deleteCategoria()
            {
                try
                {
                    this.$swal({
                    title: 'Estás seguro de Eliminar?',
                    text: "Esta acción es irreversible!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar',
                    cancelButtonText : 'Cancelar'
                    }).then(async (result) => {
                    if (result.isConfirmed) 
                    {
                        try 
                        {
                            const data = await fetch(`${ URI }/deleteCategoria/${ this.id }`,
                            {
                                method: 'DELETE',
                                headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }})
                            .then(resp => resp.json());
                                this.$swal(
                                'Registro Eliminado!',
                                data.message,
                                'success'
                            )
                            this.$router.push({name : 'lista-categorias'})
                        } 
                        catch (error) 
                        {   
                            console.log(error)
                        }
                }
            })

                }
                catch(error)
                {
                    console.log(error)
                }
            }
        },
        watch : 
        {
            id()
            {
                this.getCategoria();
            }
        }
        
    }
</script>

<style>

</style>