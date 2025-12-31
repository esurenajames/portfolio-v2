<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const updateTheme = () => {
  // Always use white for theme color and status bar as requested
  const themeColor = '#ffffff';
  const colorScheme = 'light';
  const statusBar = 'default';

  // Update Meta Theme Color
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', themeColor);
  }

  // Update Apple Status Bar Style
  let metaApple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (metaApple) {
    metaApple.setAttribute('content', statusBar);
  }

  // Update HTML style
  document.documentElement.style.colorScheme = colorScheme;
  
  // Set body background to white
  document.body.style.backgroundColor = 'white';
};

watch(() => route.path, updateTheme);

onMounted(() => {
  window.scrollTo(0, 0);
  updateTheme();
});
</script>