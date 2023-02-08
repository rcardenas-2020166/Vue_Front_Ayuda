import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import(/*webpackChunkName : "HomeVueComponet"*/ '@/modules/shared/pages/HomeApp')
  },
  {
    name : 'categorias',
    path : '/categorias',
    component : () => import(/*webpackChunkName : "HomeCategoriaComponent"*/ '@/modules/categoria/components/HomeCategoria'),
    children : 
    [
      {
        name : 'menu-categorias',
        path : '',
        component : () => import(/*webpackChunkName : "MenuCategoriasComponent"*/ '@/modules/categoria/components/OptionsCategoria')
      },
      {
        name : 'lista-categorias',
        path : 'lista-categorias',
        component : () => import(/*webpackChunkName : "ListCategoriasComponent"*/ '@/modules/categoria/pages/ListCategorias') 
      },
      {
        name : 'crear-categoria',
        path : 'crear-categoria',
        component : () => import(/*webpackChunkName : "AddCategoriaComponent"*/ '@/modules/categoria/pages/AddCategoria')
      },
      {
        name : 'editar-categoria',
        path : 'editar-categoria/:id',
        props : (route) => 
        {
          const id = route.params.id;
          return isNaN( Number(id) ) ? { id : 0 } : { id : Number(id)}
        },
        component : () => import(/*webpackChunkName : "UpdateCategoriaComponent"*/ '@/modules/categoria/pages/UpdateCategoria')
      },
      {
        name : 'eliminar-categoria',
        path : 'eliminar-categoria/:id',
        props : (route) =>
        {
          const id = route.params.id;
          return isNaN( Number(id) ) ? { id : 0 } : { id : Number(id)}
        },
        component : () => import(/*webpackChunkName : "DeleteCategoriaComponet"*/ '@/modules/categoria/pages/DeleteCategoria')
      },
      {
        name : 'Not-Found',
        path : '/:pathMath(.*)*',
        component : () => import(/*webpackChunkName : "NotFoundComponent"*/ '@/modules/shared/pages/NotFound')
      }
    ]
  },
  {
    name : 'productos',
    path: '/productos',
    component : () => import(/*webpackChunkName : "HomeProductoComponent"*/ '@/modules/producto/components/HomeProducto'),
    children : 
    [
      {
        name : 'menu-productos',
        path : '',
        component : () => import(/*webpackChunkName : "MenuProductosComponent"*/ '@/modules/producto/components/OptionsProducto')
      },
      {
        name : 'lista-productos',
        path : 'lista-productos',
        component : () => import(/*webpackChunkName : "MenuProductosComponent"*/ '@/modules/producto/pages/ListProductos')
      },
      {
        name : 'crear-producto',
        path : 'crear-producto',
        component : () => import(/*webpackChunkName : "MenuProductosComponent"*/ '@/modules/producto/pages/AddProducto')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
})

export default router
