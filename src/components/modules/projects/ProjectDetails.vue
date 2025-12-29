<template>
  <!-- Full Page Project Details -->
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
        @click="closeModal"
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
        v-if="isOpen && project"
        class="fixed inset-0 z-[999] bg-white overflow-hidden"
      >
        <!-- Close Button (Top Left) -->
        <button
          @click="closeModal"
          class="absolute top-8 left-8 z-[1000] p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors group"
        >
          <svg
            class="w-6 h-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Main Content Container -->
        <div class="h-full w-full flex flex-col md:flex-row">
          <!-- Left Side: Sticky Project Info -->
          <div class="w-full md:w-[40%] lg:w-[35%] flex-shrink-0 border-r border-black/5">
            <div class="h-full overflow-y-auto">
              <div class="min-h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20">
                <!-- Project Title -->
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-black mb-6 leading-[0.9]">
                  {{ project.title }}
                </h1>

                <!-- Project Meta -->
                <div class="flex items-center gap-3 mb-8 text-sm">
                  <span class="text-black/60">{{ project.category || 'Product' }}</span>
                  <span class="text-black/20">•</span>
                  <span class="text-black/60">{{ project.year }}</span>
                </div>

                <!-- Project Description -->
                <div class="space-y-4 mb-12 text-black/70 leading-relaxed">
                  <p>
                    {{ project.description || 'A beautifully crafted project showcasing modern design and development practices.' }}
                  </p>
                </div>

                <!-- Tech Stack -->
                <div class="mb-10">
                  <h3 class="text-xs font-bold tracking-wider text-black/40 uppercase mb-4">Technologies</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in project.techStack"
                      :key="tech"
                      class="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-md text-sm font-medium text-black/80 transition-colors"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Project Links -->
                <div v-if="project.liveUrl || project.githubUrl" class="flex gap-3">
                  <a
                    v-if="project.liveUrl"
                    :href="project.liveUrl"
                    target="_blank"
                    class="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-black/90 transition-all hover:scale-105 text-sm"
                  >
                    View Live
                  </a>
                  <a
                    v-if="project.githubUrl"
                    :href="project.githubUrl"
                    target="_blank"
                    class="px-6 py-3 bg-black/5 border border-black/10 text-black font-bold rounded-full hover:bg-black/10 transition-all hover:scale-105 text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side: Scrollable Image Grid -->
          <div class="w-full md:w-[60%] lg:w-[65%] overflow-y-auto bg-gray-50">
            <div class="p-8 md:p-12 lg:p-16">
              <!-- Image Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Main Project Image (Full Width) -->
                <div class="md:col-span-2 relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <img 
                    :src="project.image" 
                    :alt="project.title"
                    class="w-full h-full object-cover"
                  />
                </div>

                <!-- Gallery Images (2 columns) -->
                <div
                  v-for="(image, index) in project.gallery"
                  :key="index"
                  class="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    :src="image" 
                    :alt="`${project.title} screenshot ${index + 1}`"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <!-- GIF Preview (if available) -->
                <div
                  v-if="project.gif"
                  class="md:col-span-2 relative aspect-video rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    :src="project.gif" 
                    :alt="`${project.title} demo`"
                    class="w-full h-full object-cover"
                  />
                </div>
              </div>

              <!-- Bottom Spacer -->
              <div class="h-20"></div>
            </div>
          </div>
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
  project: Project | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const closeModal = () => {
  emit('close');
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
    closeModal();
  }
};

// Add event listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown);
}
</script>

<script lang="ts">
export default {
  name: 'ProjectDetails'
};
</script>

<style scoped>
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
</style>
