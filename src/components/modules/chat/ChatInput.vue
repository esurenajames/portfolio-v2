<template>
  <div class="w-full px-6 pb-8">
    <div class="max-w-4xl mx-auto">
      <!-- Simple Input Container -->
      <div class="relative bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
        <div class="flex items-end gap-2 p-3">
          <!-- Text Input -->
          <div class="flex-1">
            <textarea
              ref="textareaRef"
              v-model="inputText"
              @input="adjustHeight"
              @keydown.enter.exact.prevent="handleSend"
              :disabled="isDisabled"
              placeholder="Ask Sha about James"
              rows="1"
              class="w-full resize-none bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 text-sm max-h-32 overflow-y-auto"
              :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
            ></textarea>
          </div>

          <!-- Send Button -->
          <div>
            <button
              @click="handleSend"
              :disabled="!inputText.trim() || isDisabled"
              class="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';

interface Props {
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDisabled: false
});

const emit = defineEmits<{
  send: [text: string];
}>();

const inputText = ref('');
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const adjustHeight = async () => {
  await nextTick();
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

const handleSend = () => {
  if (inputText.value.trim() && !props.isDisabled) {
    emit('send', inputText.value);
    inputText.value = '';
    
    // Reset textarea height
    nextTick(() => {
      if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
      }
    });
  }
};
</script>

<script lang="ts">
export default {
  name: 'ChatInput'
};
</script>

<style scoped>
/* Hide scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
</style>

