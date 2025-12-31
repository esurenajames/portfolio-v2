<template>
  <section 
    ref="projectsSectionRef"
    id="projects"
    class="relative min-h-dvh py-24 px-6 md:px-12 transition-colors duration-1000"
    :class="{ 'bg-white': windowWidth >= 768 }"
    :style="windowWidth < 768 ? { backgroundColor: mobileSectionBg } : {}"
  >
    <!-- Section Header -->
    <div class="relative z-20 mx-0 lg:mx-8 mb-4">
      <div class="flex items-end justify-between pb-4">
        <h2 
          class="text-5xl md:text-9xl font-black tracking-tighter font-roboto uppercase leading-none transition-colors duration-1000"
          :class="windowWidth < 768 ? '' : 'text-gray-900'"
          :style="windowWidth < 768 ? { color: mobileTextColor } : {}"
        >
          PROJECT
        </h2>
        <span 
          class="text-5xl md:text-9xl font-black tracking-tighter font-roboto leading-none transition-colors duration-1000"
          :class="windowWidth < 768 ? '' : 'text-gray-900'"
          :style="windowWidth < 768 ? { color: mobileTextColor } : {}"
        >
          '25
        </span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="relative z-20 mx-0 lg:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="group relative bg-black p-3 rounded-lg shadow-2xl transition-all duration-500 hover:scale-[1.02]"
        :class="hoveredProject === project.id ? 'cursor-none' : 'cursor-pointer'"
        @click="openProjectDetails(project)"
      >
        <!-- Project Image Container (Static) -->
        <div 
          ref="imageContainer"
          class="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10"
          @mouseenter="handleMouseEnter(project.id)"
          @mouseleave="handleMouseLeave"
          @mousemove="handleMouseMove($event, project.id)"
        >
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover transition-all duration-700"
            :class="{ 'blur-sm scale-105': hoveredProject === project.id }"
          />
          
          <!-- Cursor-Following GIF Preview (Constrained within container) -->
          <div 
            v-if="hoveredProject === project.id"
            class="absolute pointer-events-none z-10 transition-opacity duration-300"
            :style="{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: hoveredProject === project.id ? 1 : 0
            }"
          >
            <div class="relative w-72 h-48 rounded overflow-hidden shadow-2xl border-1 border-white">
              <img 
                :src="project.gif" 
                :alt="`${project.title} preview`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Project Footer (Black Background) -->
        <div class="p-4 space-y-3">
          <!-- Top Row: Logo, Name, Category, Year -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  v-if="project.logo" 
                  :src="project.logo" 
                  :alt="`${project.title} logo`"
                  class="w-5 h-5 object-contain"
                />
                <span v-else class="text-xs font-black text-slate-900 uppercase">{{ project.title.charAt(0) }}</span>
              </div>
              <span class="text-lg font-slate-900 text-white tracking-tighter uppercase">{{ project.title }}</span>
            </div>
            
            <div class="flex items-center gap-4 text-sm font-black tracking-widest text-white/60 uppercase">
              <span>PRODUCT</span>
              <span class="text-white">{{ project.year }}</span>
            </div>
          </div>

          <!-- Bottom Row: Scrolling Tech Stack Ticker -->
          <div class="relative overflow-hidden group/ticker">
            <div class="tech-scroll flex items-center gap-4 py-1">
              <template v-for="i in 4" :key="i">
                <span 
                  v-for="tech in project.techStack" 
                  :key="`${i}-${tech}`"
                  class="text-xs font-black text-white/30 whitespace-nowrap tracking-[0.2em] uppercase transition-colors group-hover/ticker:text-white/60"
                >
                  {{ tech }} •
                </span>
              </template>
            </div>
            <!-- Fade masks for the ticker -->
            <div class="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div class="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent z-10"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- See All Button -->
    <div class="relative z-20 mt-12 flex justify-center">
      <button 
        @click="goToProjects"
        class="group flex items-center gap-2 tracking-tighter text-lg font-bold transition-colors duration-1000 cursor-pointer"
        :class="windowWidth < 768 ? '' : 'text-gray-900'"
        :style="windowWidth < 768 ? { color: mobileTextColor } : {}"
      >
        <span>SEE ALL</span>
        <ArrowRight class="w-5 h-5" />
      </button>
    </div>

    <!-- Project Details Modal -->
    <ProjectDetails 
      :is-open="isProjectDetailsOpen" 
      :project="selectedProject"
      @close="closeProjectDetails"
    />
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight } from 'lucide-vue-next';
import { useWindowSize, useScroll } from '@vueuse/core';
import bikeGif from '@/assets/gifs/bike.gif';
import ProjectDetails from '@/components/modules/projects/ProjectDetails.vue';

const router = useRouter();

const { width: windowWidth, height: windowHeight } = useWindowSize();
const { y: scrollY } = useScroll(window);

const projectsSectionRef = ref(null);
const hoveredProject = ref(null);
const cursorPosition = reactive({ x: 0, y: 0 });

// Navigate to projects page
const goToProjects = () => {
  router.push({ path: '/projects', query: { showBack: 'true' } });
};

// Project Details Modal State
const isProjectDetailsOpen = ref(false);
const selectedProject = ref(null);

const openProjectDetails = (project) => {
  selectedProject.value = project;
  isProjectDetailsOpen.value = true;
};

const closeProjectDetails = () => {
  isProjectDetailsOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
};

const handleMouseEnter = (projectId) => {
  hoveredProject.value = projectId;
};

const handleMouseLeave = () => {
  hoveredProject.value = null;
};

const handleMouseMove = (event, projectId) => {
  if (hoveredProject.value === projectId) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    cursorPosition.x = event.clientX - rect.left;
    cursorPosition.y = event.clientY - rect.top;
  }
};

// All 6 projects
const allProjects = ref([
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

// Show only first 2 projects in landing section
const projects = computed(() => allProjects.value.slice(0, 2));
</script>

<script>
export default {
  name: 'ProjectsSection'
};
</script>

<style scoped>
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.tech-scroll {
  animation: scroll-left 20s linear infinite;
}

.tech-scroll:hover {
  animation-play-state: paused;
}

/* Smooth hover transitions */
.group:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>
