<template>
  <section class="relative min-h-screen bg-white py-24 px-6 md:px-12">
    <!-- Section Header -->
    <div class="mx-0 lg:mx-8 mb-4">
      <div class="flex items-end justify-between pb-4">
        <h2 class="text-5xl md:text-9xl font-black tracking-tighter text-gray-900 font-roboto uppercase leading-none">
          PROJECT
        </h2>
        <span class="text-5xl md:text-9xl font-black tracking-tighter text-gray-900 font-roboto leading-none">
          '25
        </span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="mx-0 lg:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="group relative bg-black p-3 rounded-lg shadow-2xl transition-all duration-500 hover:scale-[1.02]"
        :class="hoveredProject === project.id ? 'cursor-none' : 'cursor-pointer'"
        @mouseenter="handleMouseEnter(project.id)"
        @mouseleave="handleMouseLeave"
        @mousemove="handleMouseMove($event, project.id)"
      >
        <!-- Project Image Container (Static) -->
        <div 
          ref="imageContainer"
          class="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10"
        >
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover transition-all duration-700 group-hover:blur-sm group-hover:scale-105"
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
    <div class="mt-12 flex justify-center">
      <a 
        href="#projects" 
        class="group flex items-center gap-2 tracking-tighter text-lg font-bold text-gray-900"
      >
        <span>SEE ALL</span>
        <ArrowRight class="w-5 h-5" />
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ArrowRight } from 'lucide-vue-next';
import bikeGif from '@/assets/gifs/bike.gif';

const hoveredProject = ref(null);
const cursorPosition = reactive({ x: 0, y: 0 });

const handleMouseEnter = (projectId) => {
  hoveredProject.value = projectId;
};

const handleMouseLeave = () => {
  hoveredProject.value = null;
};

const handleMouseMove = (event, projectId) => {
  if (hoveredProject.value === projectId) {
    const container = event.currentTarget.querySelector('.relative.aspect-\\[16\\/9\\]');
    if (container) {
      const rect = container.getBoundingClientRect();
      cursorPosition.x = event.clientX - rect.left;
      cursorPosition.y = event.clientY - rect.top;
    }
  }
};

const projects = ref([
  {
    id: 1,
    title: 'SWEETS',
    name: 'Sweet Coffee Shop',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Vue.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 2,
    title: 'PORTFOLIO',
    name: 'Personal Portfolio',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000',
    gif: bikeGif,
    logo: null,
    techStack: ['Vue 3', 'TypeScript', 'Vite', 'GSAP', 'Framer Motion']
  }
]);
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
