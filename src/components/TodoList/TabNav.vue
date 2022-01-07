<template>
  <div
    v-if="tabs.length > 0"
    class="flex flex-col text-md"
  >
    <button
      v-for="tab in tabs"
      :key="tab.name"
      class="border-primary btn rounded-md px-2 py-1 flex items-center"
      :class="{'bg-hover': tab.name.toLowerCase() === currentTab.name.toLowerCase() }"
      @click="updateCurrentTab(tab)"
    >
      <ChevronRight />  
      <span class="capitalize">
        {{ tab.name }}
      </span>
      <span
        class="border-primary bg-main self-end rounded-full py-1 px-2 text-xs"
      >
        {{ tab.count }}
      </span>
    </button>
  </div>
</template>

<script>
import ChevronRight from '~icons/carbon/chevron-right'

export default {
  components: {
    ChevronRight,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [],
    },
    currentTab: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        count: 0,
      })
    },
  },
  methods: {
    updateCurrentTab(tab) {
      this.$emit('update-current-tab', tab)
    }
  }
}
</script>