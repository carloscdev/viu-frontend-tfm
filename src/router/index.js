import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Dashboard/Home.vue';
import dashboardRoute from './auth.route';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public
    {
      meta: { title: 'Inicio' },
      path: '/',
      name: 'home',
      component: Home,
    },

    ...dashboardRoute,

    // Default
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home' }),
    },
  ],
});

router.afterEach(to => {
  const defaultDocumentTitle = 'VIU HUB'
  const { title } = to.meta
  if (title) {
    document.title = `${title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

export default router;
