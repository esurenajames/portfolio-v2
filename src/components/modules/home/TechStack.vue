<template>
  <section ref="sectionRef" id="skills" class="relative bg-white py-16 px-6 md:px-12">
    <!-- Title -->
    <div class="mx-0 lg:mx-8 mb-16 select-none cursor-default text-center perspective-1000">
      <h2 
        class="flex justify-center gap-[0.5vw] md:gap-4 overflow-hidden text-5xl md:text-9xl font-black tracking-tighter text-gray-900 uppercase leading-none font-roboto"
        aria-label="TECH STACK"
      >
        <span 
          v-for="(letterObj, index) in rollerLetters" 
          :key="index"
          class="relative flex flex-col items-center h-[1em] overflow-hidden"
        >
          <!-- The Rolling Strip -->
          <span 
            class="flex flex-col items-center"
            :style="getLetterStyle(index)"
          >
             <span 
               v-for="(char, charIndex) in letterObj.strip" 
               :key="charIndex"
               class="block h-[1em] flex items-center justify-center text-center whitespace-pre text-gray-900"
             >
               {{ char }}
             </span>
          </span>
        </span>
      </h2>
    </div>

    <!-- Professional At Label -->
    <div class="mx-0 lg:mx-8 mb-8 text-center md:text-left">
      <span class="text-xs font-bold text-slate-900 tracking-widest uppercase">PROFESSIONAL AT</span>
    </div>

    <!-- Tech Stack Grid -->
    <div class="mx-0 lg:mx-8">
      <!-- Top Row - Height based -->
      <div class="grid grid-cols-3 border-l border-gray-200">
        <a
          v-for="tech in topRow"
          :key="tech.name"
          :href="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group h-64 md:h-80 flex items-center justify-center border-r border-b border-gray-200 transition-all duration-300"
          :class="activeTechName === tech.name ? 'bg-black' : 'bg-white hover:bg-black'"
          @mouseenter="activeTechName = tech.name"
        >
          <img 
            :src="tech.logo" 
            :alt="tech.name"
            class="w-20 h-20 md:w-24 md:h-24 object-contain transition-all duration-500"
            :class="activeTechName === tech.name ? 'scale-110' : 'group-hover:scale-110'"
          />
        </a>
      </div>

      <!-- Bottom Row - Height based -->
      <div class="grid grid-cols-4 md:grid-cols-8 border-l border-gray-200">
        <a
          v-for="tech in bottomRow"
          :key="tech.name"
          :href="tech.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group h-32 md:h-40 flex items-center justify-center border-r border-gray-200 transition-all duration-300"
          :class="activeTechName === tech.name ? 'bg-black' : 'bg-white hover:bg-black'"
          @mouseenter="activeTechName = tech.name"
        >
          <img 
            :src="tech.logo" 
            :alt="tech.name"
            class="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-500"
            :class="activeTechName === tech.name ? 'scale-110' : 'group-hover:scale-110'"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const sectionRef = ref(null);
const scrollProgress = ref(0);
const targetScrollProgress = ref(0);
let animationFrameId = null;

const activeTechName = ref('Vue.js');

const targetText = "TECH STACK";

// We use 6 identical characters to create a longer, faster-feeling strip
// "Only 6 letters doing that" interpreted as strip length 6
const rollerLetters = targetText.split('').map(char => {
  return { char, strip: Array(6).fill(char) };
});

const handleScroll = () => {
  if (!sectionRef.value) return;
  
  const rect = sectionRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  const distanceFromCenter = rect.top - (viewportHeight / 2) + (rect.height / 2);
  
  // Extremely slow rotation
  targetScrollProgress.value = distanceFromCenter * -0.05; 
};

// Animation loop for smoothness (Lerping)
const updateScroll = () => {
  // Linear interpolation: current + (target - current) * factor
  const diff = targetScrollProgress.value - scrollProgress.value;
  
  if (Math.abs(diff) > 0.01) {
    scrollProgress.value += diff * 0.02; // Slow lerp
  }
  
  animationFrameId = requestAnimationFrame(updateScroll);
};

// Compute styles for each letter
const getLetterStyle = (index) => {
  // We want the word to "assemble" (become readable) when at the center.
  // Center is when scrollProgress is roughly 0.
  
  // 1. DYNAMIC STAGGER: Reduce stagger as we get closer to 0 (center).
  // Use a bell curve or simple distance check.
  // Gaussian-ish: e^(-x^2) or just 1 / (1 + abs(x))
  const proximity = Math.max(0, 1 - Math.abs(scrollProgress.value) / 50); // 0 to 1 (1 where centered)
  
  // If we are close to center (proximity > 0), reduce stagger to 0
  // Stagger is normally 15. At center it becomes 0.
  const staggerAmount = 15 * (1 - proximity);
  
  const staggerGroup = Math.floor(index / 2); 
  const stagger = staggerGroup * staggerAmount; 
  
  let currentPos = scrollProgress.value + stagger;
  
  // 2. MAGNETIC SNAP: 
  // If we are very close to center (proximity > 0.7?), snap to exactly 0 (or nearest 100 aligned).
  // Since we want "TECH STACK", 0 is the start of our strip which is valid.
  // Actually, any multiple of 100 is valid.
  if (proximity > 0.5) {
     // Strong snap to nearest 100
     const snapTarget = Math.round(currentPos / 100) * 100;
     // Lerp towards snap based on proximity strength
     const snapStrength = (proximity - 0.5) * 2; // 0 to 1
     currentPos = currentPos + (snapTarget - currentPos) * snapStrength;
  }
  
  const totalItems = 6;
  const cycle = 100 * (totalItems - 1); 
  
  const wrappedPos = -((Math.abs(currentPos) % cycle));
  
  return {
    transform: `translateY(${wrappedPos}%)`,
    willChange: 'transform' 
  };
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initial calculation
  handleScroll();
  // Start animation loop
  updateScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

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
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    url: 'https://www.javascript.com'
  },
  {
    name: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    url: 'https://www.php.net'
  },
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
    name: 'Git',
    logo: 'https://cdn.worldvectorlogo.com/logos/git-icon.svg',
    url: 'https://git-scm.com/'
  }
]);
</script>

<style scoped>
/* No CSS animation needed, driven by scroll */
</style>
