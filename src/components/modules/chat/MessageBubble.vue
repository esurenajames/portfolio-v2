<template>
  <div class="flex items-start gap-3 mb-4" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
    <!-- Avatar -->
    <Avatar v-if="!isUser" class="w-8 h-8 flex-shrink-0">
      <AvatarFallback class="bg-purple-600 text-white">
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
      
      <!-- Timestamp -->
      <span class="text-xs text-gray-500 mt-1 px-2">
        {{ formattedTime }}
      </span>
    </div>

    <!-- User Avatar -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-vue-next';

interface Props {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const props = defineProps<Props>();

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
