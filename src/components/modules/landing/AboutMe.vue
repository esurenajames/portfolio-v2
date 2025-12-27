<template>
  <section 
    ref="containerRef" 
    class="bg-black relative" 
    style="height: 400vh;"
  >
    <div class="sticky top-0 h-screen flex items-center overflow-hidden">
      <div class="container mx-auto px-6 lg:px-12 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full">
          
          <!-- Left Side: Animated Text -->
          <div class="relative z-10 h-full flex flex-col justify-center">
             <div class="relative h-[300px] w-full">
                <TransitionGroup 
                  name="fade-slide"
                  tag="div"
                  class="absolute inset-0"
                >
                  <div 
                    v-for="(item, index) in items" 
                    :key="item.id"
                    v-show="currentStep === index"
                    class="absolute inset-0 flex flex-col justify-center"
                  >
                    <div class="text-[#5B7553] font-mono text-sm tracking-widest uppercase mb-4">
                      [{{ item.id }}] {{ item.label }}
                    </div>
                    
                    <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                      {{ item.title }}
                    </h2>
                    
                    <p class="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                      {{ item.description }}
                    </p>
                  </div>
                </TransitionGroup>
             </div>

             <!-- Bottom Section: Company Info (Left) and Step Indicators (Right) -->
             <div class="absolute bottom-12 left-0 right-0 flex items-end justify-between">
               <!-- Company and Role Info (Bottom Left) -->
               <div class="flex flex-col gap-1">
                 <TransitionGroup name="fade-slide">
                   <div :key="`company-${currentStep}`" class="space-y-1">
                         <div class="text-white font-bold text-sm">
                           {{ stepInfo[currentStep]?.company }}
                         </div>
                         <div class="text-gray-500 text-xs uppercase tracking-wider">
                           {{ stepInfo[currentStep]?.role }}
                     </div>
                   </div>
                 </TransitionGroup>
               </div>

               <!-- Timeline Indicator (Bottom Right) -->
               <div class="flex items-center gap-4">
                 <button
                   v-for="(item, index) in items"
                   :key="`indicator-${item.id}`"
                   @click="scrollToStep(index)"
                   class="font-mono text-sm transition-all duration-300 cursor-pointer"
                   :class="currentStep === index ? 'text-white font-bold scale-110' : 'text-gray-600 hover:text-gray-400'"
                 >
                   {{ item.id }}
                 </button>
               </div>
             </div>
          </div>

          <!-- Right Side: Timeline Visualization -->
          <div class="hidden lg:flex items-center justify-center relative h-full">
            <!-- Grid Shadow Background -->
            <div class="absolute w-[80%] h-[80%] bg-white/[0.03] blur-[120px] rounded-full z-0"></div>
            
            <!-- Grid Background -->
            <div class="absolute inset-0 opacity-20">
              <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div class="relative w-full h-[500px] flex items-center justify-center z-10">
               <!-- Animated Timeline Graph -->
               <svg class="w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
                 <!-- Grid Lines -->
                 <line x1="100" y1="50" x2="100" y2="450" stroke="#333" stroke-width="1" stroke-dasharray="5,5" />
                 <line x1="100" y1="450" x2="550" y2="450" stroke="#333" stroke-width="1" stroke-dasharray="5,5" />
                 
                 <!-- Grid Labels (Y-axis) -->
                 <text x="70" y="150" fill="#666" font-size="12" text-anchor="end">High</text>
                 <text x="70" y="300" fill="#666" font-size="12" text-anchor="end">Mid</text>
                 <text x="70" y="450" fill="#666" font-size="12" text-anchor="end">Low</text>
                 
                 <!-- Grid Labels (X-axis) - Changes based on step -->
                 <TransitionGroup name="timeline-fade">
                   <g :key="`labels-${currentStep}`">
                     <text 
                       v-for="(label, i) in gridLabels[currentStep]" 
                       :key="`label-${i}`"
                       :x="label.x" 
                       y="470" 
                       fill="#666" 
                       font-size="11" 
                       text-anchor="middle"
                     >
                       {{ label.text }}
                     </text>
                   </g>
                 </TransitionGroup>
                 
                 <!-- Timeline Path - Changes based on currentStep -->
                 <TransitionGroup name="timeline-fade">
                   <g :key="`timeline-${currentStep}`">
                     <!-- Step 0: Growth Curve -->
                     <path 
                       v-if="currentStep === 0"
                       d="M 100 400 Q 200 350, 300 300 T 500 150"
                       fill="none" 
                       stroke="url(#gradient1)" 
                       stroke-width="3"
                       class="timeline-path"
                     />
                     
                     <!-- Step 1: Tech Stack Progress -->
                     <path 
                       v-if="currentStep === 1"
                       d="M 100 400 L 200 350 L 300 320 L 400 250 L 500 180"
                       fill="none" 
                       stroke="url(#gradient2)" 
                       stroke-width="3"
                       class="timeline-path"
                     />
                     
                     <!-- Step 2: Experience Timeline -->
                     <path 
                       v-if="currentStep === 2"
                       d="M 100 400 L 200 380 L 300 300 L 400 280 L 500 200"
                       fill="none" 
                       stroke="url(#gradient3)" 
                       stroke-width="3"
                       class="timeline-path"
                     />
                     
                     <!-- Step 3: Innovation Curve -->
                     <path 
                       v-if="currentStep === 3"
                       d="M 100 400 Q 250 320, 350 250 Q 450 180, 500 120"
                       fill="none" 
                       stroke="url(#gradient4)" 
                       stroke-width="3"
                       class="timeline-path"
                     />
                     
                     <!-- Data Points -->
                     <circle 
                       v-for="(point, i) in timelinePoints[currentStep]" 
                       :key="`point-${i}`"
                       :cx="point.x" 
                       :cy="point.y" 
                       :r="point.active ? 8 : 5"
                       :fill="point.active ? '#5B7553' : '#666'"
                       class="timeline-point"
                       :class="{'glow': point.active}"
                     />
                   </g>
                 </TransitionGroup>
                 
                 <!-- Gradients -->
                 <defs>
                   <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" style="stop-color:#5B7553;stop-opacity:0.3" />
                     <stop offset="100%" style="stop-color:#5B7553;stop-opacity:1" />
                   </linearGradient>
                   <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:0.3" />
                     <stop offset="100%" style="stop-color:#4A90E2;stop-opacity:1" />
                   </linearGradient>
                   <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" style="stop-color:#9B59B6;stop-opacity:0.3" />
                     <stop offset="100%" style="stop-color:#9B59B6;stop-opacity:1" />
                   </linearGradient>
                   <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" style="stop-color:#E67E22;stop-opacity:0.3" />
                     <stop offset="100%" style="stop-color:#E67E22;stop-opacity:1" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Building2 as Building2Icon } from 'lucide-vue-next';

