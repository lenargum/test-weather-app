<template>
  <div class="custom-select" :class="{ open: isDropdownOpen }" ref="selectRef">
    <div 
      class="select-trigger" 
      @click="toggleDropdown"
      @keydown="handleTriggerKeydown"
      tabindex="0"
      role="button"
      :aria-expanded="isDropdownOpen"
      :aria-haspopup="true"
      :aria-label="`Выбран город: ${modelValue}`"
    >
      <span>{{ modelValue }}</span>
      <svg class="chevron" width="12" height="8" viewBox="0 0 12 8">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" fill="none" />
      </svg>
    </div>
    <div 
      class="select-options" 
      v-if="isDropdownOpen"
      role="listbox"
      :aria-label="'Список городов'"
    >
      <div 
        v-for="(cityName, index) in filteredValues" 
        :key="cityName" 
        class="select-option"
        :class="{ focused: focusedIndex === index }"
        @click="selectCityAndClose(cityName)"
        @mouseenter="focusedIndex = index"
        role="option"
        :aria-selected="false"
        :id="`option-${index}`"
      >
        {{ cityName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps<{
  modelValue: string
  values: readonly string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isDropdownOpen = ref(false)
const focusedIndex = ref(-1)
const searchString = ref('')
const searchTimeout = ref<number | null>(null)
const selectRef = ref<HTMLElement | null>(null)

const filteredValues = computed(() => {
  return props.values.filter(c => c !== props.modelValue)
})

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    focusedIndex.value = -1
    nextTick(() => {
      // Focus management for screen readers
    })
  }
}

function closeDropdown() {
  isDropdownOpen.value = false
  focusedIndex.value = -1
  searchString.value = ''
}

function selectCityAndClose(cityName: string) {
  emit('update:modelValue', cityName)
  closeDropdown()
  // Return focus to trigger
  const trigger = selectRef.value?.querySelector('.select-trigger') as HTMLElement
  trigger?.focus()
}

function handleTriggerKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault()
      toggleDropdown()
      break
    case 'ArrowDown':
      e.preventDefault()
      if (!isDropdownOpen.value) {
        isDropdownOpen.value = true
        focusedIndex.value = 0
      } else {
        navigateOptions(1)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (isDropdownOpen.value) {
        navigateOptions(-1)
      }
      break
    case 'Escape':
      e.preventDefault()
      closeDropdown()
      break
    case 'Tab':
      if (isDropdownOpen.value) {
        closeDropdown()
      }
      break
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        handleTypeahead(e.key)
      }
  }
}

function navigateOptions(direction: number) {
  const newIndex = focusedIndex.value + direction
  if (newIndex >= 0 && newIndex < filteredValues.value.length) {
    focusedIndex.value = newIndex
  }
}

function handleTypeahead(char: string) {
  // Clear previous timeout
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  // Add to search string
  searchString.value += char.toLowerCase()
  
  // Find matching city
  const matchIndex = filteredValues.value.findIndex(city => 
    city.toLowerCase().startsWith(searchString.value)
  )
  
  if (matchIndex !== -1) {
    if (!isDropdownOpen.value) {
      isDropdownOpen.value = true
    }
    focusedIndex.value = matchIndex
  }
  
  // Reset search string after delay
  searchTimeout.value = window.setTimeout(() => {
    searchString.value = ''
  }, 1000)
}

// Watch for focused index changes and handle Enter key
watch(focusedIndex, (newIndex) => {
  if (newIndex >= 0 && newIndex < filteredValues.value.length && isDropdownOpen.value) {
    // Scroll into view if needed
    nextTick(() => {
      const option = document.getElementById(`option-${newIndex}`)
      option?.scrollIntoView({ block: 'nearest' })
    })
  }
})

// Global keyboard handler when dropdown is open
function handleGlobalKeydown(e: KeyboardEvent) {
  if (!isDropdownOpen.value) return
  
  switch (e.key) {
    case 'Enter':
      e.preventDefault()
      if (focusedIndex.value >= 0) {
        selectCityAndClose(filteredValues.value[focusedIndex.value])
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      navigateOptions(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      navigateOptions(-1)
      break
    case 'Escape':
      e.preventDefault()
      closeDropdown()
      const trigger = selectRef.value?.querySelector('.select-trigger') as HTMLElement
      trigger?.focus()
      break
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        handleTypeahead(e.key)
      }
  }
}

// Click outside handler
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('.custom-select')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleGlobalKeydown)
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
})
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #1A669C;
  background-color: #1A669C;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.select-trigger:hover,
.select-trigger:focus {
  background-color: #145080;
  border-color: #145080;
  outline: none;
}

.select-trigger:focus {
  box-shadow: 0 0 0 2px rgba(26, 102, 156, 0.3);
}

.custom-select.open .select-trigger {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.chevron {
  transition: transform 0.2s;
}

.custom-select.open .chevron {
  transform: rotate(180deg);
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: #1A669C;
  border: 1px solid #1A669C;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 100;
  animation: slideDown 0.2s ease-out;
}

.select-option {
  padding: 10px 12px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.select-option:hover,
.select-option.focused {
  background-color: #145080;
}

.select-option.focused {
  outline: 1px solid rgba(255, 255, 255, 0.3);
  outline-offset: -1px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar styling for options */
.select-options::-webkit-scrollbar {
  width: 8px;
}

.select-options::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.select-options::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.select-options::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>