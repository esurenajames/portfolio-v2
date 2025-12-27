<template>
  <div class="min-h-screen flex flex-col bg-[#040404] text-foreground relative">
    <!-- Global Grid Background -->
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
    
    <!-- Content Layer -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
</style>