<template>
  <section class="relative min-h-screen py-16 px-6 md:px-12 transition-colors duration-1000 bg-white">
    <!-- Back Button (Conditional) -->
    <div v-if="showBackButton" class="relative z-20 mx-0 lg:mx-8 mb-8">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-black/5 transition-colors group"
      >
        <ArrowLeft class="w-5 h-5 text-black" />
        <span class="text-sm font-bold text-black">Back</span>
      </button>
    </div>

    <!-- Section Header -->
    <div class="relative z-20 mx-0 lg:mx-8 mb-4">
      <div class="flex items-end justify-between pb-4">
        <h2 
          class="text-5xl md:text-9xl font-black tracking-tighter font-roboto uppercase leading-none text-gray-900"
        >
          PROJECT
        </h2>
        <span 
          class="text-5xl md:text-9xl font-black tracking-tighter font-roboto leading-none text-gray-900"
        >
          '25
        </span>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="relative z-20 mx-0 lg:mx-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="group relative bg-black p-3 rounded-lg shadow-2xl transition-all duration-500 hover:scale-[1.02]"
        :class="[
          hoveredProject === project.id ? 'cursor-none' : 'cursor-pointer',
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        ]"
        :style="{ transitionDelay: `${index * 100}ms` }"
        @click="handleProjectClick(project)"
      >
        <!-- Project Image Container (Static) -->
        <div 
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
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';

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

interface Props {
  projects: Project[];
  showBackButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: false
});

const emit = defineEmits<{
  projectClick: [project: Project]
}>();

const router = useRouter();
const hoveredProject = ref<number | null>(null);
const cursorPosition = reactive({ x: 0, y: 0 });
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});

const handleMouseEnter = (projectId: number) => {
  hoveredProject.value = projectId;
};

const handleMouseLeave = () => {
  hoveredProject.value = null;
};

const handleMouseMove = (event: MouseEvent, projectId: number) => {
  if (hoveredProject.value === projectId) {
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    cursorPosition.x = event.clientX - rect.left;
    cursorPosition.y = event.clientY - rect.top;
  }
};

const goBack = () => {
  router.push('/');
};

const handleProjectClick = (project: Project) => {
  emit('projectClick', project);
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
