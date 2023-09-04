import { createRouter, createWebHistory } from 'vue-router';
import authRoute from './auth.route';
import dashboardRoute from './dashboard.route';
import publicRoute from './public.route';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public
    ...dashboardRoute,
    ...authRoute,
    ...publicRoute,

    // Default
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'home' }),
    },
  ],
});

router.afterEach(to => {
  window.scrollTo(0,0);
  const defaultDocumentTitle = 'VIU HUB'
  const { title } = to.meta
  if (title) {
    document.title = `${title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

export default router;
