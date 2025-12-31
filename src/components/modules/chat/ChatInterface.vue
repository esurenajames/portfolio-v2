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
    <div v-if="messages.length === 0" class="flex-1 flex flex-col items-center justify-center px-4 py-4 md:px-6 md:py-12">
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-10 mb-6 md:mb-12">
        <!-- Avatar/Greeting Image -->
        <img :src="botImage" alt="Bench AI" class="w-32 h-32 md:w-56 md:h-56 object-contain" />
        
        <div class="text-center md:text-left">
          <!-- Welcome Text -->
          <h1 class="text-2xl md:text-6xl font-bold text-gray-900 mb-2 md:mb-3">
            Hi, I'm Bench
          </h1>
          <p class="text-gray-600 text-xs md:text-xl max-w-xs md:max-w-md">
            Your AI assistant to learn more about James Esurena. Ask me anything!
          </p>
        </div>
      </div>

      <!-- Suggestion Cards -->
      <div class="w-full max-w-4xl px-3 md:px-6">
        <!-- Mobile Layout: 3 cards stacked vertically, centered -->
        <div class="flex md:hidden flex-col items-center gap-3 max-w-xs mx-auto">
          <div
            v-for="suggestion in suggestions"
            :key="suggestion.title"
            @click="handleSuggestionClick(suggestion.prompt)"
            class="w-full bg-white cursor-pointer hover:shadow-md transition-all duration-200 hover:border-gray-300 shadow-sm rounded-lg border border-gray-200 overflow-hidden"
          >
            <div class="px-4 py-4 pb-2">
              <div class="flex items-center gap-1.5 text-sm text-slate-700 font-bold">
                <component :is="suggestion.icon" class="w-3.5 h-3.5 text-slate-800 shrink-0" />
                <span>{{ suggestion.title }}</span>
              </div>
            </div>
            <div class="px-4 pb-4 pt-0">
              <p class="text-xs leading-relaxed line-clamp-2 text-slate-500">
                {{ suggestion.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Desktop Layout: 3 cards in a row -->
        <div class="hidden md:grid grid-cols-3 gap-4 mb-8">
          <div
            v-for="suggestion in suggestions"
            :key="suggestion.title"
            @click="handleSuggestionClick(suggestion.prompt)"
            class="bg-white cursor-pointer hover:shadow-md transition-all duration-200 hover:border-gray-300 shadow-sm rounded-lg border border-gray-200 overflow-hidden"
          >
            <div class="px-6 py-6 pb-3">
              <div class="flex items-center gap-2 text-base text-slate-700 font-bold">
                <component :is="suggestion.icon" class="w-5 h-5 text-slate-800 shrink-0" />
                <span>{{ suggestion.title }}</span>
              </div>
            </div>
            <div class="px-6 pb-6 pt-0">
              <p class="text-sm leading-relaxed text-slate-500">
                {{ suggestion.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else ref="messagesContainer" class="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-8">
      <div class="max-w-4xl mx-auto space-y-6">
        <MessageBubble
          v-for="(message, index) in messages"
          :key="index"
          :message="message.text"
          :is-user="message.isUser"
          :timestamp="message.timestamp"
        />
        
        <div v-if="isTyping" class="flex items-center gap-3">
          <Avatar class="w-12 h-12 bg-transparent">
            <AvatarImage :src="botIcon" alt="Bench AI" />
            <AvatarFallback class="bg-gray-100 text-black text-sm font-bold">
              B
            </AvatarFallback>
          </Avatar>
          <div class="bg-gray-100 rounded-2xl px-4 py-3">
            <div class="flex gap-1.5">
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Questions -->
    <div v-if="messages.length > 0" class="w-full px-6 mb-4 flex justify-center">
      <div class="max-w-4xl w-full">
        <div class="flex items-center justify-center mb-2">
          <button 
            @click="showQuickQuestions = !showQuickQuestions"
            class="text-xs font-medium text-gray-400 hover:text-gray-700 flex items-center gap-1.5 transition-colors duration-200"
          >
            {{ showQuickQuestions ? 'Hide' : 'Show' }} Quick Questions
            <ChevronDown 
              class="w-3.5 h-3.5 transition-transform duration-300"
              :class="showQuickQuestions ? 'rotate-0' : 'rotate-180'"
            />
          </button>
        </div>

        <div 
          class="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out"
          :class="showQuickQuestions ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
        >
          <div class="min-h-0">
            <div class="flex flex-wrap justify-center gap-2 pb-2">
              <Badge
                v-for="q in quickQuestions"
                :key="q.label"
                variant="secondary"
                :class="[
                  'transition-all duration-200 py-1.5 px-3 text-[11px] md:text-xs rounded-full font-medium bg-gray-100 text-gray-600 border-none shadow-none',
                  isTyping 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:bg-gray-200 hover:scale-105'
                ]"
                @click="!isTyping && handleSendMessage(q.prompt)"
              >
                {{ q.label }}
              </Badge>
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
import { ArrowLeft, Briefcase, Code, User, ChevronDown } from 'lucide-vue-next';
import MessageBubble from './MessageBubble.vue';
import ChatInput from './ChatInput.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import botImage from '@/assets/images/bot.png';
import botIcon from '@/assets/images/bot-icon.png';

const router = useRouter();

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const messages = ref<Message[]>([]);
const isTyping = ref(false);
const showQuickQuestions = ref(true);

const quickQuestions = [
  { label: 'Skills', prompt: 'What are your technical skills?' },
  { label: 'Projects', prompt: 'Tell me about your featured projects' },
  { label: 'Contact', prompt: 'How can I contact James?' },
  { label: 'Education', prompt: 'Where did James study?' },
  { label: 'Experience', prompt: 'Tell me about your work history' }
];
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
    description: 'Get to know James Esurena and more about his life.',
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

  // Add user message to UI
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

  try {
    // Format messages for OpenAI API
    const apiMessages = messages.value.map(m => ({
      role: m.isUser ? 'user' : 'assistant',
      content: m.text
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: apiMessages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    
    // Add AI response to UI
    messages.value.push({
      text: data.reply,
      isUser: false,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Chat Error:', error);
    messages.value.push({
      text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
      isUser: false,
      timestamp: new Date()
    });
  } finally {
    isTyping.value = false;
    nextTick(() => {
      scrollToBottom();
    });
  }
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

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
