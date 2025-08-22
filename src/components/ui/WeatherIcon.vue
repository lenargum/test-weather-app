<template>
  <component :is="iconComponent" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconSunny from '@/components/icons/weather/IconSunny.vue'
import IconCloudy from '@/components/icons/weather/IconCloudy.vue'
import IconRainy from '@/components/icons/weather/IconRainy.vue'
import IconWindy from '@/components/icons/weather/IconWindy.vue'

const props = defineProps<{
  code: number
}>()

const iconComponent = computed(() => {
  if ([0].includes(props.code)) return IconSunny
  if ([1, 2, 3, 45, 48].includes(props.code)) return IconCloudy
  if ([51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82, 85, 86, 95, 96, 99].includes(props.code)) return IconRainy
  return IconWindy
})
</script>