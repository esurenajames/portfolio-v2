<template>
  <Layout>
    <Hero/>
    <About/>
    <ProjectsSection/>
    <Experience/>
    <TechStack/>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/layouts/Layout.vue';
import Hero from '@/components/modules/home/Hero.vue';
import About from '@/components/modules/home/About.vue';
import ProjectsSection from '@/components/modules/home/Projects.vue';
import Experience from '@/components/modules/home/Experience.vue';
import TechStack from '@/components/modules/home/TechStack.vue';    
</script>
