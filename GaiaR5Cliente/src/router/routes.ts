import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
<<<<<<< HEAD
      { path: '', component: () => import('components/CentroBusqueda') },
      { path: '/mapa', component: () => import('components/mapa') },
      { path: '/cerca', component: () => import('components/cercaAmi') },
      { path: '/info', component: () => import('components/infoCentroAcopio')},
      {path: '/centrobusqueda', component: () => import('components/CentroBusqueda') },
      {path: '/ruta', component: () => import('components/Ruta') },
      {path: '/semillas', component: () => import('components/HistorialSemillas') },
      {path: '/login', component: () => import('components/Login') },
      {path: '/inicio', component: () => import('components/Inicio') },
      {path: '/bususuario', component: () => import('components/BuscarUsuario') },
      {path: '/registroUsuario', component: () => import('components/RegistroUsuario')},
      {path: '/editarUsuario', component: () => import('components/EditarPerfilUsuario')},
      {path: '/miPerfil', component: () => import('components/PerfilUsuario')},
      {path: '/visitarPerfil', component: () => import('components/VisitarPerfil')}
]
=======
      //Es importante recordar que para que el compilador lo reconozca los archivos .vue deben escribirse con esa extension
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
    ]
>>>>>>> 211542d39a3d8bdc06c0ba3504af3cccc2786237
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
