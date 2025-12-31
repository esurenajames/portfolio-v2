<template>
  <div class="flex items-start gap-3 mb-4" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
    <!-- Avatar -->
    <Avatar v-if="!isUser" class="w-12 h-12 flex-shrink-0 bg-transparent">
      <AvatarImage :src="botIcon" alt="Bench AI" />
      <AvatarFallback class="bg-gray-100 text-black">
        <MessageSquare :size="16" />
      </AvatarFallback>
    </Avatar>

    <!-- Message Content -->
    <div class="flex flex-col max-w-[75%]" :class="isUser ? 'items-end' : 'items-start'">
      <div
        class="rounded-2xl px-4 py-3 break-words"
        :class="
          isUser
            ? 'bg-black text-white rounded-tr-sm'
            : 'bg-gray-100 text-gray-900 rounded-tl-sm'
        "
      >
        <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message }}</p>
      </div>
      
      <!-- Timestamp and Status -->
      <div class="flex items-center gap-1.5 mt-1 px-2">
        <span class="text-xs text-gray-500">
          {{ formattedTime }}
        </span>
        
        <!-- Status indicator for user messages -->
        <div v-if="isUser" class="flex items-center">
          <!-- Loading spinner -->
          <div v-if="status === 'sending'" class="animate-spin">
            <Loader2 class="w-3 h-3 text-gray-400" />
          </div>
          <!-- Single check (sent) -->
          <Check v-else-if="status === 'sent'" class="w-3 h-3 text-gray-400" />
          <!-- Double check (delivered/read) -->
          <CheckCheck v-else class="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Loader2, Check, CheckCheck } from 'lucide-vue-next';
import botIcon from '@/assets/images/bot-icon.png';

interface Props {
  message: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered';
}

const props = withDefaults(defineProps<Props>(), {
  status: 'delivered'
});

const formattedTime = computed(() => {
  const hours = props.timestamp.getHours();
  const minutes = props.timestamp.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
});
</script>

<script lang="ts">
export default {
  name: 'MessageBubble'
};
</script>
