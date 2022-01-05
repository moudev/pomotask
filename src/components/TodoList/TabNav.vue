<template>
  <div
    v-if="tabs.length > 0"
    class="flex flex-col text-md"
  >
    <button
      v-for="tab in tabs"
      :key="tab.name"
      class="border-primary rounded-md relative px-2 py-1 flex items-center btn"
      :class="{'bg-hover': tab.name.toLowerCase() === currentTab.name.toLowerCase() }"
      @click="updateCurrentTab(tab)"
    >
      <ChevronRight />  
      <span class="capitalize">
        {{ tab.name }}
      </span>
      <span
        class="border-primary rounded-full py-1 px-2 text-xs bg-main self-end"
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