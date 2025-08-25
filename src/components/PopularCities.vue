<template>
  <div class="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3 md:gap-8">
    <button
      v-for="(cityData, i) in citiesData"
      :key="cityData.city + i"
      class="city-card bg-gradient-surface p-4 md:p-6 gap-3 md:gap-4 hover:translate-y-[-2px] hover:shadow-md focus:outline-none focus:translate-y-[-2px] focus:shadow-md"
      :class="{ 'pointer-events-none': loading }"
      :aria-label="`Выбрать ${cityData.city}: ${cityData.temperatureText}, ${cityData.description}`"
      @click="!loading && $emit('selectCity', cityData.city)"
    >
      <div class="flex flex-col items-center gap-1 md:gap-2">
        <SkeletonLoader
          :loading="loading"
          class="text-sm md:text-p2 md:font-medium"
          :placeholder-text="cityData.city"
        >
          {{ cityData.city }}
        </SkeletonLoader>
        <SkeletonLoader
          :loading="loading"
          class="text-xs md:text-base"
          :placeholder-text="cityData.description"
        >
          {{ cityData.description }}
        </SkeletonLoader>
      </div>
      <div class="w-10 h-10 md:w-[60px] md:h-[60px] flex items-center justify-center">
        <SkeletonLoader
          :loading="loading"
          variant="circle"
          width="100%"
          height="100%"
          content-tag="div"
          class="w-full h-full flex items-center justify-center"
        >
          <WeatherIcon :code="cityData.weathercode" class="w-full h-full" />
        </SkeletonLoader>
      </div>
      <SkeletonLoader
        :loading="loading"
        class="text-xl md:text-h3 md:font-semibold"
        :placeholder-text="cityData.temperatureText"
      >
        {{ cityData.temperatureText }}
      </SkeletonLoader>
      <SkeletonLoader
        :loading="loading"
        class="text-xs md:text-base"
        :placeholder-text="cityData.humidityText"
      >
        {{ cityData.humidityText }}
      </SkeletonLoader>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { getWeatherDescription } from '@/utils/weatherCodes'
  import WeatherIcon from './ui/WeatherIcon.vue'
  import SkeletonLoader from './ui/SkeletonLoader.vue'
  import type { CitySummary } from '@/types'
  import { CITIES } from '@/constants'

  const props = defineProps<{
    loading: boolean
    cities: CitySummary[]
  }>()

  defineEmits<{
    selectCity: [cityName: string]
  }>()

  const citiesData = computed(() => {
    // Show skeleton placeholders when loading and no data
    if (props.loading && props.cities.length === 0) {
      const mockCities = [...CITIES].slice(0, 5)
      return mockCities.map(city => ({
        city,
        weathercode: 0,
        description: 'Солнечно',
        temperatureText: '25°',
        humidityText: 'Влажность: 65%',
        temperature: 25,
        humidity: 65,
      }))
    }
    
    // Transform actual city data
    return props.cities.map(cityData => ({
      ...cityData,
      description: getWeatherDescription(cityData.weathercode),
      temperatureText: `${Math.round(cityData.temperature)}°`,
      humidityText: `Влажность: ${cityData.humidity}%`,
    }))
  })
</script>

<style scoped>
  @import 'tailwindcss/theme' reference;

  /* City card base styles - non-responsive utilities */
  .city-card {
    @apply relative flex flex-col items-center;
    @apply rounded-md cursor-pointer transition-all duration-200 ease-in-out;
    @apply text-center;
  }

  /* Gradient border effect for city cards */
  .city-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    padding: 1px;
    background: linear-gradient(144.45deg, rgba(255, 255, 255, 0.4) -14.51%, rgba(255, 255, 255, 0) 117.67%);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    z-index: -1;
    pointer-events: none;
  }

  /* Vue transition animations */
  .cities-enter-active,
  .cities-leave-active {
    transition: opacity 0.2s ease;
  }

  .cities-enter-from,
  .cities-leave-to {
    opacity: 0;
  }
</style>
