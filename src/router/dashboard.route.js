import Home from '../pages/Dashboard/Home.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const authRoute = [
  {
    meta: { title: 'Dashboard', layout: DashboardLayout },
    path: '/dashboard',
    name: 'home',
    component: Home,
  },
  {
    meta: { title: 'Documentos', layout: DashboardLayout },
    path: '/documentos',
    children: [
      {
        path: '',
        name: 'list-documents',
        component: () => import('@/pages/Dashboard/Documents/List.vue')
      },
      {
        // meta: { title: 'Agregar Documento', layout: DashboardLayout },
        path: ':documentId/agregar-items',
        name: 'add-items',
        component: () => import('@/pages/Dashboard/Documents/Add.vue')
      }
    ]
  },
  {
    meta: { title: 'Favoritos', layout: DashboardLayout },
    path: '/favoritos',
    name: 'favorites',
    component: () => import('@/pages/Dashboard/Favorites/List.vue')
  },
  {
    meta: { title: 'Perfil', layout: DashboardLayout },
    path: '/perfil',
    name: 'profile',
    component: () => import('@/pages/Dashboard/Profile/List.vue')
  }
]

export default authRoute;