<template>
  <!-- Full Page All Projects View -->
  <Teleport to="body">
    <!-- Backdrop -->
    <transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-250 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
        @click="closePage"
      ></div>
    </transition>

    <!-- Slide-up Page -->
    <transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-400 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[999] bg-white overflow-y-auto"
      >
        <!-- Header -->
        <div class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5">
          <div class="container mx-auto px-6 md:px-12 lg:px-16 py-6">
            <div class="flex items-center justify-between">
              <!-- Back Button -->
              <button
                @click="closePage"
                class="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors group"
              >
                <svg
                  class="w-5 h-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span class="text-sm font-bold text-black">Back</span>
              </button>

              <!-- Title -->
              <h1 class="text-2xl md:text-4xl font-black tracking-tight text-black">
                All Projects
              </h1>

              <!-- Spacer for alignment -->
              <div class="w-24"></div>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="container mx-auto px-6 md:px-12 lg:px-16 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="project in projects"
              :key="project.id"
              class="group relative bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              @click="openProjectDetails(project)"
            >
              <!-- Project Image -->
              <div class="relative aspect-video overflow-hidden">
                <img 
                  :src="project.image" 
                  :alt="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              <!-- Project Info -->
              <div class="p-6">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img 
                      v-if="project.logo" 
                      :src="project.logo" 
                      :alt="`${project.title} logo`"
                      class="w-6 h-6 object-contain"
                    />
                    <span v-else class="text-sm font-black text-slate-900 uppercase">{{ project.title.charAt(0) }}</span>
                  </div>
                  <h3 class="text-xl font-black tracking-tight text-white uppercase">
                    {{ project.title }}
                  </h3>
                </div>

                <div class="flex items-center gap-3 mb-4 text-xs">
                  <span class="text-white/60 uppercase font-bold">{{ project.category || 'Product' }}</span>
                  <span class="text-white/40">•</span>
                  <span class="text-white uppercase font-bold">{{ project.year }}</span>
                </div>

                <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {{ project.description }}
                </p>

                <!-- Tech Stack Ticker -->
                <div class="relative overflow-hidden">
                  <div class="tech-scroll flex items-center gap-3 py-1">
                    <template v-for="i in 3" :key="i">
                      <span 
                        v-for="tech in project.techStack.slice(0, 3)" 
                        :key="`${i}-${tech}`"
                        class="text-xs font-bold text-white/30 whitespace-nowrap uppercase"
                      >
                        {{ tech }} •
                      </span>
                    </template>
                  </div>
                  <div class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent"></div>
                  <div class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Spacer -->
          <div class="h-20"></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue';

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
  isOpen: boolean;
  projects: Project[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  openProject: [project: Project];
}>();

const closePage = () => {
  emit('close');
};

const openProjectDetails = (project: Project) => {
  emit('openProject', project);
};

// Prevent body scroll when page is open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    closePage();
  }
};

// Add event listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown);
}
</script>

<script lang="ts">
export default {
  name: 'AllProjectsPage'
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
  animation: scroll-left 15s linear infinite;
}

.tech-scroll:hover {
  animation-play-state: paused;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
