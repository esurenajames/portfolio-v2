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
          '26
        </span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="relative z-20 mx-0 lg:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="group relative bg-black p-3 rounded-lg shadow-2xl transition-all duration-500"
        :class="[
          hoveredProject === project.id ? 'cursor-none' : (project.disabled ? 'cursor-not-allowed' : 'cursor-pointer'),
          !project.disabled && 'hover:scale-[1.02]'
        ]"
        @click="openProjectDetails(project)"
      >
        <!-- Project Image Container (Static) -->
        <div 
          ref="imageContainer"
          class="relative aspect-[16/9] rounded-lg overflow-hidden border border-white/10"
          :class="{ 'opacity-50 grayscale': project.disabled }"
          @mouseenter="!project.disabled && handleMouseEnter(project.id)"
          @mouseleave="handleMouseLeave"
          @mousemove="!project.disabled && handleMouseMove($event, project.id)"
        >
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover transition-all duration-700"
            :class="{ 'blur-sm scale-105': hoveredProject === project.id }"
          />

          <!-- Disabled Overlay -->
           <div 
            v-if="project.disabled" 
            class="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <span class="text-white font-black tracking-widest text-xl border-2 border-white px-4 py-2 uppercase">
              Coming Soon
            </span>
          </div>
          
          <!-- Cursor-Following GIF Preview (Constrained within container) -->
          <div 
            v-if="hoveredProject === project.id && !project.disabled"
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
              <div class="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  v-if="project.logo" 
                  :src="project.logo" 
                  :alt="`${project.title} logo`"
                  class="w-full h-full object-contain"
                />
                <span v-else class="text-xs font-black text-slate-900 uppercase bg-white w-full h-full rounded-full flex items-center justify-center">{{ project.title.charAt(0) }}</span>
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
import ProjectDetails from '@/components/modules/projects/ProjectDetails.vue';
import { projects as allProjectsData } from '@/data/projects';

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

// All projects from data source
const allProjects = ref(allProjectsData);

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
