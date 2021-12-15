<template>
  <div v-if="tabs.length > 0" class="flex justify-around">
    <button v-for="tab in tabs" class="border" :key="tab.name" @click="updateCurrentTab(tab)">
      <span class="capitalize" :class="{'bg-red-500': tab.name.toLowerCase() === currentTab.name.toLowerCase() }">
        {{ tab.name }}
        <span>({{ tab.count }})</span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
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