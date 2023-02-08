<template>
  <div class="d-flex justify-content-center mt-5">
    <router-link class="btn btn-success ms-3 me-3" :to="{ name : 'crear-categoria' }">
        <i class="fa fa-plus"></i>&nbsp;
        Agregar
    </router-link>
    <input class="max-width form-control ms-3 me-3" v-model="search" placeholder="Buscar Categoría ..."/>
  </div>

  <div class="ms-5 me-5 mt-5">
    <table class="table table-hover table-bordered table-striped">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(categoria, index) in filteredData" :key="categoria.codigoCategoria">
                <th class="align-middle" scope="row">{{ index + 1 }}</th>
                <td class="align-middle">{{ categoria.nombreCategoria }}</td>
                <td>
                    <router-link class="btn btn-danger ms-1 me-1" :to="{ path : `eliminar-categoria/${categoria.codigoCategoria }` }">
                        <i class="fa fa-trash"></i>
                    </router-link>
                    <router-link class="btn btn-warning ms-1 me-1" :to="{ path : `editar-categoria/${ categoria.codigoCategoria }` }">
                        <i class="fa fa-pencil"></i>
                    </router-link>
                </td>
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
    //URI//
    let URI = process.env.VUE_APP_API;
export default {
    data()
    {
        return {
            categorias : [],
            search : ''
        }
    },
    mounted()
    {
        this.getCategorias();
    },
    computed :
    {
        filteredData()
        {
            return this.categorias.filter(item => {
                return item.nombreCategoria.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods : 
    {
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
    .max-width
    {
        width: 75%;
    }
</style>