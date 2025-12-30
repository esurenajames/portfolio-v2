import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Projects from '@/pages/Projects.vue';
import Chat from '@/pages/Chat.vue';

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
    }
  ],
});

export default router;
