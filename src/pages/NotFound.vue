<template>
  <div class="h-dvh w-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <!-- Animated Background Text -->
    <div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
      <span class="text-[40vw] font-black font-roboto leading-none">404</span>
    </div>

    <!-- Content -->
    <div class="z-10 text-center max-w-lg mx-auto">
      <h1 class="text-8xl md:text-9xl font-black mb-4 font-roboto tracking-tighter">
        404
      </h1>
      
      <div class="w-24 h-1 bg-black mx-auto mb-8"></div>

      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
        Page Not Found
      </h2>
      
      <p class="text-gray-500 text-lg mb-12">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <button 
        @click="router.push('/')"
        class="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
      >
        <div class="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out"></div>
        <ArrowLeft class="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-1" />
        <span class="font-bold relative z-10">Back to Home</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';

const router = useRouter();
</script>

<script lang="ts">
export default {
  name: 'NotFound'
};
</script>
