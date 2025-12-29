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
import Hero from '@/components/modules/landing/Hero.vue';
import About from '@/components/modules/landing/About.vue';
import ProjectsSection from '@/components/modules/landing/Projects.vue';
import Experience from '@/components/modules/landing/Experience.vue';
import TechStack from '@/components/modules/landing/TechStack.vue';    
</script>
