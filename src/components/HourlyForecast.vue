<template>
  <div class="hourly-forecast">
    <Transition name="hourly" mode="out-in">
      <table v-if="loading" key="loading" class="hourly-table">
        <tbody>
          <tr v-for="i in 8" :key="i" class="hourly-row">
            <td>
              <div class="hour-time-section">
                <SkeletonLoader variant="text" width="56px" height="21px" />
                <SkeletonLoader variant="text" width="54px" height="21px" style="margin-top: 2px;" />
              </div>
            </td>
            <td>
              <div class="hour-centered-data">
                <SkeletonLoader variant="text" width="74px" height="48px" style="border-radius: 12px;" />
              </div>
            </td>
            <td>
              <div class="hour-description">
                <div class="hour-icon">
                  <SkeletonLoader variant="circle" width="40px" height="40px" />
                </div>
                <SkeletonLoader variant="text" width="90px" />
              </div>
            </td>
            <td>
              <div class="hour-centered-data">
                <SkeletonLoader variant="text" width="46px" height="24px" style="margin: 6px 0px 2px;" />
              </div>
            </td>
            <td>
              <div class="hour-centered-data">
                <SkeletonLoader variant="text" width="40px" height="24px" style="margin: 6px 0px 2px;" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-else key="content" class="hourly-table">
        <tbody>
          <tr v-for="hour in hourlyData" :key="hour.time" class="hourly-row">
            <td>
              <div class="hour-time-section">
                <span>{{ formatHour(hour.time) }}</span>
                <span>{{ getTimeOfDay(new Date(hour.time).getHours()) }}</span>
              </div>
            </td>
            <td>
              <div class="h3 hour-centered-data">
                {{ Math.round(hour.temperature) }}°
              </div>
            </td>
            <td>
              <div class="hour-description">
                <div class="hour-icon">
                  <WeatherIcon :code="hour.weathercode" style="width: inherit; height: inherit;" />
                </div>
                <span>{{ getWeatherDescription(hour.weathercode) }}</span>
              </div>
            </td>
            <td class="hour-wind">{{ Math.round(hour.windspeed) }} м/с</td>
            <td class="hour-humidity">{{ hour.humidity }}%</td>
          </tr>
        </tbody>
      </table>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { getWeatherDescription, getTimeOfDay } from '@/utils/weatherCodes'
import WeatherIcon from './ui/WeatherIcon.vue'
import SkeletonLoader from './ui/SkeletonLoader.vue'

interface HourlyItem {
  time: string
  temperature: number
  precipitation: number
  weathercode: number
  windspeed: number
  humidity: number
}

interface Props {
  hourlyData?: HourlyItem[]
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  hourlyData: () => [],
  loading: false
})

function formatHour(dateTime: string): string {
  const date = new Date(dateTime)
  return date.getHours().toString().padStart(2, '0') + ':00'
}
</script>

<style scoped>
.hourly-forecast {
  flex: 1;

  margin: 0px calc(-1 * var(--page-padding));
  padding: 0px var(--page-padding);

  overflow-x: auto;
}

.hourly-table {
  width: 100%;
  border-collapse: collapse;
}

.hourly-row {
  border-bottom: 1px solid var(--color-separator);
  height: 64px;
}

.hourly-row td {
  vertical-align: middle;
  padding: 0px 4px;
}

.hour-description {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .hour-description {
    gap: 8px;
  }
}

.hour-time-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.hour-centered-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hour-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
}

@media (max-width: 768px) {
  .hour-icon {
    width: 48px;
    height: 48px;
  }
}

.hour-wind,
.hour-humidity {
  white-space: nowrap;
  text-align: center;
}

.hourly-enter-active,
.hourly-leave-active {
  transition: opacity 0.2s ease;
}

.hourly-enter-from,
.hourly-leave-to {
  opacity: 0;
}
</style>