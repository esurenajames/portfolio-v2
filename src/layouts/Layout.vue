<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-900 relative">
    <!-- Global Grid Background -->
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
    
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
    </div>

    <button 
      @click="scrollToTop"
      class="fixed bottom-6 right-4 z-50 p-3 bg-black text-white rounded-full shadow-2xl transition-all duration-500 hover:bg-[#5B7553] group"
      :class="[showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none']"
      aria-label="Scroll to top"
    >
      <ArrowUp class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ArrowUp } from 'lucide-vue-next';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const showScrollTop = ref(false);

const handleScroll = () => {
  // Show button after scrolling down 80% of viewport (approx past hero)
  showScrollTop.value = window.scrollY > window.innerHeight * 0.8;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
</style>