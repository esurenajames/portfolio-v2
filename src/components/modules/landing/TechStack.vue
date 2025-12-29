<template>
  <section ref="sectionRef" class="relative bg-white py-16 px-6 md:px-12">
    <!-- Title -->
    <div class="mx-0 lg:mx-8 mb-16 select-none cursor-default text-center">
      <h2 class="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-gray-900 uppercase leading-none font-roboto">
        TECH STACK
      </h2>
    </div>

    <!-- Professional At Label -->
    <div class="mx-0 lg:mx-8 mb-8 text-center md:text-left">
      <span class="text-xs font-bold text-slate-900 tracking-widest uppercase">PROFESSIONAL AT</span>
    </div>

    <!-- Tech Stack Grid -->
    <div class="mx-0 lg:mx-8">
      <!-- Top Row - Height based -->
      <div class="grid grid-cols-2 md:grid-cols-3 border-l border-gray-200">
        <a
          v-for="tech in topRow"
          :key="tech.name"
          :href="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group h-64 md:h-80 flex items-center justify-center border-r border-b border-gray-200 transition-all duration-300 hover:bg-black bg-white"
        >
          <img 
            :src="tech.logo" 
            :alt="tech.name"
            class="w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-500 group-hover:scale-110"
          />
        </a>
      </div>

      <!-- Bottom Row - Height based -->
      <div class="grid grid-cols-4 md:grid-cols-7 border-l border-gray-200">
        <a
          v-for="tech in bottomRow"
          :key="tech.name"
          :href="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group h-32 md:h-40 flex items-center justify-center border-r border-gray-200 bg-white transition-all duration-300 hover:bg-black"
        >
          <img 
            :src="tech.logo" 
            :alt="tech.name"
            class="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-500 group-hover:scale-110"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const topRow = ref([
  {
    name: 'Laravel',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    url: 'https://laravel.com'
  },
  {
    name: 'Vue.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    url: 'https://vuejs.org'
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    url: 'https://www.typescriptlang.org'
  }
]);

const bottomRow = ref([
  {
    name: 'Tailwind CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    url: 'https://tailwindcss.com'
  },
  {
    name: 'React Native',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    url: 'https://reactnative.dev'
  },
  {
    name: 'Quasar',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/quasar/quasar-original.svg',
    url: 'https://quasar.dev'
  },
  {
    name: 'Figma',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    url: 'https://www.figma.com'
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    url: 'https://www.mysql.com'
  },
  {
    name: 'Canva',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    url: 'https://www.canva.com'
  },
  {
    name: 'GSAP',
    logo: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg',
    url: 'https://greensock.com/gsap/'
  }
]);
</script>
