<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // Prevent the browser from restoring the previous scroll position on refresh
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Force scroll to top
  window.scrollTo(0, 0);
});
</script>