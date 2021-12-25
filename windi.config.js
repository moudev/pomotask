// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  // https://windicss.org/features/#shortcuts
  shortcuts: {
    // theme control: https://windicss.org/features/dark-mode.html#class-mode
    'bg-main': 'bg-warm-gray-50 dark:(bg-[#222626])',
    'bg-secondary': 'bg-[#CDD1CC]',
    'text-color-main': 'text-[#222626] dark:text-[#CDD1CC]',
    'text-color-secondary': 'text-[#8C8C94] dark:text-[#8C8C94]',
    'border-primary': 'border-[#8C8C94] dark:border-[#6E6D6E]',
  },
})
