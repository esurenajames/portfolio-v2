<template>
  <Layout>
    <ProjectView 
      :projects="allProjects" 
      :show-back-button="showBackButton"
      @project-click="openProjectDetails"
    />
    <ProjectDetails 
      :is-open="isProjectDetailsOpen" 
      :project="selectedProject"
      @close="closeProjectDetails"
    />
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '@/layouts/Layout.vue';
import ProjectView from '@/components/modules/projects/ProjectView.vue';
import ProjectDetails from '@/components/modules/projects/ProjectDetails.vue';
import bikeGif from '@/assets/gifs/bike.gif';

const route = useRoute();

// Show back button based on route query parameter
const showBackButton = computed(() => route.query.showBack === 'true');

interface Project {
  id: number;
  title: string;
  name?: string;
  year: string;
  category?: string;
  image: string;
  gif?: string;
  logo?: string | null;
  techStack: string[];
  description?: string;
  liveUrl?: string;
  githubUrl?: string;
  gallery?: string[];
}

// Project Details Modal State
const isProjectDetailsOpen = ref(false);
const selectedProject = ref<Project | null>(null);

const openProjectDetails = (project: Project) => {
  selectedProject.value = project;
  isProjectDetailsOpen.value = true;
};

const closeProjectDetails = () => {
  isProjectDetailsOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
};

// All 6 projects
const allProjects = ref<Project[]>([
  {
    id: 1,
    title: 'SWEETS',
    name: 'Sweet Coffee Shop',
    category: 'Web Application',
    year: '2025',
    description: 'A modern coffee shop website featuring an elegant design, smooth animations, and a seamless user experience. Built with Vue.js and styled with Tailwind CSS for a responsive and beautiful interface.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express'],
    gallery: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 2,
    title: 'PORTFOLIO',
    name: 'Personal Portfolio',
    category: 'Portfolio Website',
    year: '2025',
    description: 'A stunning personal portfolio showcasing projects and skills with cutting-edge animations and interactions. Features a unique horizontal scroll experience and dynamic content presentation.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'GSAP', 'Framer Motion'],
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 3,
    title: 'ECOMMERCE',
    name: 'Fashion Store',
    category: 'E-Commerce',
    year: '2024',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, and secure checkout. Includes admin dashboard for inventory management and order tracking.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['React', 'Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    gallery: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 4,
    title: 'DASHBOARD',
    name: 'Analytics Platform',
    category: 'SaaS Product',
    year: '2024',
    description: 'A comprehensive analytics dashboard with real-time data visualization, custom reports, and team collaboration features. Built for scalability and performance.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Vue 3', 'D3.js', 'Firebase', 'Chart.js', 'Tailwind'],
    gallery: [
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'SOCIAL',
    name: 'Community App',
    category: 'Social Network',
    year: '2024',
    description: 'A modern social networking platform with real-time messaging, content sharing, and community features. Focuses on user engagement and seamless interactions.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['React Native', 'Socket.io', 'Redis', 'AWS', 'GraphQL'],
    gallery: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: 6,
    title: 'FITNESS',
    name: 'Workout Tracker',
    category: 'Health & Fitness',
    year: '2024',
    description: 'A comprehensive fitness tracking application with workout plans, progress monitoring, and nutrition guidance. Helps users achieve their health goals with data-driven insights.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Flutter', 'Firebase', 'ML Kit', 'HealthKit', 'SQLite'],
    gallery: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200'
    ],
    liveUrl: '#',
    githubUrl: '#'
  }
]);
</script>

<script lang="ts">
export default {
  name: 'ProjectsPage'
};
</script>
