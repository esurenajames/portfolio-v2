<template>
  <Dialog :open="isOpen" @update:open="$emit('close')">
    <DialogContent 
      class="p-0 border shadow-2xl transition-all duration-300 max-w-2xl"
      :class="[
        theme === 'dark' 
          ? 'bg-[#040404] border-white/10 text-gray-100' 
          : 'bg-white border-gray-200 text-gray-900'
      ]"
    >
      <DialogHeader class="sr-only">
        <DialogTitle>Command Menu</DialogTitle>
        <DialogDescription>Search for commands and links.</DialogDescription>
      </DialogHeader>
      
      <!-- Search Header -->
      <div 
        class="flex items-center px-4 border-b h-14 shrink-0"
        :class="theme === 'dark' ? 'border-white/10' : 'border-gray-200'"
      >
        <SearchIcon 
          class="w-5 h-5 mr-3" 
          :class="theme === 'dark' ? 'text-gray-500' : 'text-gray-400'"
        />
        <input 
          ref="inputRef"
          type="text" 
          placeholder="Type a command or search..." 
          class="flex-1 bg-transparent border-none outline-none text-sm h-full"
          :class="[
            theme === 'dark' 
              ? 'text-gray-100 placeholder:text-gray-600' 
              : 'text-gray-700 placeholder:text-gray-400'
          ]"
          v-model="searchQuery"
          @keydown.enter="handleEnter"
        />
        <div 
          class="text-[10px] px-1.5 py-0.5 rounded border font-mono"
          :class="[
            theme === 'dark'
              ? 'bg-white/5 text-gray-400 border-white/10'
              : 'bg-gray-100 text-gray-600 border-gray-200'
          ]"
        >ESC</div>
      </div>

      <!-- Content -->
      <div class="p-2">
        
        <!-- Navigation Section -->
        <div v-if="filteredNavLinks.length > 0" class="mb-2">
          <div 
            class="text-[10px] font-medium px-2 py-1.5 mb-1 uppercase tracking-wider"
            :class="theme === 'dark' ? 'text-gray-600' : 'text-gray-500'"
          >Navigation</div>
          
          <a v-for="link in filteredNavLinks" :key="link.name" :href="link.href"
            class="flex items-center gap-3 px-2 py-2 rounded-md transition-colors group cursor-pointer text-sm"
            :class="[
              theme === 'dark'
                ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
            ]"
            @click="$emit('close')"
          >
            <component 
              :is="link.icon" 
              class="w-4 h-4 transition-colors" 
              :class="[
                theme === 'dark'
                  ? 'text-gray-600 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
              ]"
            />
            <span class="flex-1">{{ link.name }}</span>
          </a>
        </div>

        <!-- Socials Section -->
        <div v-if="filteredSocialLinks.length > 0" class="mb-2">
          <div 
            class="text-[10px] font-medium px-2 py-1.5 mb-1 uppercase tracking-wider"
            :class="theme === 'dark' ? 'text-gray-600' : 'text-gray-500'"
          >Socials</div>
          
          <a v-for="link in filteredSocialLinks" :key="link.name" :href="link.href" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-3 px-2 py-2 rounded-md transition-colors group cursor-pointer text-sm"
            :class="[
              theme === 'dark'
                ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
            ]"
            @click="$emit('close')"
          >
            <component 
              :is="link.icon" 
              class="w-4 h-4 transition-colors" 
              :class="[
                theme === 'dark'
                  ? 'text-gray-600 group-hover:text-white'
                  : 'text-gray-600 group-hover:text-gray-900'
              ]"
            />
            <span class="flex-1">{{ link.name }}</span>
            <div 
              class="text-xs font-mono" 
              :class="theme === 'dark' ? 'text-gray-700 group-hover:text-gray-500' : 'text-gray-500 group-hover:text-gray-600'" 
              v-if="link.shortcut"
            >{{ link.shortcut }}</div>
          </a>
        </div>
          
        <div v-if="filteredNavLinks.length === 0 && filteredSocialLinks.length === 0" class="px-2 py-8 text-center text-sm text-gray-500">
          No results found.
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Search as SearchIcon, 
  Github as GithubIcon, 
  Facebook as FacebookIcon, 
  Linkedin as LinkedinIcon, 
  Mail as MailIcon, 
  Instagram as InstagramIcon,
  Home as HomeIcon,
  Folder as ProjectIcon,
  Briefcase as BriefcaseIcon,
  Cpu as CpuIcon
} from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  isOpen: boolean;
  theme?: 'light' | 'dark';
}>(), {
  theme: 'light'
});

const emit = defineEmits(['close']);

const searchQuery = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const navLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Projects", href: "/projects", icon: ProjectIcon },
  { name: "Experience", href: "/#experience", icon: BriefcaseIcon },
  { name: "Skills", href: "/#skills", icon: CpuIcon },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/esurenajames", icon: GithubIcon, shortcut: "GH" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/esurenajames/", icon: LinkedinIcon, shortcut: "LI" },
  { name: "Facebook", href: "https://www.facebook.com/CinnamonEsurena/", icon: FacebookIcon, shortcut: "FB" },
  { name: "Instagram", href: "https://instagram.com/cinnamonesurena", icon: InstagramIcon, shortcut: "IG" },
  { name: "Email", href: "mailto:esurenajames@gmail.com", icon: MailIcon, shortcut: "EM" },
];

const filteredNavLinks = computed(() => {
  if (!searchQuery.value) return navLinks;
  const q = searchQuery.value.toLowerCase();
  return navLinks.filter(link => link.name.toLowerCase().includes(q));
});

const filteredSocialLinks = computed(() => {
  if (!searchQuery.value) return socialLinks;
  const q = searchQuery.value.toLowerCase();
  return socialLinks.filter(link => link.name.toLowerCase().includes(q));
});

// Focus input when opened
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    searchQuery.value = ''; // Reset search logic on open
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});

const handleEnter = () => {
  const allLinks = [...filteredNavLinks.value, ...filteredSocialLinks.value];
  const link = allLinks[0];
  if (link) {
    if (link.href.startsWith('http')) {
      window.open(link.href, '_blank');
    } else {
      window.location.href = link.href;
    }
    emit('close');
  }
};
</script>
