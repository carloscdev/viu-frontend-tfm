import Home from '../pages/Dashboard/Home.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const authRoute = [
  {
    meta: { title: 'Inicio', layout: DashboardLayout },
    path: '/',
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
  }
]

export default authRoute;