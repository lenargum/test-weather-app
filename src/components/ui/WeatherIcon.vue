<template>
  <img :src="iconSrc" :alt="iconAlt" />
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { getWeatherIconPath, getWeatherIconAlt } from '@/utils/weatherCodes'

  const props = defineProps<{
    code: number
  }>()

  const iconSrc = computed(() => getWeatherIconPath(props.code))
  const iconAlt = computed(() => getWeatherIconAlt(props.code))
</script>
