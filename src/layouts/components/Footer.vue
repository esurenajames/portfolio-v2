<template>
  <footer class="border-t border-black/5 bg-white py-8 text-center text-sm text-gray-500">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>&copy; {{ new Date().getFullYear() }} Portfolio. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="#" class="transition-colors hover:text-black">Privacy Policy</a>
          <a href="#" class="transition-colors hover:text-black">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>