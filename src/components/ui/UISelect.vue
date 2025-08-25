<template>
  <div
    ref="selectRef"
    class="custom-select relative w-full md:w-[246px] rounded-lg"
  >
    <div
      class="select-trigger w-full md:w-[246px] h-10 md:h-[46px] px-3 md:px-4 py-2 md:py-2.5 flex items-center justify-between gap-2 md:gap-2.5 rounded-lg bg-surface hover:bg-surface-hover focus:bg-surface-hover outline-none cursor-pointer transition-all duration-200"
      tabindex="0"
      role="combobox"
      :aria-expanded="isDropdownOpen"
      :aria-haspopup="'listbox'"
      :aria-owns="isDropdownOpen ? 'city-listbox' : undefined"
      :aria-activedescendant="focusedIndex >= 0 ? `option-${focusedIndex}` : undefined"
      :aria-label="`Выбрать город. Текущий выбор: ${modelValue}. ${isDropdownOpen ? 'Список открыт' : 'Нажмите Enter или стрелки для открытия списка'}`"
      @click="toggleDropdown"
      @keydown="handleTriggerKeydown"
    >
      <span class="text-sm md:text-p4 md:font-medium">{{ modelValue }}</span>
      <IconChevron :direction="isDropdownOpen ? 'down' : 'right'" />
    </div>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div
        v-if="isDropdownOpen"
        id="city-listbox"
        class="absolute z-dropdown top-[calc(100%+8px)] md:top-[calc(100%+12px)] left-0 right-0 w-full md:w-[246px] max-h-[200px] md:max-h-[250px] flex flex-col p-0 overflow-y-auto bg-[#1A669C] rounded-lg origin-top"
        role="listbox"
        :aria-label="'Список городов'"
      >
      <div
        v-for="(cityName, index) in filteredValues"
        :id="`option-${index}`"
        :key="cityName"
        class="flex items-center px-3 md:px-4 py-2 md:py-2.5 bg-surface hover:bg-surface-hover cursor-pointer transition-colors duration-200 text-sm md:text-p4 md:font-medium focus:outline-none focus:bg-surface-hover"
        :class="{ 'bg-surface-hover': focusedIndex === index }"
        role="option"
        tabindex="-1"
        :aria-selected="focusedIndex === index ? 'true' : 'false'"
        @click="selectCityAndClose(cityName)"
        @mouseenter="focusedIndex = index"
        @focus="focusedIndex = index"
      >
        {{ cityName }}
      </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
  import IconChevron from '@/components/icons/IconChevron.vue'

  const props = defineProps<{
    modelValue: string
    values: string[]
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
        // If dropdown is open and an item is focused, select it
        if (isDropdownOpen.value && focusedIndex.value >= 0) {
          selectCityAndClose(filteredValues.value[focusedIndex.value])
        } else {
          toggleDropdown()
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!isDropdownOpen.value) {
          isDropdownOpen.value = true
          focusedIndex.value = 0
          focusOption(0)
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
          e.preventDefault()
          if (e.shiftKey) {
            // Shift+Tab: focus previous option or close if at first
            if (focusedIndex.value > 0) {
              focusedIndex.value = focusedIndex.value - 1
              focusOption(focusedIndex.value)
            } else {
              closeDropdown()
            }
          } else {
            // Tab: focus next option or close if at last
            if (focusedIndex.value < filteredValues.value.length - 1) {
              focusedIndex.value = focusedIndex.value + 1
              focusOption(focusedIndex.value)
            } else {
              closeDropdown()
            }
          }
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
      focusOption(newIndex)
    }
  }

  function focusOption(index: number) {
    nextTick(() => {
      const option = document.getElementById(`option-${index}`)
      option?.focus()
    })
  }

  function handleTypeahead(char: string) {
    // Clear previous timeout
    if (searchTimeout.value) {
      clearTimeout(searchTimeout.value)
    }

    // Add to search string
    searchString.value += char.toLowerCase()

    // Find matching city
    const matchIndex = filteredValues.value.findIndex(city => city.toLowerCase().startsWith(searchString.value))

    if (matchIndex !== -1) {
      if (!isDropdownOpen.value) {
        isDropdownOpen.value = true
      }
      focusedIndex.value = matchIndex
      focusOption(matchIndex)
    }

    // Reset search string after delay
    searchTimeout.value = window.setTimeout(() => {
      searchString.value = ''
    }, 1000)
  }

  // Watch for focused index changes and handle Enter key
  watch(focusedIndex, newIndex => {
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
    
    // Only handle keys that aren't already handled by the trigger
    const target = e.target as HTMLElement
    const isTrigger = target.classList.contains('select-trigger')
    const isOption = target.id?.startsWith('option-')
    
    if (isTrigger) return // Let trigger handler manage its own events

    switch (e.key) {
      case 'Tab':
        if (isOption) {
          e.preventDefault()
          if (e.shiftKey) {
            // Shift+Tab: focus previous option or close if at first
            if (focusedIndex.value > 0) {
              focusedIndex.value = focusedIndex.value - 1
              focusOption(focusedIndex.value)
            } else {
              closeDropdown()
            }
          } else {
            // Tab: focus next option or close if at last
            if (focusedIndex.value < filteredValues.value.length - 1) {
              focusedIndex.value = focusedIndex.value + 1
              focusOption(focusedIndex.value)
            } else {
              closeDropdown()
            }
          }
        }
        break
      case 'Enter':
      case ' ':
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
      case 'Escape': {
        e.preventDefault()
        closeDropdown()
        const trigger = selectRef.value?.querySelector('.select-trigger') as HTMLElement
        trigger?.focus()
        break
      }
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
  /* Custom scrollbar - keep this since Tailwind doesn't have scrollbar utilities by default */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
</style>
