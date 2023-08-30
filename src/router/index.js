import { createRouter, createWebHistory } from 'vue-router';
import authRoute from './auth.route';
import dashboardRoute from './dashboard.route';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public
    ...dashboardRoute,
    ...authRoute,

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
