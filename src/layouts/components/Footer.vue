<template>
  <footer class="bg-black text-white relative overflow-hidden">
    <div class="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div class="md:col-span-5 space-y-6">
          <p class="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">
            STAY INSPIRED, STAY CREATIVE
          </p>
          <p class="text-lg md:text-xl text-white/80 leading-relaxed max-w-md font-light">
            Where thoughtful design meets creativity and development.
          </p>
        </div>

        <div class="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div class="space-y-4">
            <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6">WORK</h3>
            <nav class="flex flex-col gap-3">
              <a href="/projects" class="text-sm text-white/70 hover:text-white transition-colors">Projects</a>
              <a href="#about" class="text-sm text-white/70 hover:text-white transition-colors">About</a>
              <a href="#experience" class="text-sm text-white/70 hover:text-white transition-colors">Experience</a>
            </nav>
          </div>

          <div class="space-y-4">
            <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6">CONNECT</h3>
            <nav class="flex flex-col gap-3">
              <a href="https://github.com/esurenajames" target="_blank" rel="noopener noreferrer" class="text-sm text-white/70 hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/esurenajames/" target="_blank" rel="noopener noreferrer" class="text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
              <a href="mailto:esurenajames@gmail.com" class="text-sm text-white/70 hover:text-white transition-colors">Email</a>
              <a href="https://instagram.com/cinnamonesurena" target="_blank" rel="noopener noreferrer" class="text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
            </nav>
          </div>

          <!-- LEGAL Column -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6">CONTACT</h3>
            <nav class="flex flex-col gap-3">
              <a  href="mailto:esurenajames@gmail.com" class="text-sm text-white/70 hover:text-white transition-colors">Email</a>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div class="overflow-hidden px-6 py-2 md:px-12">
      <div class="relative -left-8 md:-left-20">
        <h2 class="text-[25vw] md:text-[24vw] font-black tracking-tighter leading-none text-white/90 select-none uppercase text-left" style="font-family: 'Saans', sans-serif;">
          ESUREÑA
        </h2>
      </div>
    </div>

    <div class="border-t border-white/10 py-6">
      <div class="container mx-auto px-6 md:px-12">
        <p class="text-center text-xs text-white/30">
          © {{ new Date().getFullYear() }} James Esureña. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>