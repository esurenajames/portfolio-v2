import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';

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
    }
  ],
});

export default router;
