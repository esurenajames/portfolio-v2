<template>
  <transition
    leave-active-class="transition duration-1000 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="!isLoaded" class="fixed inset-0 h-dvh z-[100] flex items-center justify-center bg-white">
      <div class="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
        <img 
          src="@/assets/logo.png" 
          alt="Loading..."
          class="absolute inset-0 w-full h-full object-contain opacity-5 grayscale"
        />
        
        <div 
          class="absolute inset-0 w-full h-full"
          :style="{ 
            clipPath: `inset(${100 - progress}% 0 0 0)`,
          }"
        >
          <img 
            src="@/assets/logo.png" 
            alt="Loading..."
            class="w-full h-full object-contain brightness-0"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projects } from '@/data/projects';

const isLoaded = ref(false);
const progress = ref(0);

const emit = defineEmits(['complete']);

onMounted(async () => {
  window.scrollTo(0, 0);
  const preloadAssets = async () => {
    const assetPromises = projects.flatMap(project => {
      const assets = [];
      if (project.gif) assets.push(project.gif);
      if (project.image && typeof project.image === 'string') assets.push(project.image);
      return assets;
    }).map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
    
    await Promise.all(assetPromises);
  };

  const minDuration = 3000;
  const startTime = Date.now();
  
  // Visual animation loop
  let animationFrame = 0;
  const animate = () => {
    const elapsed = Date.now() - startTime;
    // Animate up to 95% based on minDuration
    const rawProgress = Math.min(elapsed / minDuration, 0.95);
    progress.value = rawProgress * 100;
    
    if (progress.value < 100 && !isLoaded.value) {
      animationFrame = requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);

  // Wait for both minimum time and asset loading
  await Promise.all([
    new Promise(resolve => setTimeout(resolve, minDuration)),
    preloadAssets()
  ]);

  // Complete
  cancelAnimationFrame(animationFrame);
  progress.value = 100;
  
  setTimeout(() => {
    isLoaded.value = true;
    emit('complete');
  }, 500);
});
</script>

<style scoped>
.brightness-0 {
  filter: brightness(0);
}
</style>

<style scoped>
/* Optional: Fine-tune the stroke if needed */
:deep(path) {
  vector-effect: non-scaling-stroke;
}
</style>
