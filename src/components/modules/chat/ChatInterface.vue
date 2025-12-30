<template>
  <div class="flex flex-col h-[100vh] bg-white">
    <!-- Back Button (Upper Left) -->
    <div class="px-6 py-4">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span class="text-sm font-medium">Back</span>
      </button>
    </div>

    <!-- Welcome Section (shown when no messages) -->
    <div v-if="messages.length === 0" class="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <!-- Logo/Icon -->
      <div class="mb-6">
        <div class="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
          wala pa
        </div>
      </div>

      <!-- Welcome Text -->
      <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        Meet Sha
      </h1>
      <p class="text-gray-600 text-center max-w-md mb-12">
        Your AI assistant to learn more about James Esurena. Ask me anything!
      </p>

      <!-- Suggestion Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion.title"
          @click="handleSuggestionClick(suggestion.prompt)"
          class="group p-6 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all duration-200 border border-gray-200 hover:border-gray-300"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="text-gray-700">
              <component :is="suggestion.icon" class="w-5 h-5" />
            </div>
            <h3 class="font-semibold text-gray-900">{{ suggestion.title }}</h3>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">
            {{ suggestion.description }}
          </p>
        </button>
      </div>
    </div>


    <div v-else ref="messagesContainer" class="flex-1 overflow-y-auto px-6 py-8">
      <div class="max-w-4xl mx-auto space-y-6">
        <MessageBubble
          v-for="(message, index) in messages"
          :key="index"
          :message="message.text"
          :is-user="message.isUser"
          :timestamp="message.timestamp"
        />
        
        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex items-start gap-3">
          <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div class="bg-gray-100 rounded-2xl px-4 py-3">
            <div class="flex gap-1">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input Area -->
    <ChatInput
      :is-disabled="isTyping"
      @send="handleSendMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import MessageBubble from './MessageBubble.vue';
import ChatInput from './ChatInput.vue';

const router = useRouter();

// Icons as inline SVG components
const BriefcaseIcon = {
  template: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`
};

const CodeIcon = {
  template: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
};

const UserIcon = {
  template: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
};

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const messages = ref<Message[]>([]);
const isTyping = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const suggestions = [
  {
    title: 'Work Experience',
    description: 'Learn about James\'s professional background and career journey.',
    icon: BriefcaseIcon,
    prompt: 'Tell me about James\'s work experience'
  },
  {
    title: 'Technical Skills',
    description: 'Discover the technologies and tools James works with.',
    icon: CodeIcon,
    prompt: 'What are James\'s technical skills?'
  },
  {
    title: 'About James',
    description: 'Get to know James Esurena and his passion for development.',
    icon: UserIcon,
    prompt: 'Tell me about James Esurena'
  }
];

const goBack = () => {
  router.push('/');
};

const handleSuggestionClick = (prompt: string) => {
  handleSendMessage(prompt);
};

const handleSendMessage = async (text: string) => {
  if (!text.trim()) return;

  // Add user message
  messages.value.push({
    text,
    isUser: true,
    timestamp: new Date()
  });

  // Scroll to bottom
  await nextTick();
  scrollToBottom();

  // Show typing indicator
  isTyping.value = true;

  // Simulate AI response (replace with actual API call)
  setTimeout(() => {
    messages.value.push({
      text: "Hi! I'm Sha, James Esurena's AI assistant. I'm here to help you learn more about James's work, skills, and experience. In a real implementation, I would be connected to an AI API to provide detailed information about James's portfolio.",
      isUser: false,
      timestamp: new Date()
    });
    isTyping.value = false;
    
    nextTick(() => {
      scrollToBottom();
    });
  }, 1500);
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};
</script>

<script lang="ts">
export default {
  name: 'ChatInterface'
};
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
