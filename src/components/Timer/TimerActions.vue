<template>
  <div class="flex justify-items-center text-5xl">
    <button
      v-if="isPlaying"
      class="btn flex rounded-full"
      @click="stopTimer"
    >
      <PauseOutline />
    </button>
    <button
      v-else
      class="btn flex rounded-full"
      @click="startTimer"
    >
      <PlayOutline />
    </button>
  </div>
</template>

<script>
import PlayOutline from '~icons/carbon/play-outline'
import PauseOutline from '~icons/carbon/pause-outline'

export default {
  components: {
    PlayOutline,
    PauseOutline,
  },
  props: {
    isPlaying: {
      type: Boolean,
      required: true,
      default: false,
    }
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