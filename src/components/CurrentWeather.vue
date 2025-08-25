<template>
  <div class="p-0 flex-1">
    <div class="flex flex-col xl:flex-row items-center gap-4 xl:gap-11">
      <!-- Weather Icon -->
      <div class="w-32 h-32 md:w-40 md:h-40 xl:w-[180px] xl:h-[180px] flex items-center justify-center">
        <SkeletonLoader
          :loading="loading"
          variant="circle"
          width="100%"
          height="100%"
          content-tag="div"
          class="w-full h-full flex items-center justify-center"
        >
          <WeatherIcon
            :code="weatherCode"
            class="w-full h-full"
          />
        </SkeletonLoader>
      </div>

      <!-- Temperature Display -->
      <SkeletonLoader
        :loading="loading"
        class="min-w-[120px] md:min-w-[140px] xl:min-w-[162px] max-w-[162px] text-center xl:text-left text-4xl md:text-5xl xl:text-display xl:font-bold"
        :placeholder-text="temperatureText"
        content-tag="div"
      >
        {{ temperatureText }}
      </SkeletonLoader>

      <!-- Weather Details -->
      <div class="flex flex-col items-start gap-2 md:gap-3 w-full xl:w-auto">
        <SkeletonLoader
          :loading="loading"
          class="p3_med"
          :placeholder-text="description || 'Солнечно'"
        >
          {{ description }}
        </SkeletonLoader>
        <SkeletonLoader
          :loading="loading"
          class="p3_med text-nowrap"
          :placeholder-text="humidityText"
        >
          {{ humidityText }}
        </SkeletonLoader>
        <SkeletonLoader
          :loading="loading"
          class="p3_med text-nowrap"
          :placeholder-text="windText"
        >
          {{ windText }}
        </SkeletonLoader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import WeatherIcon from './ui/WeatherIcon.vue'
  import SkeletonLoader from './ui/SkeletonLoader.vue'

  interface Props {
    temperature?: number
    weatherCode?: number
    description?: string
    humidity?: number
    windSpeed?: number
    loading?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    temperature: 0,
    weatherCode: 0,
    description: '',
    humidity: 0,
    windSpeed: 0,
    loading: false,
  })

  // Computed text values to avoid duplication
  const temperatureText = computed(() => props.loading ? '25°' : `${Math.round(props.temperature)}°`)
  const humidityText = computed(() => props.loading ? 'Влажность: 65%' : `Влажность: ${props.humidity}%`)
  const windText = computed(() => props.loading ? 'Ветер: 12 м/с' : `Ветер: ${Math.round(props.windSpeed)} м/с`)
</script>

