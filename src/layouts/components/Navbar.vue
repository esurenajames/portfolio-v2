<template>
  <nav 
    class="sticky top-0 z-50 w-full border-b transition-all duration-300"
    :class="[
      isScrolledPastHero 
        ? 'bg-white/80 backdrop-blur-md border-black/5' 
        : 'bg-transparent border-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between gap-6">
        
        <!-- Left Side: Logo + Nav Links -->
        <div class="flex items-center gap-2 flex-1">
          <!-- Logo (Button Style) -->
          <a 
            href="#" 
            class="flex-shrink-0 px-3 py-2 bg-black/5 border border-black/5 rounded-md hover:bg-black/10 transition-colors flex items-center justify-center"
          >
            <img src="@/assets/logo.svg" alt="Portfolio" class="h-6 w-auto invert" />
          </a>

          <!-- Desktop Navigation (Left Aligned) -->
          <div class="hidden md:flex items-center gap-2">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="px-4 py-2 text-sm font-semibold text-[#040404] bg-black/5 border border-black/5 rounded-md hover:bg-black/10 transition-colors"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Right Side: Search + Hire Me -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Search Button (Hello Badge Style) -->
          <button 
            type="button"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-black/5 border border-black/5 hover:bg-black/10 transition-colors text-[#040404] group cursor-pointer"
            @click="isSearchOpen = true"
          >
            <SearchIcon class="w-4 h-4" />
            <span class="text-xs font-mono font-bold tracking-widest uppercase">Search something...</span>
            <span class="hidden lg:inline-block ml-2 text-[10px] text-gray-500 border border-black/10 rounded px-1.5 py-0.5">⌘K</span>
          </button>

          <a
            href="#contact"
            class="px-4 py-2 text-sm font-semibold text-[#040404] bg-black/5 border border-black/5 rounded-md hover:bg-black/10 transition-colors"
          >
            Hire Me
          </a>
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
        class="md:hidden fixed top-0 left-0 bottom-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-black/5 shadow-2xl overflow-y-auto"
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
          
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="block rounded-md px-4 py-3 text-base font-bold text-gray-600 hover:bg-black/5 hover:text-black transition-colors"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </a>

          <!-- Hire Me Button -->
          <div class="pt-4 mt-4 border-t border-black/5">
            <a
              href="#contact"
              class="block w-full rounded-md border border-[#040404] bg-transparent px-4 py-3 text-center text-base font-semibold text-[#040404] hover:bg-[#040404] hover:text-white transition-colors"
              @click="isMobileMenuOpen = false"
            >
              Hire Me
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
        class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        @click="isMobileMenuOpen = false"
      ></div>
    </transition>

    <CommandMenu :is-open="isSearchOpen" @close="isSearchOpen = false" />
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Search as SearchIcon } from 'lucide-vue-next';
import CommandMenu from '../../composables/CommandMenu.vue';

const isMobileMenuOpen = ref(false);
const isScrolledPastHero = ref(false);
const isSearchOpen = ref(false);

const navItems = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const handleScroll = () => {
  isScrolledPastHero.value = window.scrollY > window.innerHeight - 100;
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
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* Minimalist styles */
</style>