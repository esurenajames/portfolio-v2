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
import fileGridHome from '@/assets/projects/filegrid/Home.webp';
import fileGridGif from '@/assets/projects/filegrid/GIF.gif';
import fileGridFeatures from '@/assets/projects/filegrid/Features.webp';
import fileGridAbout from '@/assets/projects/filegrid/About.webp';
import fileGridBlog from '@/assets/projects/filegrid/Blog.webp';
import fileGridBlog1 from '@/assets/projects/filegrid/Blog 1.webp';
import fileGridHowItWorks from '@/assets/projects/filegrid/How it works.webp';
import fileGridSession from '@/assets/projects/filegrid/Session.webp';
import fileGridIcon from '@/assets/projects/filegrid/icon.svg';
import seaSaltHome from '@/assets/projects/seasalt/Home.webp';
import seaSaltGif from '@/assets/projects/seasalt/GIF.gif';
import seaSaltLogo from '@/assets/projects/seasalt/logo.png';
import seaSaltAbout from '@/assets/projects/seasalt/About.webp';
import seaSaltDine from '@/assets/projects/seasalt/Dine.webp';
import seaSaltGallery from '@/assets/projects/seasalt/Gallery.webp';
import seaSaltLocations from '@/assets/projects/seasalt/Locations.webp';
import seaSaltMenu from '@/assets/projects/seasalt/Menu.webp';
import seaSaltTestimony from '@/assets/projects/seasalt/Testimony.webp';

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
  disabled?: boolean;
}

// Project Details Modal State
const isProjectDetailsOpen = ref(false);
const selectedProject = ref<Project | null>(null);

const openProjectDetails = (project: Project) => {
  if (project.disabled) return;
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
    id: 7,
    title: 'FILEGRID',
    name: 'File Grid Platform',
    category: 'Web Application',
    year: '2025',
    description: 'A robust real-time file management system built with Laravel and Vue.js. Features live updates using WebSockets, a modern interface with Shadcn UI, and secure data handling with MySQL.',
    image: fileGridHome,
    gif: fileGridGif,
    logo: fileGridIcon,
    techStack: ['Vue 3', 'Shadcn Vue', 'Tailwind CSS', 'Socket.io', 'Laravel', 'MySQL'],
    gallery: [
      fileGridFeatures,
      fileGridAbout,
      fileGridBlog,
      fileGridBlog1,
      fileGridHowItWorks,
      fileGridSession,
    ],
    liveUrl: 'https://filegrid.vercel.app/',
    githubUrl: 'https://github.com/esurenajames/file-grid'
  },
  {
    id: 1,
    title: 'SEASALT',
    name: 'Seasalt Bucket',
    category: 'Restaurant Website',
    year: '2024',
    description: 'A modern landing page for Seasalt Bucket, featuring a dynamic menu, location finder, and gallery. Built with Vue 3 and Tailwind CSS for a responsive and appetizing user experience.',
    image: seaSaltHome,
    gif: seaSaltGif,
    logo: seaSaltLogo,
    techStack: ['Vue 3', 'Javascript', 'Tailwind CSS'],
    gallery: [
      seaSaltMenu,
      seaSaltDine,
      seaSaltLocations,
      seaSaltGallery,
      seaSaltAbout,
      seaSaltTestimony,
      seaSaltHome
    ],
    liveUrl: 'https://seasalt-bucket.vercel.app/',
    githubUrl: 'https://github.com/esurenajames/seasalt-bucket'
  },
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
    githubUrl: '#',
    disabled: true
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
    githubUrl: '#',
    disabled: true
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
    githubUrl: '#',
    disabled: true
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
    githubUrl: '#',
    disabled: true
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
    githubUrl: '#',
    disabled: true
  }
]);
</script>

<script lang="ts">
export default {
  name: 'ProjectsPage'
};
</script>
