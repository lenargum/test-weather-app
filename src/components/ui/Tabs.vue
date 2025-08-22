<template>
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab.value" :class="['tab p4_med', { active: modelValue === tab.value }]"
      @click="$emit('update:modelValue', tab.value)">
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

<style scoped>
.tabs {
  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 8px;
  overflow: hidden;
}

.tab {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  padding: 10px 16px;

  border: none;
  background: rgba(233, 233, 243, 0.1);
  color: var(--color-primary-darker);
  cursor: pointer;
  transition: all 0.2s;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.tab:not(:last-child) {
  border-right: 1px solid rgba(233, 233, 243, 0.2);
}

.tab:hover {
  color: var(--color-primary-dark);
}

.tab.active {
  color: var(--color-text-primary);
}
</style>