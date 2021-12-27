<template>
  <div class="text-6xl flex justify-items-center">
    <button v-if="isPlaying" @click="stopTimer" class="flex btn rounded-full">
      <PauseOutline />
    </button>
    <button v-else @click="startTimer" class="flex btn rounded-full">
      <PlayOutline />
    </button>
  </div>
</template>

<script>
import PlayOutline from '~icons/carbon/play-outline'
import PauseOutline from '~icons/carbon/pause-outline'

export default {
  props: {
    isPlaying: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  components: {
    PlayOutline,
    PauseOutline,
  },
  methods: {
    startTimer() {
      this.$emit('startTimer')
    },
    stopTimer() {
      this.$emit('stopTimer')
    },
  }
}
</script>