const containerRef = ref<HTMLElement | null>(null);
const currentStep = ref(0);

const items = [
  {
    id: '01',
    label: 'Profile',
    title: 'Who I Am',
    description: 'I graduated from National University – Fairview with a B.S. in Information Technology and a 3.8 GPA. I enjoy solving problems and creating user-friendly digital experiences.'
  },
  {
    id: '02',
    label: 'Expertise',
    title: 'Frontend & UX Design',
    description: 'I focus on building clean and intuitive interfaces with strong attention to user experience. I mainly work with Vue, React Native, Tailwind CSS, and modern UI patterns.'
  },
  {
    id: '03',
    label: 'Experience',
    title: 'Software Developer',
    description: 'I worked as an Associate Software Developer and Intern at Decode Technologies. I refactored system designs to be more intuitive and created reusable custom components, onboarding modules, email systems, and a drag-and-drop developer toolbar.'
  },
  {
    id: '04',
    label: 'Innovation',
    title: 'Learning & Improving',
    description: 'I continuously explore new technologies and integrate AI-powered solutions into my work. My goal is to build systems that are efficient, usable, and easy to maintain.'
  }
];

// Company and role information for each step
const stepInfo = [
  {
    company: 'National University',
    role: 'B.S. Information Technology'
  },
  {
    company: 'Frontend Development',
    role: 'Vue · React Native · Tailwind'
  },
  {
    company: 'Decode Technologies',
    role: 'Associate Software Developer'
  },
  {
    company: 'Continuous Learning',
    role: 'AI Integration · Modern Tech'
  }
];

