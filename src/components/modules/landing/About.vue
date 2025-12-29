<template>
  <!-- Mobile: Simple Vertical Stack -->
  <section v-if="windowWidth < 768" class="relative bg-white">
    <!-- Black Background Container with Blobs -->
    <div class="relative bg-[#040404] overflow-hidden">
      <!-- Animated Blobs -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5B7553]/20 rounded-full blur-[120px] animate-blob"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7A996F]/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>
      <!-- About Me Header -->
      <div class="relative flex flex-col items-center justify-center px-6 py-12">
        <div class="text-center space-y-8">
          <h1 class="text-gray-50 text-6xl font-black tracking-tighter uppercase leading-none font-roboto">
            ABOUT ME
          </h1>
          <p class="text-gray-400 text-lg max-w-md mx-auto">
            Discover more about me and how i do things.
          </p>
        </div>
      </div>

      <!-- Section 1: The Vision -->
      <div class="relative min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div class="max-w-4xl grid grid-cols-1 gap-8 items-center">
        <div class="space-y-6">
          <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#01</span>
          <h2 class="text-gray-50 text-3xl font-black tracking-tighter leading-none font-roboto">
            THINKING
          </h2>
          <p class="text-gray-400 text-md leading-relaxed font-lato">
            Every pixel has a purpose, every interaction tells a story. I create simple, clear experiences that guide users naturally.
          </p>
        </div>
        <div class="relative group">
          <div class="absolute inset-0 bg-gray-100 translate-x-4 translate-y-4 rounded-2xl"></div>
          <img 
            src="@/assets/images/profile.jpg" 
            class="relative w-full aspect-[4/5] object-cover rounded-2xl"
            alt="Vision"
          />
        </div>
      </div>
    </div>

      <!-- Section 2: Building -->
      <div class="relative min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div class="max-w-4xl w-full grid grid-cols-1 gap-8 items-center">
        <div class="space-y-8">
          <div>
            <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#02</span>
            <h2 class="text-gray-50 text-3xl font-black tracking-tighter leading-none font-roboto mb-4">
              BUILDING
            </h2>
            <p class="text-gray-400 text-md leading-relaxed font-lato">
              I start by understanding the problem — the users, constraints, and goals. Then I design solutions that are simple, organized, and easy to maintain.
            </p>
          </div>
          
          <div class="flex flex-col gap-3">
            <div v-for="item in buildingBlocks" :key="item" class="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex items-center gap-4">
              <span class="w-2 h-2 bg-[#5B7553] rounded-full flex-shrink-0"></span>
              <span class="text-gray-200 font-bold text-md tracking-tighter">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
          <img 
            src="@/assets/gifs/bike.gif" 
            class="w-full h-full object-cover"
            alt="Building"
          />
        </div>
      </div>
    </div>

      <!-- Section 3: Impact -->
      <div class="relative min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div class="max-w-4xl w-full grid grid-cols-1 gap-8 items-center">
        <div class="relative group">
          <div class="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
              class="w-full aspect-[4/3] object-cover"
              alt="Impact Showcase"
            />
          </div>
        </div>

        <div class="space-y-6">
          <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#03</span>
          <h2 class="text-gray-50 text-3xl font-black tracking-tighter leading-none font-roboto">
            IMPACT
          </h2>
          <p class="text-gray-400 text-md leading-relaxed">
            Bridging the gap between technology and design to help businesses connect with users.
          </p>

          <div class="grid grid-cols-2 gap-6 pt-4">
            <div class="space-y-2">
              <div class="text-[#5B7553] text-3xl font-black font-roboto">10+</div>
              <div class="text-gray-500 text-sm uppercase tracking-wider">Projects</div>
            </div>
            <div class="space-y-2">
              <div class="text-[#5B7553] text-3xl font-black font-roboto">100%</div>
              <div class="text-gray-500 text-sm uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>

  <!-- Desktop: Parallax Horizontal Scroll -->
  <section v-else ref="sectionRef" class="relative min-h-[500vh] md:min-h-[1000vh] bg-white">
    <!-- Sticky Container -->
    <div class="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
      
      <!-- Big About Me Background Texts (Visible during initial growth) -->
      <div 
        class="absolute inset-0 flex flex-col justify-center pointer-events-none select-none font-roboto z-0 pl-[5vw] md:pl-[10vw]"
        :style="{ 
          opacity: bigTextOpacity,
          transform: `translateY(${-scrollProgress * 200 * (1 - expansionP)}px)` 
        }"
      >
        <!-- Top: Bolder Slate-900 -->
        <div class="text-slate-900 font-black tracking-tighter uppercase whitespace-nowrap text-8xl lg:text-[24vw]">
          ABOUT ME
        </div>
        
        <!-- Bottom: Low Opacity Grey (offset more to the left) -->
        <div class="text-slate-900 opacity-5 font-black tracking-tighter uppercase whitespace-nowrap text-8xl lg:text-[24vw] ml-[-25vw]">
          ABOUT ME
        </div>
      </div>

      <!-- The Main Container (Expands then scrolls horizontally) -->
      <div 
        class="relative flex items-center transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) shadow-[0_0_100px_rgba(0,0,0,0.1)] bg-[#040404] z-10 will-change-transform"
        :style="containerStyle"
      >
        <!-- Side Navigation (Visible when full screen) -->
        <nav 
          class="absolute left-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-8 transition-all duration-700 pointer-events-auto"
          :style="{ opacity: contentFadeP, pointerEvents: contentFadeP > 0.5 ? 'auto' : 'none' }"
        >
          <button 
            v-for="(phase, index) in phases" 
            :key="index"
            @click="scrollToPhase(index)"
            class="group flex items-center gap-4 text-left transition-all duration-500 cursor-pointer"
            :class="[currentPhaseIndex === index ? 'opacity-100 translate-x-2' : 'opacity-30 hover:opacity-100']"
          >
            <span 
              class="font-mono text-xs transition-colors duration-500"
              :class="[currentPhaseIndex === index ? 'text-[#5B7553]' : 'text-gray-500']"
            >
              0{{ index + 1 }}
            </span>
            <div class="h-[1px] bg-current transition-all duration-500" :style="{ width: currentPhaseIndex === index ? '40px' : '0px' }"></div>
            <span class="text-gray-200 text-xs font-black tracking-[0.2em] uppercase transition-all duration-500">
              {{ phase.title }}
            </span>
          </button>
        </nav>

        <!-- Horizontal Scroll Track -->
        <div 
          class="flex h-full transition-all duration-700 ease-out will-change-transform"
          :style="{ 
            transform: `translateX(${-horizontalOffset}px)`,
            opacity: contentFadeP,
            visibility: isFullPage ? 'visible' : 'hidden'
          }"
        >
          <!-- Block 1: The Vision -->
          <div class="w-screen h-full flex-shrink-0 flex items-center justify-center px-12 md:px-32">
            <div class="max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div class="space-y-6">
                <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#01</span>
                <h2 class="text-gray-50 text-3xl md:text-8xl font-black tracking-tighter leading-none font-roboto">
                  THINKING
                </h2>
                <p class="text-gray-400 text-md md:text-xl leading-relaxed font-lato max-w-md">
                  Every pixel has a purpose, every interaction tells a story. I create simple, clear experiences that guide users naturally.
                </p>
              </div>
              <div class="relative group">
                <div class="absolute inset-0 bg-gray-100 translate-x-4 translate-y-4 rounded-2xl"></div>
                <img 
                  src="@/assets/images/profile.jpg" 
                  class="relative w-full aspect-[4/5] object-cover rounded-2xl transition-all duration-700"
                  alt="Vision"
                />
              </div>
            </div>
          </div>

          <!-- Block 2: Building (Updated Layout with GIF placeholder) -->
          <div class="w-screen h-full flex-shrink-0 flex items-center justify-center px-12 md:px-32 bg-slate-900/10">
            <div class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <!-- Left: Text and Blocks -->
              <div class="space-y-8">
                <div>
                  <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#02</span>
                  <h2 class="text-gray-50 text-3xl md:text-8xl font-black tracking-tighter leading-none font-roboto mb-8">
                      BUILDING
                  </h2>
                  <p class="text-gray-400 text-md md:text-xl leading-relaxed font-lato max-w-md">
                      I start by understanding the problem — the users, constraints, and goals. Then I design solutions that are simple, organized, and easy to maintain.
                  </p>
                </div>
                
                <div class="flex flex-col gap-3 md:gap-6">
                  <div v-for="item in buildingBlocks" :key="item" class="p-2 md:p-4 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/5 transition-colors group flex items-center gap-4">
                    <span class="w-2 h-2 bg-[#5B7553] rounded-full flex-shrink-0"></span>
                    <span class="text-gray-200 font-bold text-md md:text-xl tracking-tighter">{{ item }}</span>
                  </div>
                </div>
              </div>

              <div class="relative w-full aspect-video md:aspect-square bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center group">
                 <img 
                  src="@/assets/gifs/bike.gif" 
                  class="relative w-full aspect-[4/5] object-cover rounded-2xl transition-all duration-700"
                  alt="Vision"
                 />
                 <div class="absolute inset-0 bg-[#5B7553]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          <!-- Block 3: Impact (Side-by-Side Layout) -->
          <div class="w-screen h-full flex-shrink-0 flex items-center justify-center px-12 md:px-32">
             <div class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Image -->
                <div class="relative group order-2 lg:order-1">
                   <div class="absolute -inset-4 bg-gradient-to-br from-[#5B7553]/30 to-transparent blur-3xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                   <div class="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                      <img 
                         src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                         class="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                         alt="Impact Showcase"
                      />
                      <!-- Subtle gradient overlay for depth -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   </div>
                </div>

                <!-- Right: Text Content -->
                <div class="space-y-0 order-1 lg:order-2">
                   <div class="flex items-center gap-4">
                      <span class="text-[#5B7553] font-mono text-sm tracking-[0.3em] uppercase">#03</span>
                   </div>
                   
                   <h2 class="text-gray-50 text-3xl md:text-8xl font-black tracking-tighter leading-none font-roboto mb-8">
                     IMPACT
                   </h2>
                   
                   <p class="text-gray-400 text-md md:text-xl leading-relaxed font-lato max-w-lg">
                     Bridging the gap between technology and design to help businesses connect with users.
                   </p>

                   <!-- Optional: Stats or highlights -->
                   <div class="grid grid-cols-2 gap-6 pt-8">
                      <div class="space-y-2">
                         <div class="text-[#5B7553] text-3xl font-black font-roboto">10+</div>
                         <div class="text-gray-500 text-sm uppercase tracking-wider">Projects</div>
                      </div>
                      <div class="space-y-2">
                         <div class="text-[#5B7553] text-3xl font-black font-roboto">100%</div>
                         <div class="text-gray-500 text-sm uppercase tracking-wider">Satisfaction</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div class="w-screen h-full flex-shrink-0 flex items-center justify-center px-12 md:px-32 bg-gradient-to-r from-transparent to-[#5B7553]/5">
            <div class="text-center space-y-12">
              <h2 class="text-gray-50 text-5xl md:text-7xl font-black tracking-tighter font-roboto uppercase">
                LET'S BUILD.
              </h2>
              <button @click="handleEmail()" class="md:px-12 px-6 py-2 md:py-4 w-full md:w-auto bg-[#5B7553] text-gray-50 font-black rounded-xl hover:bg-[#4a6143] transition-all transform hover:scale-105 active:scale-95 text-xl tracking-widest shadow-2xl">
                 GET IN TOUCH
              </button>
            </div>
          </div>
        </div>

        <div class="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
          <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5B7553]/20 rounded-full blur-[120px] animate-blob"></div>
          <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#7A996F]/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        </div>
      </div>

      <div 
        class="absolute bottom-12 left-12 right-12 h-[1px] bg-white/5 z-20 overflow-hidden transition-opacity duration-500"
        :style="{ opacity: expansionP === 1 ? 1 : 0 }"
      >
         <div 
           class="h-full bg-[#5B7553] transition-all duration-300 ease-out"
           :style="{ width: `${horizontalP * 100}%` }"
         ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useElementBounding, useWindowSize } from '@vueuse/core';
