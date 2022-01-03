// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  // https://windicss.org/features/#shortcuts
  shortcuts: {
    // theme control: https://windicss.org/features/dark-mode.html#class-mode
    'bg-main': 'bg-warm-gray-50 dark:(bg-[#222626])',
    'bg-secondary': 'bg-[#CDD1CC]',
    'bg-hover': 'bg-[#6e6d6e33] dark:(bg-[#6e6d6e80])',
    'btn': 'focus:outline-none hover:bg-[#6e6d6e33] dark:(hover:bg-[#6e6d6e80])',
    'text-color-main': 'text-[#222626] dark:text-[#CDD1CC]',
    'text-color-secondary': 'text-[#8C8C94] dark:text-[#8C8C94]',
    'border-primary': 'border border-[#CDD1CC] dark:border-[#6E6D6E]',
  },
})
