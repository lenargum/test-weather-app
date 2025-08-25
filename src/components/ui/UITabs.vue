<template>
  <div class="flex flex-row items-center rounded-lg overflow-hidden">
    <button
      v-for="(tab, index) in tabs"
      :key="tab.value"
      class="flex flex-row justify-center items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5 border-0 bg-surface cursor-pointer transition-all duration-200 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-sm md:text-p4 md:font-medium focus:outline-none focus:bg-surface-hover"
      :class="[
        modelValue === tab.value ? 'text-text-primary' : 'text-primary-darker hover:text-primary-dark',
        index !== tabs.length - 1 ? 'border-r border-separator' : '',
      ]"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
  interface Tab {
    value: string
    label: string
  }

  defineProps<{
    tabs: Tab[]
    modelValue: string
  }>()

  defineEmits<{
    'update:modelValue': [value: string]
  }>()
</script>
