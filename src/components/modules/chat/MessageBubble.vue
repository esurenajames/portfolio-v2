<template>
  <div class="flex items-start gap-3 mb-4" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
    <!-- Avatar -->
    <div
      v-if="!isUser"
      class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0"
    >
      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    </div>

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
