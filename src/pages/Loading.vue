<template>
  <transition
    leave-active-class="transition duration-1000 ease-in-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="!isLoaded" class="fixed inset-0 z-[100] flex items-center justify-center bg-white">
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

const isLoaded = ref(false);
const progress = ref(0);

const emit = defineEmits(['complete']);

onMounted(() => {
  window.scrollTo(0, 0);
  const duration = 3000; 
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);

    progress.value = rawProgress * 100;
    
    if (rawProgress < 1) {
      requestAnimationFrame(animate);
    } else {
      progress.value = 100;

      setTimeout(() => {
        isLoaded.value = true;
        emit('complete');
      }, 600);
    }
  };
  
  requestAnimationFrame(animate);
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