import { ChevronDown } from 'lucide-vue-next';

const sectionRef = ref<HTMLElement | null>(null);
const { top, height } = useElementBounding(sectionRef);
const { height: windowHeight, width: windowWidth } = useWindowSize();

const scrollProgress = computed(() => {
  if (!sectionRef.value) return 0;
  const totalInternalScroll = height.value - windowHeight.value;
  const currentScroll = Math.abs(Math.min(top.value, 0));
  return Math.min(Math.max(currentScroll / totalInternalScroll, 0), 1);
});

// Phase Logic for 1000vh:
// 0.0 -> 0.3: Expansion to full screen
// 0.3 -> 0.45: Lock on Phase 01
// 0.45 -> 0.55: Transition to 02
// 0.55 -> 0.65: Lock on Phase 02
// 0.65 -> 0.75: Transition to 03
// 0.75 -> 0.85: Lock on Phase 03
// 0.85 -> 0.95: Transition to 04
// 0.95 -> 1.0: Lock on Phase 04

const expansionP = computed(() => Math.min(scrollProgress.value / 0.3, 1));
const isFullPage = computed(() => expansionP.value === 1);

const contentFadeP = computed(() => {
  if (scrollProgress.value < 0.3) return 0;
  return Math.min((scrollProgress.value - 0.3) / 0.1, 1);
});

