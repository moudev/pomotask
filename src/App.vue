<template>
  <div class="flex justify-around bg-main text-color-main overflow-hidden">
    <Actions
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

    <Timer
      v-show="isPlaying"
      class="border"
      :minutesToAdd="minutesToAdd"
      :isPlaying="isPlaying"
      @stopTimer="stopTimer"
    />
    <ToggleThemeButton />
    <h1 class="text-color-main">Primary</h1>
    <h2 class="text-color-secondary">Secondary</h2>
  </div>
</template>

<script>
import Actions from "./components/Actions.vue"
import Timer from "./components/Timer.vue"
import ToggleThemeButton from './components/ToggleThemeButton.vue'

export default {
  name: 'App',
  components: {
    Actions,  
    Timer,
    ToggleThemeButton,
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