import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //Es importante recordar que para que el compilador lo reconozca los archivos .vue deben escribirse con esa extension
      {path: '/inicio', component: () => import('components/PaginaInicio.vue')},
      {path: '/mapa', component: () => import('components/Mapa.vue')},
      {path: '/cerca', component: () => import('components/CercaAMi.vue')},
      {path: '/info', component: () => import('components/InfoCentroAcopio.vue')},
      {path: '/centrobusqueda', component: () => import('components/CentroBusqueda.vue')},
      {path: '/ruta', component: () => import('components/Ruta.vue')},
      {path: '/semillas', component: () => import('components/HistorialSemillas.vue')},
      {path: '', component: () => import('components/Login.vue')},
      {path: '/inicio', component: () => import('components/Inicio.vue')},
      {path: '/bususuario', component: () => import('components/BuscarUsuario.vue')},
      {path: '/verPost', component: () => import('components/VerPost.vue')},
      {path: '/editarPost', component: () => import('components/EditarPost.vue')},
      {path: '/registroUsuario', component: () => import('components/RegistroUsuario.vue')},
      {path: '/editarUsuario', component: () => import('components/EditarPerfilUsuario.vue')},
      {path: '/miPerfil', component: () => import('components/PerfilUsuario.vue')},
      {path: '/visitarPerfil', component: () => import('components/VisitarPerfil.vue')},
      {path: '/buscarPost', component: () => import('components/BuscarPost.vue')},
      {path: '/chat', component: () => import('components/Chat.vue')},
      {path: '/chatHistorial', component: () => import('components/HistorialChat.vue')},
      {path: '/editarComentario', component: () => import('components/editarComentario.vue')},
      {path: '/nuevoPost', component: () => import('src/pages/EditarPost.vue')},
      {path: '/testPerfilUsuario/:cedula', component: () => import('src/pages/PerfilUsuarioTest.vue')}
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
