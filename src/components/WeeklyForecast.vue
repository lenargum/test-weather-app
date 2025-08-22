<template>
  <div class="weekly-forecast">
    <Transition name="weekly" mode="out-in">
      <div v-if="loading" key="loading" class="forecast-row">
        <div v-for="i in 7" :key="i" class="day-item">
          <SkeletonLoader variant="text" width="70px" height="24px" />
          <div class="weather-icon">
            <SkeletonLoader variant="circle" width="40px" height="40px" />
          </div>
          <SkeletonLoader variant="text" width="40px" height="22px" />
        </div>
      </div>
      <div v-else-if="!weeklyData || weeklyData.length === 0" key="empty" class="empty">
        Нет данных о погоде
      </div>
      <div v-else key="content" class="forecast-row">
        <div v-for="day in weeklyData" :key="day.date" class="day-item">
          <div class="weekday">{{ day.weekday }}</div>
          <div class="weather-icon">
            <WeatherIcon :code="day.weathercode" />
          </div>
          <div>{{ Math.round(day.temperature) }}°</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { DayForecast } from '@/types'
import WeatherIcon from './ui/WeatherIcon.vue'
import SkeletonLoader from './ui/SkeletonLoader.vue'

defineProps<{
  weeklyData?: DayForecast[]
  loading?: boolean
}>()
</script>

<style scoped>

.empty {
  padding: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.forecast-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  margin: 0px calc(-1 * var(--page-padding));
  padding: 0px var(--page-padding) 16px;
}

.day-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.weekday {
  text-transform: capitalize;
  min-width: 70px;
  text-align: center;
}

.weather-icon {
  width: 40px;
  height: 40px;
}

.weather-icon svg {
  width: 100%;
  height: 100%;
}

.weekly-enter-active,
.weekly-leave-active {
  transition: opacity 0.2s ease;
}

.weekly-enter-from,
.weekly-leave-to {
  opacity: 0;
}
</style>