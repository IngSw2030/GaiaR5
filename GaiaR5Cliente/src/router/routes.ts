import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('components/CentroBusqueda.vue')},
      {path: '/mapa', component: () => import('components/Mapa.vue')},
      {path: '/cerca', component: () => import('components/CercaAMi.vue')},
      {path: '/info', component: () => import('components/InfoCentroAcopio.vue')},
      {path: '/centrobusqueda', component: () => import('components/CentroBusqueda.vue')},
      {path: '/ruta', component: () => import('components/Ruta.vue')},
      {path: '/semillas', component: () => import('components/HistorialSemillas.vue')},
      {path: '/login', component: () => import('components/Login.vue')},
      {path: '/inicio', component: () => import('components/Inicio.vue')},
      {path: '/bususuario', component: () => import('components/BuscarUsuario.vue')},
      {path: '/registroUsuario', component: () => import('components/RegistroUsuario.vue')},
      {path: '/editarUsuario', component: () => import('components/EditarPerfilUsuario.vue')},
      {path: '/miPerfil', component: () => import('components/PerfilUsuario.vue')},
      {path: '/visitarPerfil', component: () => import('components/VisitarPerfil')}
    ]
    
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