const horizontalP = computed(() => {
  const p = scrollProgress.value;
  const isMobile = windowWidth.value < 768;

  if (p < 0.3) return 0;

  if (isMobile) {
    // On mobile, hold the first phase until 0.45 (same as desktop) 
    // so the user actually sees the first slide after expansion.
    if (p < 0.45) return 0;
    return Math.min(Math.max((p - 0.45) / 0.5, 0), 1);
  }

  // Desktop: Keep the locking for precise scroll wheel control
  if (p < 0.45) return 0; // Locked on P1
  
  if (p >= 0.45 && p < 0.55) {
     // Transition 1 -> 2
     const progress = (p - 0.45) / 0.1;
     return 0 + (0.333) * progress;
  }
  if (p >= 0.55 && p < 0.65) return 0.333; // Locked on P2
  
  if (p >= 0.65 && p < 0.75) {
     // Transition 2 -> 3
     const progress = (p - 0.65) / 0.1;
     return 0.333 + (0.333) * progress;
  }
  if (p >= 0.75 && p < 0.85) return 0.666; // Locked on P3
  
  if (p >= 0.85 && p < 0.95) {
     // Transition 3 -> 4
     const progress = (p - 0.85) / 0.1;
     return 0.666 + (0.334) * progress;
  }
  
  return 1; // Locked on P4
});

