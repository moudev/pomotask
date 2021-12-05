// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  // https://windicss.org/features/#shortcuts
  shortcuts: {
    'bg-main': 'bg-warm-gray-50 dark:(bg-[#181818])',
    'text-color-main': 'text-gray-800 dark:text-warm-gray-50',
    'text-color-secondary': 'text-gray-800 dark:text-gray-400',
  },
})
