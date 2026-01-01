import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';
import Chat from '@/pages/Chat.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    // Always scroll to top when navigating to a new route
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'instant' };
    }
  }
});

export default router;