const containerStyle = computed(() => {
  const p = expansionP.value;
  
  // Start from a square Play Button
  const startSize = 300; // 300px
  const currentW = startSize + (windowWidth.value - startSize) * p;
  const currentH = startSize + (windowHeight.value - startSize) * p;
  const currentBR = 4 * (1 - p); // Higher border radius for the icon look

  // Morphing clip-path from a classic right-pointing triangle to a rectangle
  // Using 4 points to allow smooth morphing to a 4-point rectangle
  const triPoints = [
    { x: 10, y: 10 },   // Top Left (pulled in)
    { x: 90, y: 50 },   // Tip Right
    { x: 10, y: 90 },   // Bottom Left (pulled in)
    { x: 10, y: 50 }    // Mid Left
  ];
  const rectPoints = [
    { x: 0, y: 0 }, 
    { x: 100, y: 0 }, 
    { x: 100, y: 100 }, 
    { x: 0, y: 100 }
  ];

  const morph = (i: number, axis: 'x' | 'y') => {
    const start = triPoints[i] ? triPoints[i][axis] : 0;
    const end = rectPoints[i] ? rectPoints[i][axis] : 0;
    return start + (end - start) * p;
  };

  const clipPathValue = `polygon(
    ${morph(0, 'x')}% ${morph(0, 'y')}%, 
    ${morph(1, 'x')}% ${morph(1, 'y')}%, 
    ${morph(2, 'x')}% ${morph(2, 'y')}%, 
    ${morph(3, 'x')}% ${morph(3, 'y')}%
  )`;

  return {
    width: `${currentW}px`,
    height: `${currentH}px`,
    borderRadius: `${currentBR}rem`,
    clipPath: clipPathValue,
    // Apply a soft green glow when full screen
    boxShadow: p > 0.8 
      ? `0 0 100px -20px rgba(91, 117, 83, ${0.2 * horizontalP.value})` 
      : '0 20px 50px rgba(0,0,0,0.3)', // Deeper shadow for the button
  };
});

