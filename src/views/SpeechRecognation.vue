<script lang="ts" setup>
import useMySpeechRecognition from './useMySpeechRecognition'

const { isSupported, isListening, result, start, stop } = useMySpeechRecognition()
</script>

<template>
  <div>
    <div v-if="!isSupported">
      Your browser does not support SpeechRecognition API,
      <a href="https://caniuse.com/mdn-api_speechrecognition" target="_blank">more details</a>
    </div>
    <div v-else>
      <button v-if="!isListening" @click="start">Press and talk</button>
      <button v-if="isListening" class="orange" @click="stop">Stop</button>
      <div v-if="isListening" class="mt-4">
        <p class="tag">
          {{ result }}
        </p>
      </div>
    </div>
  </div>
</template>
