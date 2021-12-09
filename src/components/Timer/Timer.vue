<template>
  <div class="flex justify-around">
    <TimerActions
      class="border"
      :isPlaying="isPlaying"
      @startTimer="startTimer"
      @stopTimer="stopTimer"
    />
    
    <input
      v-if="!isPlaying"
      class="border bg-main"
      type="text"
      v-model="minutesToAdd"
      :min="MIN_MINUTES"
    />

    <TimerCounter
      v-show="isPlaying"
      class="border"
      :minutesToAdd="minutesToAdd"
      :isPlaying="isPlaying"
      @stopTimer="stopTimer"
    />
    <!-- <h1 class="text-color-main">Primary</h1>
    <h2 class="text-color-secondary">Secondary</h2> -->
  </div>
</template>

<script>
import TimerActions from "./TimerActions.vue"
import TimerCounter from "./TimerCounter.vue"

export default {
  name: 'App',
  components: {
    TimerActions,  
    TimerCounter,
  },
  data() {
    return {
      isPlaying: false,
      minutesToAdd: "0",
      MIN_MINUTES: 1,
      MAX_MINUTES: 60,
    }
  },
  methods: {
    startTimer() {
      if (this.minutesToAdd >= this.MIN_MINUTES && this.minutesToAdd <= this.MAX_MINUTES) {
        this.isPlaying = true
      }
    },
    stopTimer() {
      this.isPlaying = false
    }
  }
}
</script>