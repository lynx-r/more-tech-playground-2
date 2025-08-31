<script lang="ts" setup>
import { ref, watch } from 'vue'
import useMySpeechRecognition from './useMySpeechRecognition'
import useMySpeechSynthesis from './useMySpeechSynthesis'

interface ChatMessage {
  userMessage: string
  aiMessage: string
}

interface Chat {
  messages: ChatMessage[]
}

const synthesis = useMySpeechSynthesis()
const recognation = useMySpeechRecognition()

const chat = ref<Chat>({ messages: [] })

const isUserSpeak = ref(false)
const isInit = ref(true)

function onToggleDialog() {
  if (!isUserSpeak.value && isInit.value) {
    synthesis.play()
  }
  isInit.value = false
  isUserSpeak.value = !isUserSpeak.value
}

watch(synthesis.speech.status, (status) => {
  if (status === 'end') {
    recognation.start()
  }
})

watch(isUserSpeak, (isUserSpeakLocal) => {
  if (!isUserSpeakLocal) {
    recognation.stop()
    const userMessage = recognation.result.value
    const aiMessage = `Вы сказали: ${userMessage}`
    synthesis.text.value = aiMessage
    synthesis.play()
    isUserSpeak.value = true
    chat.value?.messages.push({ userMessage, aiMessage })
  }
})
</script>

<template>
  <div class="flex flex-col border-2 rounded-2xl border-gray-500 p-5">
    <div v-for="(message, index) of chat?.messages" :key="index" class="flex flex-col">
      <div v-if="message.aiMessage" class="">{{ message.aiMessage }}</div>
      <div v-if="message.userMessage" class="self-end">{{ message.userMessage }}</div>
    </div>
    <!-- <p class="tag"> -->
    <!-- {{ recognation.result }} -->
    <!-- </p> -->
    <button @click="onToggleDialog">
      <span v-if="isInit">Начать диалог</span>
      <span v-else-if="isUserSpeak">Продолжить</span>
    </button>
  </div>
</template>