const bigTextOpacity = computed(() => {
  const p = scrollProgress.value;
  // Fade out background text as expansion completes (0.0 -> 0.5)
  if (p < 0.1) return 1;
  if (p > 0.5) return 0;
  return 1 - (p - 0.1) / 0.4;
});

// Smoothed horizontal offset to prevent jitter on mobile
const targetHorizontalOffset = computed(() => {
  const numBlocks = 4;
  const totalDistance = (numBlocks - 1) * windowWidth.value;
  return horizontalP.value * totalDistance;
});

const smoothedHorizontalOffset = ref(0);
let animationFrameId: number | null = null;
let previousScrollProgress = 0;

const updateSmoothOffset = () => {
  const isMobile = windowWidth.value < 768;
  
  // Detect scroll direction
  const currentProgress = scrollProgress.value;
  const isScrollingUp = currentProgress < previousScrollProgress;
  previousScrollProgress = currentProgress;
  
  // Use stronger smoothing when scrolling up to prevent jitter
  const baseLerpFactor = isMobile ? 0.12 : 0.2;
  const lerpFactor = isScrollingUp ? baseLerpFactor * 0.6 : baseLerpFactor;
  
  const diff = targetHorizontalOffset.value - smoothedHorizontalOffset.value;
  
  if (Math.abs(diff) > 0.5) {
    smoothedHorizontalOffset.value += diff * lerpFactor;
  } else {
    smoothedHorizontalOffset.value = targetHorizontalOffset.value;
  }
  
  animationFrameId = requestAnimationFrame(updateSmoothOffset);
};

const horizontalOffset = computed(() => smoothedHorizontalOffset.value);

const phases = [
  { title: "Thinking" },
  { title: "Building" },
  { title: "Impact" },
  { title: "Future" }
];

const buildingBlocks = ["Flows", "Interactions", "Maintainability"];
const currentPhaseIndex = computed(() => {
  return Math.round(horizontalP.value * (phases.length - 1));
});

const scrollToPhase = (index: number) => {
  if (!sectionRef.value) return;
  
  const totalInternalScroll = height.value - windowHeight.value;
  // Map phase index to its lock center point
  const centers = [0.375, 0.6, 0.8, 0.975];
  const targetProgress = centers[index] || 0.375;
  
  // Find absolute top of section in document
  const rect = sectionRef.value.getBoundingClientRect();
  const absoluteTop = rect.top + window.scrollY;
  
  window.scrollTo({
    top: absoluteTop + (targetProgress * totalInternalScroll),
    behavior: 'smooth'
  });
};

const handleEmail = () => {
  window.open('mailto:esurenajames@gmail.com', '_blank');
};

onMounted(() => {
  updateSmoothOffset();
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<script lang="ts">
export default {
  name: "AboutHorizontal"
};
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.cubic-bezier {
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}
</style>