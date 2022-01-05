<template>
  <div class="text-5xl flex justify-items-center">
    <button
      v-if="isPlaying"
      class="flex btn rounded-full"
      @click="stopTimer"
    >
      <PauseOutline />
    </button>
    <button
      v-else
      class="flex btn rounded-full"
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