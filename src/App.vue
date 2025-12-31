<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const updateTheme = () => {
  const isHome = route.path === '/';
  // Use black for home page, white for others
  const themeColor = isHome ? '#000000' : '#ffffff';
  const colorScheme = isHome ? 'dark' : 'light';
  const statusBar = isHome ? 'black' : 'default';

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
  
  // Update body background specifically for Home to help with bottom bar coloring
  if (isHome) {
    document.body.style.backgroundColor = 'black';
  } else {
    document.body.style.backgroundColor = 'white';
  }
};

watch(() => route.path, updateTheme);

onMounted(() => {
  window.scrollTo(0, 0);
  updateTheme();
});
</script>