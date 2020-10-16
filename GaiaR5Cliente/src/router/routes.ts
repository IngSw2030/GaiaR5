import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/mapa', component: () => import('components/mapa') },
      { path: '/info', component: () => import('components/infoCentroAcopio')},
      {path: '/centrobusqueda', component: () => import('components/CentroBusqueda') },
      {path: '/ruta', component: () => import('components/Ruta') },
      {path: '/semillas', component: () => import('components/HistorialSemillas') }
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
