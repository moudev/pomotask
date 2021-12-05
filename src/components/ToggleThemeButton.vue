<template>
  <button @click="toggleTheme">
    <Sun v-if="isDark"/>
    <Moon v-else />
  </button>
</template>

<script>
import Sun from '~icons/carbon/sun'
import Moon from '~icons/carbon/moon'

export default {
  components: {
    Sun,
    Moon,
  },
  data() {
    return {
      isDark: false,
      DARK_CLASS_NAME: 'dark',
      THEME_STORAGE_KEY: 'theme',
    }
  },
  methods: {
    // https://windicss.org/features/dark-mode.html#class-mode
    toggleTheme() {
      document.documentElement.classList.toggle(this.DARK_CLASS_NAME)
      this.isDark = !this.isDark
    },
    setThemeFromStorage() {
      const theme = localStorage.getItem(this.THEME_STORAGE_KEY) ? localStorage.getItem(this.THEME_STORAGE_KEY) : ''
      this.isDark = theme === this.DARK_CLASS_NAME
      document.documentElement.classList.toggle(theme)
    },
  },
  watch: {
    isDark() {
      const theme = this.isDark ? this.DARK_CLASS_NAME : ''
      localStorage.setItem(this.THEME_STORAGE_KEY, theme)
    }
  },
  mounted() {
    this.setThemeFromStorage()
  },
}
</script>