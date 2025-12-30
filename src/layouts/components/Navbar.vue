<template>
  <nav 
    class="sticky top-0 z-50 w-full transition-all duration-500 ease-in-out"
    :class="[
      navTheme === 'light' 
        ? 'bg-white/80 backdrop-blur-md border-b border-black/5' 
        : 'bg-transparent border-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between gap-6">
        
        <!-- Left Side: Logo + Nav Links -->
        <div class="flex items-center gap-2 flex-1">
          <!-- Logo (Button Style) -->
          <button 
            @click="router.push('/')"
            class="flex-shrink-0 px-3 py-2 border transition-colors flex items-center justify-center rounded-md"
            :class="[
              (navTheme === 'dark' || navTheme === 'dark-transparent') 
                ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                : 'bg-black/5 border-black/5 hover:bg-black/10'
            ]"
          >
            <img 
              src="@/assets/logo.svg" 
              alt="Portfolio" 
              class="h-6 w-auto transition-all duration-300" 
              :class="{ 'invert': (navTheme !== 'dark' && navTheme !== 'dark-transparent') }"
            />
          </button>

          <!-- Desktop Navigation (Left Aligned) -->
          <div class="hidden md:flex items-center gap-2">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="(item.to ? item.to : item.href) as string"
              class="px-4 py-2 text-sm font-semibold border rounded-md transition-all duration-300"
              :class="[
                (navTheme === 'dark' || navTheme === 'dark-transparent')
                  ? 'text-gray-50 bg-white/5 border-white/10 hover:bg-white/10'
                  : 'text-slate-900 bg-black/5 border-black/5 hover:bg-black/10'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right Side: Search + Hire Me -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Search Button (Hello Badge Style) -->
          <button 
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-300 group cursor-pointer"
            :class="[
              (navTheme === 'dark' || navTheme === 'dark-transparent')
                ? 'text-gray-50 bg-white/5 border-white/10 hover:bg-white/10'
                : 'text-slate-900 bg-black/5 border-black/5 hover:bg-black/10'
            ]"
            @click="isSearchOpen = true"
          >
            <SearchIcon class="w-4 h-4" />
            <span class="text-xs font-mono font-bold tracking-widest uppercase">Search something...</span>
            <span 
              class="hidden lg:inline-block ml-2 text-[10px] border rounded px-1.5 py-0.5 transition-colors"
              :class="navTheme === 'dark' ? 'text-gray-400 border-white/20' : 'text-gray-500 border-black/10'"
            >⌘K</span>
          </button>

          <button
            @click="handleEmail()"
            class="px-4 py-2 text-sm font-semibold border rounded-md transition-all duration-300"
            :class="[
              (navTheme === 'dark' || navTheme === 'dark-transparent')
                ? 'text-gray-50 bg-white/5 border-white/10 hover:bg-white/10'
                : 'text-slate-900 bg-black/5 border-black/5 hover:bg-black/10'
            ]"
          >
            Get in touch
          </button>
        </div>


        <!-- Mobile menu button -->
        <div class="flex md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-black focus:outline-none"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Sidebar -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-250 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed top-0 left-0 bottom-0 z-[999] w-80 bg-white/95 backdrop-blur-xl border-r border-black/5 shadow-2xl overflow-y-auto"
        >
          <!-- Sidebar Header -->
          <div class="flex items-center justify-between px-6 py-6 border-b border-black/5">
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 px-3 py-2 bg-black/5 border border-black/5 rounded-md flex items-center justify-center">
                <img src="@/assets/logo.svg" alt="Portfolio" class="h-6 w-auto invert" />
              </div>
            </div>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-black focus:outline-none"
              @click="isMobileMenuOpen = false"
            >
              <span class="sr-only">Close menu</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Sidebar Content -->
          <div class="px-6 py-6 space-y-3">
            <!-- Search Button (Mobile) -->
            <button
              type="button"
              class="w-full flex items-center gap-3 rounded-md px-4 py-3 text-base font-bold text-gray-600 hover:bg-black/5 hover:text-black transition-colors"
              @click="isSearchOpen = true; isMobileMenuOpen = false"
            >
              <SearchIcon class="w-5 h-5" />
              <span class="flex-1 text-left">Search</span>
              <span class="text-[10px] text-gray-400 border border-black/10 rounded px-1.5 py-0.5">K</span>
            </button>
            
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="(item.to ? item.to : item.href) as string"
              class="block rounded-md px-4 py-3 text-base font-bold text-gray-600 hover:bg-black/5 hover:text-black transition-colors"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>

            <!-- Hire Me Button -->
            <div class="pt-4 mt-4 border-t border-black/5">
              <a
                href="mailto:esurenajames@gmail.com"
                target="_blank"
                class="block w-full rounded-md border border-slate-900 bg-transparent px-4 py-3 text-center text-base font-semibold text-slate-900 hover:bg-slate-900 hover:text-gray-50 transition-colors"
                @click="isMobileMenuOpen = false"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </transition>

      <!-- Overlay -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-250 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[998]"
          @click="isMobileMenuOpen = false"
        ></div>
      </transition>
    </Teleport>

    <CommandMenu :is-open="isSearchOpen" @close="isSearchOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Search as SearchIcon } from 'lucide-vue-next';
import CommandMenu from '../../composables/CommandMenu.vue';
import router from '@/router';

const isMobileMenuOpen = ref(false);
const navTheme = ref<'transparent' | 'light' | 'dark' | 'dark-transparent'>('transparent');
const isSearchOpen = ref(false);

const navItems: Array<{ name: string; to?: string; href?: string }> = [
  { name: "Projects", to: "/projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
];

const handleScroll = () => {
  const scrollY = window.scrollY;
  
  if (scrollY < 50) {
    navTheme.value = 'transparent';
    return;
  }

  const aboutSection = document.getElementById('about');
  
  if (aboutSection) {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if we are within the About section
    // Added a small buffer to handle sticky container behavior
    if (rect.top <= 0 && rect.bottom > 0) {
      // Logic for dark-transparent transition within About
      // On desktop, the horizontal scroll starts after expansion (0.15 progress)
      // The total height of About is rect.height
      const aboutProgress = Math.abs(rect.top) / (rect.height - windowHeight);
      
      // If we're on desktop and expansion is well under way
      if (window.innerWidth >= 768) {
        if (aboutProgress > 0.1) {
          navTheme.value = 'dark-transparent';
        } else {
          navTheme.value = 'light';
        }
      } else {
        // Mobile behavior: switch to dark when background starts turning black
        // The mobile About header starts after hero
        navTheme.value = 'dark-transparent';
      }
      return;
    }
  }

  // Default to light theme for other sections (Projects, Experience, TechStack)
  navTheme.value = 'light';
};

const handleKeydown = (e: KeyboardEvent) => {
  // Check if 'k' is pressed (with or without Cmd/Ctrl)
  if (e.key === 'k' || e.key === 'K') {
    // Ignore if user is typing in an input field
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }
    
    e.preventDefault();
    isSearchOpen.value = !isSearchOpen.value;
  }
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
});

const handleEmail = () => {
  window.open('mailto:esurenajames@gmail.com', '_blank');
};
</script>

<style scoped>
/* Minimalist styles */
</style>