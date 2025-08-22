<template>
  <div class="current-weather">
    <Transition name="weather" mode="out-in">
      <div v-if="loading" key="loading" class="weather-main">
        <div class="weather-icon-large">
          <SkeletonLoader variant="circle" width="180px" height="180px" />
        </div>
        <SkeletonLoader width="162px" height="110px" style="border-radius: 12px;" />
        <div class="weather-details">
          <SkeletonLoader variant="text" width="100px" height="28px" />
          <SkeletonLoader variant="text" width="200px" height="28px" />
          <SkeletonLoader variant="text" width="142px" height="28px" />
        </div>
      </div>
      <div v-else key="content" class="weather-main">
        <div class="weather-icon-large">
          <WeatherIcon :code="weatherCode" />
        </div>

        <div class="font-display weather-temp">{{ Math.round(temperature) }}°</div>

        <div class="weather-details">
          <span class="p3_med">{{ description }}</span>
          <span class="p3_med">Влажность: {{ humidity }}%</span>
          <span class="p3_med">Ветер: {{ Math.round(windSpeed) }} м/с</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
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

withDefaults(defineProps<Props>(), {
  temperature: 0,
  weatherCode: 0,
  description: '',
  humidity: 0,
  windSpeed: 0,
  loading: false
})
</script>

<style scoped>
.current-weather {
  padding: 0;
  flex: 1;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 44px;
}

@media (max-width: 1440px) {
  .weather-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}

.weather-icon-large {
  width: 180px;
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.weather-temp {
  min-width: 162px;
}

.weather-enter-active,
.weather-leave-active {
  transition: opacity 0.2s ease;
}

.weather-enter-from,
.weather-leave-to {
  opacity: 0;
}
</style>