import PublicLayout from '@/layouts/PublicLayout.vue';

const publicRoute = [
  {
    meta: { title: 'VIU - HUB', layout: PublicLayout },
    path: '/publico/:slug',
    name: 'public-document',
    component: () => import('@/pages/Public/Document.vue')
  },
]

export default publicRoute;