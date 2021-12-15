<template>
  <div class="text-6xl">
    <button v-if="isPlaying" @click="stopTimer">
      <PauseOutline />
    </button>
    <button v-else @click="startTimer">
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