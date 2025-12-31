<template>
  <section id="experience" class="relative min-h-dvh bg-white px-6 md:px-12 py-0 md:py-8">
    <div class="mx-0 lg:mx-8 bg-black rounded-lg lg:rounded-4xl p-6 md:p-12 lg:p-16 overflow-hidden relative">
      <!-- Section Header -->
      <div class="mb-12">
        <span class="text-white/60 font-mono text-xs tracking-[0.2em] uppercase block mb-4">Experience</span>
        <h2 class="text-white text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter max-w-6xl leading-[1.1]">
          Contributing to tech communities and turning projects into user-friendly solutions. Each role helps me grow as a developer, designer, and leader.
        </h2>
      </div>

      <!-- Experience List -->
      <div class="space-y-0 divide-y divide-white/10">
        <div 
          v-for="(item, index) in experienceItems" 
          :key="index"
          class="group py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start transition-all duration-500 hover:bg-white/[0.02] -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16"
        >
          <!-- Left: ID & Role -->
          <div class="lg:col-span-4 flex flex-col justify-between h-full">
            <div class="mb-3 lg:mb-0">
              <span class="text-white/30 font-mono text-xs tracking-widest mb-3 block">{{ item.id }}</span>
              <h3 class="text-white text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#5B7553] transition-colors">
                {{ item.title }}
              </h3>
            </div>
          </div>

          <!-- Right: Details -->
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-6">
              <div class="text-lg md:text-xl text-white font-medium tracking-tight">
                {{ item.company }}
              </div>
              <div class="flex flex-col md:flex-row gap-2 md:gap-3 text-white/60 font-mono text-xs uppercase tracking-wider">
                <span class="bg-white/5 px-3 py-1.5 rounded-full w-fit">{{ item.duration }}</span>
                <span v-if="item.location" class="bg-white/5 px-3 py-1.5 rounded-full w-fit">{{ item.location }}</span>
              </div>
            </div>

            <!-- Skills Chips -->
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="skill in item.skills" 
                :key="skill"
                class="px-3 py-1.5 rounded-full border bg-transparent border-white/10 text-white/60 text-xs font-medium hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default hover:scale-105"
              >
                {{ skill }}
            </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Badge } from '@/components/ui/badge';

const experienceItems = ref([
  {
    id: '01',
    title: 'Associate Software Developer',
    company: 'Decode Technologies',
    duration: 'Jun 2025 – Present',
    location: 'Quezon City, PH',
    skills: [
      'Full-Stack Development', 
      'Product Development', 
      'Custom Components',
      'Tool Calling', 
      'ClickUp', 
      'Trello', 
      'API Design', 
      'System Integration', 
      'AI Chatbot Integration'
    ]
  },
  {
    id: '02',
    title: 'Software Developer Intern',
    company: 'Decode Technologies',
    duration: 'Jan 2025 – Jun 2025',
    location: 'Quezon City, PH',
    skills: [
      'Laravel', 
      'Vue 2', 
      'Quasar', 
      'React Native', 
      'TablePlus', 
      'MySQL', 
    ]
  },
  {
    id: '03',
    title: 'Bachelor of Science in Information Technology',
    company: 'National University – Fairview',
    duration: '2021 – 2025',
    location: 'Quezon City, PH',
    skills: [
      'Information Technology', 
      'Software Development', 
      'Problem Solving', 
      'Critical Thinking'
    ]
  },
  {
    id: '04',
    title: 'Vice President',
    company: 'Codability Tech Student Organization',
    duration: '2023 – 2024',
    location: 'Quezon City, PH',
    skills: [
      'Team Leadership',
      'Stakeholder Communication',
      'Partner Relations',
      'Event Planning',
      'Project Management',
      'Public Speaking',
      'Decision-Making',
      'Collaboration'
    ]
  },
  {
    id: '05',
    title: 'Chief Operations Officer',
    company: 'Google Developer Student Club - NU Fairview',
    duration: '2023 – 2024',
    location: 'Quezon City, PH',
    skills: [
      'Operational Planning',
      'People Management',
      'Partnership Development',
      'Team Coordination',
      'Event Execution',
      'Process Management',
      'Community Engagement',
      'Project Coordination'
    ]
  }
]);
</script>