// Grid labels for X-axis (changes per step)
const gridLabels = [
  // Step 0: Education journey
  [
    { x: 100, text: '2020' },
    { x: 200, text: '2021' },
    { x: 300, text: '2022' },
    { x: 400, text: '2023' },
    { x: 500, text: '2024' }
  ],
  // Step 1: Tech skills
  [
    { x: 100, text: 'HTML' },
    { x: 200, text: 'CSS' },
    { x: 300, text: 'Vue' },
    { x: 400, text: 'React' },
    { x: 500, text: 'Native' }
  ],
  // Step 2: Experience timeline
  [
    { x: 100, text: 'Intern' },
    { x: 200, text: 'Junior' },
    { x: 300, text: 'Mid' },
    { x: 400, text: 'Senior' },
    { x: 500, text: 'Lead' }
  ],
  // Step 3: Innovation
  [
    { x: 100, text: 'Learn' },
    { x: 200, text: 'Build' },
    { x: 300, text: 'Test' },
    { x: 400, text: 'Deploy' },
    { x: 500, text: 'Scale' }
  ]
];


// Timeline data points for each step
const timelinePoints = [
  // Step 0: Growth Curve
  [
    { x: 100, y: 400, active: false },
    { x: 200, y: 350, active: false },
    { x: 300, y: 300, active: false },
    { x: 400, y: 225, active: false },
    { x: 500, y: 150, active: true }
  ],
  // Step 1: Tech Stack Progress
  [
    { x: 100, y: 400, active: false },
    { x: 200, y: 350, active: false },
    { x: 300, y: 320, active: false },
    { x: 400, y: 250, active: false },
    { x: 500, y: 180, active: true }
  ],
  // Step 2: Experience Timeline
  [
    { x: 100, y: 400, active: false },
    { x: 200, y: 380, active: false },
    { x: 300, y: 300, active: false },
    { x: 400, y: 280, active: false },
    { x: 500, y: 200, active: true }
  ],
  // Step 3: Innovation Curve
  [
    { x: 100, y: 400, active: false },
    { x: 250, y: 320, active: false },
    { x: 350, y: 250, active: false },
    { x: 450, y: 180, active: false },
    { x: 500, y: 120, active: true }
  ]
];

const scrollToStep = (index: number) => {
  if (!containerRef.value) return;
  const windowHeight = window.innerHeight;
  const totalHeight = containerRef.value.offsetHeight - windowHeight;
  const targetScroll = (index / items.length) * totalHeight;
  const containerTop = containerRef.value.offsetTop;
  
  window.scrollTo({
    top: containerTop + targetScroll,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  if (!containerRef.value) return;
  
  const rect = containerRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const totalHeight = rect.height - windowHeight; // Total scrollable distance
  
  // Calculate progress (0 to 1) based on how far we've scrolled into the section
  // When rect.top is 0, we are at start. When rect.bottom is windowHeight, we are at end.
  // Actually, better to map negative top to progress.
  
  const scrolled = -rect.top;
  
  if (scrolled < 0) {
    currentStep.value = 0;
    return;
  }
  
  if (scrolled > totalHeight) {
    currentStep.value = items.length - 1;
    return;
  }

  const progress = scrolled / totalHeight;
  const step = Math.min(
    Math.floor(progress * items.length), 
    items.length - 1
  );
  
  currentStep.value = step;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.timeline-fade-enter-active,
.timeline-fade-leave-active {
  transition: all 0.6s ease;
}

.timeline-fade-enter-from {
  opacity: 0;
}

.timeline-fade-leave-to {
  opacity: 0;
}

.timeline-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawPath 1.5s ease-out forwards;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.timeline-point {
  transition: all 0.3s ease;
}

.timeline-point.glow {
  filter: drop-shadow(0 0 8px #5B7553);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
