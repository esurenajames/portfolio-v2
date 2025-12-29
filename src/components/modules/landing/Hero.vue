<template>
  <section 
    ref="heroRef" 
    class="relative h-[90vh] bg-transparent overflow-hidden"
  >
    <div class="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pointer-events-none">
        <div class="pointer-events-auto w-full md:w-fit">
            <a 
              href="https://www.linkedin.com/in/esurenajames/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 rounded-md bg-black/5 border border-black/10 hover:bg-black/10 transition-colors group cursor-pointer w-fit mb-4"
              :style="{ opacity: scrollProgress > 0.3 ? 1 : 0 }"
              @mouseenter="startScramble"
            >
              <div class="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#5B7553] rounded-sm"></div>
              <span class="text-slate-900 text-[10px] md:text-xs font-bold tracking-[0.1em] md:tracking-widest uppercase font-mono">
                {{ displayedText }}
              </span>
              <ArrowUpRight class="w-3 md:w-3.5 h-3 md:h-3.5 text-gray-400 group-hover:text-slate-900 transition-colors" />
            </a>
           
           <div class="relative mb-6">
             <h1 
               ref="h1Ref"
               class="text-slate-900 text-5xl md:text-7xl font-bold tracking-tighter transition-opacity duration-300"
               :style="{ opacity: scrollProgress >= 1 ? 1 : 0 }"
             >
               <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-[#5B7553]">FRONTEND</span><br>
               DEVELOPER
             </h1>
             
             <div 
               class="pointer-events-none select-none"
               :style="bigTextStyle"
             >
               <div class="flex flex-col font-roboto">
                 <span class="font-black text-slate-900 tracking-tighter leading-[0.85]">
                   FRONTEND
                 </span>
                 <span class="font-black text-slate-900 tracking-tighter leading-[0.85]">
                   DEVELOPER
                 </span>
               </div>
             </div>
           </div>
           
            <!-- Description - fades in after text settles -->
            <p 
              class="text-gray-600 max-w-128 text-base md:text-lg leading-relaxed tracking-normal md:tracking-wider mb-8 transition-opacity duration-700 font-lato"
              :style="{ opacity: scrollProgress > 0.5 ? 1 : 0 }"
            >
             I create solutions with a strong focus on design and user experience. I build modern web applications that solve problems through clear, user-friendly interfaces.
            </p>
           
            <!-- Buttons - fade in last -->
            <div 
              class="flex flex-col sm:flex-row gap-4 transition-opacity duration-700"
              :style="{ opacity: scrollProgress > 0.6 ? 1 : 0 }"
            >
               <button class="px-6 md:px-8 py-2.5 md:py-3 bg-[#5B7553] text-gray-50 font-bold rounded-md hover:bg-[#4a6143] transition-colors cursor-pointer border border-[#5B7553] text-sm md:text-base">
                  My Work
               </button>
               <button class="px-6 md:px-8 py-2.5 md:py-3 bg-black/5 border border-black/10 text-slate-900 font-medium rounded-md hover:bg-black/10 transition-colors cursor-pointer text-sm md:text-base">
                  Contact
               </button>
            </div>
        </div>
    </div>

    <!-- Right Side Animation (Horizontal Collage) -->
    <div 
      class="absolute right-0 top-0 h-full w-full lg:w-1/2 flex items-center justify-center z-0"
    >
      <div 
        class="hidden lg:flex relative w-full items-center justify-center transition-all duration-1000 ease-out transform"
        :class="animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'"
      >
          <!-- Handwritten Hint -->
          <div 
            class="absolute -top-4 left-[35%] -translate-x-1/2 flex flex-col items-center pointer-events-none transition-opacity duration-500 delay-1000 z-50 whitespace-nowrap"
            :class="animationComplete ? 'opacity-100' : 'opacity-0'"
          >
            <span class="text-3xl font-bold text-gray-700 rotate-[-5deg] font-caveat">
              "Hover over me to color"
            </span>
            <div class="relative w-16 h-12 -mt-2 -rotate-[15deg] ml-12">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-gray-700">
                <path d="M10 10 Q 50 10 70 80 M 70 80 L 60 70 M 70 80 L 80 70" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>

          <!-- Right composition -->
          <div class="hidden lg:flex flex-1 relative min-h-[600px] items-center justify-center">
            <div class="flex items-center -space-x-8">
              <div 
                v-for="(image, index) in collageImages" 
                :key="index"
                class="relative transition-transform duration-500 hover:scale-105 hover:z-30 cursor-pointer pointer-events-auto group"
                :style="getImageStyle(index)"
                @mousemove="handlePaint($event, index)"
              >
                <!-- Color Image (Bottom) -->
                <img 
                  :src="image.url" 
                  :alt="image.alt"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                
                <!-- Canvas Mask (Top - Grayscale layer to be erased) -->
                <canvas 
                  :ref="el => { if (el) masks[index] = el as HTMLCanvasElement }"
                  class="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                ></canvas>
                
                <!-- Center Typing Prompt Overlay -->
                <div 
                  v-if="index === 2"
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-auto"
                >
                  <div class="bg-white p-8 border border-black/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.35)] flex flex-col gap-6 backdrop-blur-md w-[480px] h-[240px] rounded-2xl relative">
                    <div class="flex-1 flex items-center">
                      <h2 class="text-3xl font-bold text-slate-900 leading-tight min-h-[96px] font-roboto">
                        {{ currentTypedText }}<span class="inline-block w-[3px] h-[1em] bg-slate-900 animate-pulse ml-1 align-middle"></span>
                      </h2>
                    </div>
                    
                    <button class="bg-[#5B7553] text-gray-50 px-8 py-3 text-sm font-bold hover:bg-[#4a6143] transition-colors self-start border border-[#5B7553] rounded-lg">
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { 
  ArrowUpRight
} from 'lucide-vue-next';
import brushUrl from '@/assets/brush.svg';

const heroRef = ref<HTMLElement | null>(null);

const collageImages = [
  { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800', alt: 'Vibrant Orange Abstract' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', alt: 'UI Dashboard Design' },
  { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000', alt: 'Artistic Abstract Orange Gradient' },
  { url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=800', alt: 'Vibrant Orange Fluid Design' },
  { url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800', alt: 'Vibrant Technology Interface' },
];

const getImageStyle = (index: number) => {
  const isCenter = index === 2;
  const isOuter = index === 0 || index === 4;
  
  const width = isCenter ? 340 : isOuter ? 240 : 290;
  const height = isCenter ? 460 : isOuter ? 340 : 400;
  
  return {
    width: `${width}px`,
    height: `${height}px`,
    zIndex: isCenter ? 30 : isOuter ? 10 : 20,
    opacity: isOuter ? 0.7 : 1,
    scale: isCenter ? 1 : isOuter ? 0.8 : 0.9,
    borderRadius: '0',
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 80px 160px -30px rgba(0,0,0,0.5)',
    cursor: animationComplete.value 
      ? `url("${brushUrl}") 16 16, pointer` 
      : 'default'
  };
};

// Continuous Reveal Painting Logic
const masks = ref<HTMLCanvasElement[]>([]);
const contexts = ref<(CanvasRenderingContext2D | null)[]>([]);

const drawImageProp = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
  const offsetX = 0.5;
  const offsetY = 0.5;

  let iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   // new prop. width
      nh = ih * r,   // new prop. height
      cx, cy, cw, ch, ar = 1;

  // decide which gap to fill    
  if (nw < w) ar = w / nw;                             
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
};

const initCanvas = (i: number) => {
  const canvas = masks.value[i];
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx || !collageImages[i]) return;
  contexts.value[i] = ctx;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = collageImages[i].url;
  img.onload = () => {
    ctx.filter = 'grayscale(100%)';
    // Use drawImageProp to mimic object-cover
    drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
  };
};

const handlePaint = (e: MouseEvent, index: number) => {
  if (!animationComplete.value) return; // Only allow painting after lock-in
  
  let ctx = contexts.value[index];
  if (!ctx) {
     initCanvas(index);
     ctx = contexts.value[index];
  }
  if (!ctx) return;
  
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.globalCompositeOperation = 'destination-out';
  
  const radius = 50;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
};

// Typing Animation Logic
const phrases = [
  "bring your best ideas to life.",
  "use design to help you reach the right people.",
  "build a website that actually makes an impact.",
  "create products that grow your business"
];

const currentPhraseIndex = ref(0);
const currentTypedText = ref("");
const isDeleting = ref(false);

const type = () => {
  const currentFullText = phrases[currentPhraseIndex.value % phrases.length] || "";
  
  if (isDeleting.value) {
    currentTypedText.value = currentFullText.substring(0, Math.max(0, currentTypedText.value.length - 1));
  } else {
    currentTypedText.value = currentFullText.substring(0, currentTypedText.value.length + 1);
  }

  let delta = 150 - Math.random() * 100;

  if (isDeleting.value) { delta /= 2; }

  if (!isDeleting.value && currentTypedText.value === currentFullText) {
    isDeleting.value = true;
    delta = 2000; // Wait at end
  } else if (isDeleting.value && currentTypedText.value === "") {
    isDeleting.value = false;
    currentPhraseIndex.value++;
    delta = 500;
  }

  setTimeout(() => {
    type();
  }, delta);
};

const scrollY = ref(0);
const animationComplete = ref(false);
const accumulatedScroll = ref(0);
const h1Ref = ref<HTMLElement | null>(null);
const h1Rect = ref({ top: 0, left: 0, width: 0, height: 0, fontSize: 0 });

// Scramble Text Logic
const originalText = "HELLO, I'M JAMES ESURENA";
const displayedText = ref(originalText);
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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
  const startFontSize = windowWidth * 0.19; 
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

// Touch support for mobile swiping
const touchStartY = ref(0);

const handleTouchStart = (e: TouchEvent) => {
  if (animationComplete.value || !e.touches[0]) return;
  touchStartY.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
  if (animationComplete.value || !e.touches[0]) return;
  
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY.value - touchY;
  
  // We amplify swipe delta slightly for better feel
  const amplifiedDelta = deltaY * 1.5;
  
  if (amplifiedDelta > 0 || accumulatedScroll.value > 0) {
    accumulatedScroll.value = Math.max(0, accumulatedScroll.value + amplifiedDelta);
    // Prevent default to stop actual page scroll during animation
    if (e.cancelable) e.preventDefault();
  }
  
  touchStartY.value = touchY;
};

onMounted(() => {
  // Lock scroll initially
  document.body.style.overflow = 'hidden';
  
  updateH1Rect();
  window.addEventListener('resize', updateH1Rect);
  
  // Listen to wheel events to control the animation
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Mobile touch listeners
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });

  // Start typing animation
  type();

  // Initialize canvases individual as they become ready
  collageImages.forEach((_, i) => {
    setTimeout(() => initCanvas(i), 800);
  });
});

onUnmounted(() => {
  // Restore scroll
  document.body.style.overflow = 'auto';
  
  window.removeEventListener('resize', updateH1Rect);
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
});
</script>

<style scoped>
/* Smooth transitions for all elements */
</style>
