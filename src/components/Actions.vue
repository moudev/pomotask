<template>
  <div>
    <button v-if="isPlaying" @click="stopTimer">
      Stop
    </button>
    <button v-else @click="startTimer">
      Play
    </button>
  </div>
</template>

<script>
export default {
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