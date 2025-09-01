<script lang="ts" setup>
import useMySpeechSynthesis from '../composibals/useMySpeechSynthesis'

const { speech, textSegments, text, pause, play, stop } = useMySpeechSynthesis()
</script>

<template>
  <div>
    <div v-if="!speech.isSupported">
      Your browser does not support SpeechSynthesis API,
      <a href="https://caniuse.com/mdn-api_speechsynthesis" target="_blank">more details</a>
    </div>
    <div v-else>
      <label class="font-bold mr-2">Spoken Text</label>
      <input v-model="text" class="!inline-block" type="text" />
      <div class="mt-2" aria-label="current-boundary-preview">
        <label class="font-bold mr-2">Speaking Text</label>
        <span>{{ textSegments.leadingText }}</span>
        <span class="text-primary">{{ textSegments.highlightedText }}</span>
        <span>{{ textSegments.trailingText }}</span>
      </div>

      <div class="mt-2">
        <button :disabled="speech.isPlaying.value" @click="play">
          {{ speech.status.value === 'pause' ? 'Resume' : 'Speak' }}
        </button>
        <button :disabled="!speech.isPlaying.value" class="orange" @click="pause">Pause</button>
        <button :disabled="!speech.isPlaying.value" class="red" @click="stop">Stop</button>
      </div>
    </div>
  </div>
</template>
