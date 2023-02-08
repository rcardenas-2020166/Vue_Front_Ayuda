<template>
  <div class="mt-3 d-flex justify-content-center align-items">
    <router-link class="btn btn-secondary ms-3 me-3" to="/">
        <i class="fa fa-home"></i>&nbsp;
        Página Principal
    </router-link>
    <router-link class="btn btn-primary ms-3 me-3" :to="{ name : 'lista-categorias' }">
        <i class="fa fa-eye"></i>&nbsp;
        Ver Categorías
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>