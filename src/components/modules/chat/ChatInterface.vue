<template>
  <div class="flex flex-col h-dvh w-full bg-white overflow-hidden relative">
    <!-- Back Button (Upper Left) -->
    <div class="px-6 py-4">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        <span class="text-sm font-medium">Back</span>
      </button>
    </div>

    <!-- Welcome Section (shown when no messages) -->
    <div v-if="messages.length === 0" class="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <!-- Avatar -->
      <!-- <div class="mb-6">
        <Avatar class="w-16 h-16">
          <AvatarImage src="" alt="Sha AI" />
          <AvatarFallback class="bg-purple-600 text-white text-2xl font-bold">
            S
          </AvatarFallback>
        </Avatar>
      </div> -->

      <!-- Welcome Text -->
      <h1 class="text-xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
        Hi i am Bench
      </h1>
      <p class="text-gray-600 text-sm md:text-lg text-center max-w-xs md:max-w-md mb-12">
        Your AI assistant to learn more about James Esurena. Ask me anything!
      </p>

      <!-- Suggestion Cards -->
      <div class="w-full max-w-4xl px-3 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4 mb-6 md:mb-8">
          <Card
            v-for="suggestion in suggestions"
            :key="suggestion.title"
            @click="handleSuggestionClick(suggestion.prompt)"
            class="bg-white cursor-pointer hover:shadow-md transition-all duration-200 hover:border-gray-300 shadow-sm"
          >
            <CardHeader class="px-2.5 md:px-6 py-2 md:py-6 pb-1 md:pb-3">
              <CardTitle class="flex items-center gap-1.5 text-[12px] md:text-base text-slate-700 font-bold">
                <component :is="suggestion.icon" class="w-3.5 h-3.5 md:w-5 md:h-5 text-slate-800 shrink-0" />
                <span class="truncate">{{ suggestion.title }}</span>
              </CardTitle>
            </CardHeader>
            <CardContent class="px-2.5 md:px-6 pb-2.5 md:pb-6 pt-0">
              <CardDescription class="text-[10px] md:text-sm leading-[1.3] md:leading-relaxed line-clamp-2 md:line-clamp-none text-slate-500">
                {{ suggestion.description }}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
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
          <Avatar class="w-8 h-8">
            <AvatarImage src="" alt="Sha AI" />
            <AvatarFallback class="bg-purple-600 text-white text-sm font-bold">
              S
            </AvatarFallback>
          </Avatar>
          <div class="bg-gray-100 rounded-2xl px-4 py-2">
            <div class="flex gap-1">
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
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
import { ref, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, Briefcase, Code, User } from 'lucide-vue-next';
import MessageBubble from './MessageBubble.vue';
import ChatInput from './ChatInput.vue';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const router = useRouter();

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
    icon: Briefcase,
    prompt: 'Tell me about James\'s work experience'
  },
  {
    title: 'Technical Skills',
    description: 'Discover the technologies and tools James works with.',
    icon: Code,
    prompt: 'What are James\'s technical skills?'
  },
  {
    title: 'About James',
    description: 'Get to know James Esurena and his passion for development.',
    icon: User,
    prompt: 'Tell me about James Esurena'
  }
];

onMounted(() => {
  // Scroll to top when component mounts
  window.scrollTo(0, 0);
});

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
