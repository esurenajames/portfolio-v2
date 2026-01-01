<template>
  <Layout>
    <ProjectView 
      :projects="allProjects" 
      :show-back-button="showBackButton"
      @project-click="openProjectDetails"
    />
    <ProjectDetails 
      :is-open="isProjectDetailsOpen" 
      :project="selectedProject"
      @close="closeProjectDetails"
    />
  </Layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Layout from '@/layouts/Layout.vue';
import ProjectView from '@/components/modules/projects/ProjectView.vue';
import ProjectDetails from '@/components/modules/projects/ProjectDetails.vue';
import { projects as allProjectsData, type Project } from '@/data/projects';

const route = useRoute();

// Show back button based on route query parameter
const showBackButton = computed(() => route.query.showBack === 'true');

// Project Details Modal State
const isProjectDetailsOpen = ref(false);
const selectedProject = ref<Project | null>(null);

const openProjectDetails = (project: Project) => {
  if (project.disabled) return;
  selectedProject.value = project;
  isProjectDetailsOpen.value = true;
};

const closeProjectDetails = () => {
  isProjectDetailsOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
};

// All projects
const allProjects = ref<Project[]>(allProjectsData);
</script>

<script lang="ts">
export default {
  name: 'ProjectsPage'
};
</script>
