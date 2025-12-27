<template>
  <section class="relative min-h-screen w-full bg-transparent overflow-hidden">
    <!-- Main Content Container -->
    <div class="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center">
        <div class="pointer-events-auto">
           <!-- Greeting text - fades in after the big text settles -->
           <a 
             href="https://www.linkedin.com/in/esurenajames/"
             target="_blank"
             rel="noopener noreferrer"
             class="inline-flex items-center gap-3 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer w-fit mb-4"
             :style="{ opacity: scrollProgress > 0.3 ? 1 : 0 }"
             @mouseenter="startScramble"
           >
             <div class="w-2.5 h-2.5 bg-[#5B7553] rounded-sm"></div>
             <span class="text-[#F4FDFF] text-xs font-bold tracking-widest uppercase font-mono">
               {{ displayedText }}
             </span>
             <ArrowUpRight class="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
           </a>
           
           <!-- Main heading with the transitioning text -->
           <div class="relative mb-6">
             <!-- The actual h1 (hidden initially, shows when big text settles) -->
             <h1 
               ref="h1Ref"
               class="text-[#F4FDFF] text-5xl md:text-7xl font-bold tracking-tighter transition-opacity duration-300"
               :style="{ opacity: scrollProgress >= 1 ? 1 : 0 }"
             >
               <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F4FDFF] to-[#5B7553]">FRONTEND</span><br>
               DEVELOPER
             </h1>
             
             <!-- The big animated text that transitions from center to h1 position -->
             <div 
               class="pointer-events-none select-none"
               :style="bigTextStyle"
             >
               <div class="flex flex-col">
                 <span class="font-black text-[#F4FDFF] tracking-tighter leading-[0.85]">
                   FRONTEND
                 </span>
                 <span class="font-black text-[#F4FDFF] tracking-tighter leading-[0.85]">
                   DEVELOPER
                 </span>
               </div>
             </div>
           </div>
           
           <!-- Description - fades in after text settles -->
           <p 
             class="text-gray-400 max-w-128 text-lg leading-relaxed tracking-wider mb-8 transition-opacity duration-700"
             :style="{ opacity: scrollProgress > 0.5 ? 1 : 0 }"
           >
            I create solutions with a strong focus on design and user experience. I build modern web applications that solve problems through clear, user-friendly interfaces.
           </p>
           
           <!-- Buttons - fade in last -->
           <div 
             class="flex gap-4 transition-opacity duration-700"
             :style="{ opacity: scrollProgress > 0.6 ? 1 : 0 }"
           >
              <button class="px-8 py-3 bg-[#5B7553] text-[#F4FDFF] font-bold rounded-md hover:bg-[#4a6143] transition-colors cursor-pointer border border-[#5B7553]">
                 My Work
              </button>
              <button class="px-8 py-3 bg-white/5 border border-white/10 text-[#F4FDFF] font-medium rounded-md hover:bg-white/10 transition-colors cursor-pointer">
                 Contact
              </button>
           </div>
        </div>
    </div>

    <!-- Right Side Animation (Cards) -->
    <div 
      class="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center pointer-events-none z-0"
    >
      <div 
        class="grid grid-cols-2 gap-4 transition-all duration-1000 ease-out transform"
        :class="animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'"
      >
        <!-- Card 1: Calls -->
        <div class="w-40 h-40 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-2xl">
          <span class="text-xs font-bold text-gray-400 tracking-widest uppercase">Calls</span>
          <div class="flex gap-2">
            <div class="p-2 bg-blue-500/20 rounded-lg text-blue-500"><VideoIcon class="w-5 h-5"/></div>
            <div class="p-2 bg-indigo-500/20 rounded-lg text-indigo-500"><PhoneIcon class="w-5 h-5"/></div>
          </div>
        </div>

        <!-- Card 2: Tickets -->
        <div class="w-40 h-40 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-2xl mt-8">
          <span class="text-xs font-bold text-gray-400 tracking-widest uppercase">Tickets</span>
          <div class="flex gap-2">
            <div class="p-2 bg-green-500/20 rounded-lg text-green-500"><HeadphoneIcon class="w-5 h-5"/></div>
            <div class="p-2 bg-orange-500/20 rounded-lg text-orange-500"><MessageIcon class="w-5 h-5"/></div>
          </div>
        </div>

        <!-- Card 3: Reviews -->
        <div class="w-40 h-40 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-2xl">
          <span class="text-xs font-bold text-gray-400 tracking-widest uppercase">Reviews</span>
          <div class="flex gap-2">
            <div class="p-2 bg-yellow-500/20 rounded-lg text-yellow-500"><StarIcon class="w-5 h-5"/></div>
            <div class="p-2 bg-purple-500/20 rounded-lg text-purple-500"><HeartIcon class="w-5 h-5"/></div>
          </div>
        </div>

        <!-- Card 4: Surveys -->
        <div class="w-40 h-40 bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-2xl mt-8">
          <span class="text-xs font-bold text-gray-400 tracking-widest uppercase">Surveys</span>
          <div class="flex gap-2">
            <div class="p-2 bg-sky-500/20 rounded-lg text-sky-500"><BarChartIcon class="w-5 h-5"/></div>
            <div class="p-2 bg-white/10 rounded-lg text-white"><PieChartIcon class="w-5 h-5"/></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { 
  Video as VideoIcon, 
  Phone as PhoneIcon, 
  Headphones as HeadphoneIcon, 
  MessageSquare as MessageIcon, 
  Star as StarIcon, 
  Heart as HeartIcon, 
  BarChart3 as BarChartIcon, 
  PieChart as PieChartIcon,
  ArrowUpRight
} from 'lucide-vue-next';

const scrollY = ref(0);
const animationComplete = ref(false);
const accumulatedScroll = ref(0);
const h1Ref = ref<HTMLElement | null>(null);
const h1Rect = ref({ top: 0, left: 0, width: 0, height: 0, fontSize: 0 });

// Scramble Text Logic
const originalText = "HELLO, I'M JAMES ESURENA";
const displayedText = ref(originalText);
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

let interval: number | null = null;

const startScramble = () => {
  let iteration = 0;
  
  if (interval) clearInterval(interval);
  
  interval = window.setInterval(() => {
    displayedText.value = originalText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        // Keep spaces as spaces for readability during scramble?
        // Or scramble everything:
        if (letter === " ") return " "; 
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
    
    if (iteration >= originalText.length) { 
        if (interval) clearInterval(interval);
    }
    
    iteration += 1 / 3; 
  }, 60);
};

// Calculate scroll progress (0 to 1) based on viewport height
const scrollProgress = computed(() => {
  const maxScroll = window.innerHeight * 0.8; // Transition completes within 80% of viewport height
  const progress = Math.min(accumulatedScroll.value / maxScroll, 1);
  return progress;
});

const updateH1Rect = () => {
  if (h1Ref.value) {
    const rect = h1Ref.value.getBoundingClientRect();
    const style = window.getComputedStyle(h1Ref.value);
    h1Rect.value = {
      top: rect.top, // relative to viewport
      left: rect.left,
      width: rect.width,
      height: rect.height,
      fontSize: parseFloat(style.fontSize),
    };
  }
};

// Compute the style for the big transitioning text
const bigTextStyle = computed(() => {
  const progress = scrollProgress.value;
  
  // Get dimensions (fallback if not mounted yet)
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
  
  // START STATE
  const startFontSize = windowWidth * 0.18; // 18vw
  const startLeft = windowWidth * 0.5; // 50%
  const startTop = windowHeight * 0.5; // 50%
  const startTranslateX = -50; // %
  const startTranslateY = -50; // %
  
  // END STATE (from actual H1)
  const endFontSize = h1Rect.value.fontSize || 72;
  const endLeft = h1Rect.value.left || 48;
  // If h1Rect.top is 0 (initial), approximate. But it should be updated on mount.
  // We want the text to settle exactly where the H1 is relative to viewport.
  // Since scrolling is locked, the H1's visual top position relative to viewport is constant until unlock.
  const endTop = h1Rect.value.top || windowHeight * 0.4;
  
  // Interpolation
  const currentFontSize = startFontSize + (endFontSize - startFontSize) * progress;
  const currentLeft = startLeft + (endLeft - startLeft) * progress;
  const currentTop = startTop + (endTop - startTop) * progress;
  // We interpolate the translate percentage to 0
  const currentTranslateX = startTranslateX * (1 - progress);
  const currentTranslateY = startTranslateY * (1 - progress);

  // Opacity: Always 1 until completed, then 0
  // Or fade out slightly at the very end to smooth the swap? 
  // User asked for "hidden from the start" (meaning destination).
  // "when done scrolling it was placing in the left side".
  // "since there are two frontend word showing... hidden".
  // We swap at progress == 1.
  const opacity = progress >= 1 ? 0 : 1;

  return {
    position: 'fixed' as 'fixed',
    fontSize: `${currentFontSize}px`,
    left: `${currentLeft}px`,
    top: `${currentTop}px`,
    transform: `translate(${currentTranslateX}%, ${currentTranslateY}%)`,
    opacity: opacity, // Hide when swapped
    pointerEvents: 'none' as 'none',
    transition: 'none', // We drive this frame-by-frame with scroll
    willChange: 'transform, font-size, left, top',
    zIndex: 50, // Higher than content to float over
  };
});

// Watch for animation completion
watch(scrollProgress, (newProgress) => {
  if (newProgress >= 1 && !animationComplete.value) {
    animationComplete.value = true;
    // Allow normal scrolling to resume
    document.body.style.overflow = 'auto';
  } else if (newProgress < 1 && animationComplete.value) {
     // Re-lock if they scroll back up!
     animationComplete.value = false;
     document.body.style.overflow = 'hidden';
  }
});

const handleWheel = (e: WheelEvent) => {
  // If duplication logic: 
  // If < 1, we control scroll (lock).
  // If 1, we allow scroll. BUT if they scroll UP at top of page, we catch it.
  
  // If strictly locked:
  if (!animationComplete.value) {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta > 0 || accumulatedScroll.value > 0) {
      accumulatedScroll.value = Math.max(0, accumulatedScroll.value + delta);
    }
  } else {
    // Animation is complete (page unlocked).
    // If they are at the top (scrollY 0) and scroll UP, we should reverse animation.
    if (window.scrollY <= 0 && e.deltaY < 0) {
      // Re-engage lock and reverse
      e.preventDefault();
      animationComplete.value = false;
      document.body.style.overflow = 'hidden';
      accumulatedScroll.value = Math.max(0, accumulatedScroll.value + e.deltaY);
    }
  }
};

const handleScroll = () => {
  scrollY.value = window.scrollY;
  // If we just unlocked, we might need to sync up stuff, but accumulatedScroll drives the big text.
};

onMounted(() => {
  // Lock scroll initially
  document.body.style.overflow = 'hidden';
  
  updateH1Rect();
  window.addEventListener('resize', updateH1Rect);
  
  // Listen to wheel events to control the animation
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  // Restore scroll
  document.body.style.overflow = 'auto';
  
  window.removeEventListener('resize', updateH1Rect);
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Smooth transitions for all elements */
</style>
