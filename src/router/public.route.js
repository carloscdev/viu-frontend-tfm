import PublicLayout from '@/layouts/PublicLayout.vue';

const publicRoute = [
  {
    meta: { title: 'VIU HUB', layout: PublicLayout },
    path: '/publico/:slug',
    name: 'public-document',
    component: () => import('@/pages/Public/Document.vue')
  },
  {
    meta: { title: '', layout: PublicLayout },
    path: '/',
    name: 'public-main',
    component: () => import('@/pages/Public/Main.vue')
  },
]

export default publicRoute;