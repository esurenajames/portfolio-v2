<template>
  <footer class="border-t border-white/10 bg-black py-8 text-center text-sm text-muted-foreground">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>&copy; {{ new Date().getFullYear() }} Portfolio. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="transition-colors hover:text-white">Privacy Policy</a>
          <a href="#" class="transition-colors hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>