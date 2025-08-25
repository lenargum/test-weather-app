<template>
  <div class="flex-1">
    <table class="w-full border-collapse">
      <tbody>
        <tr
          v-for="(hour, i) in tableData"
          :key="hour.time || i"
          class="border-b border-separator h-[72px]"
        >
          <td class="align-middle px-1">
            <div class="flex flex-col justify-center items-center gap-2 text-sm md:text-base">
              <SkeletonLoader
                :loading="loading"
                :placeholder-text="hour.hourText"
              >
                {{ hour.hourText }}
              </SkeletonLoader>
              <SkeletonLoader
                :loading="loading"
                :placeholder-text="hour.timeOfDayText"
              >
                {{ hour.timeOfDayText }}
              </SkeletonLoader>
            </div>
          </td>
          <td class="align-middle px-1">
            <div class="text-h3 font-semibold text-center flex items-center justify-center">
              <SkeletonLoader
                :loading="loading"
                :placeholder-text="hour.temperatureText"
              >
                {{ hour.temperatureText }}
              </SkeletonLoader>
            </div>
          </td>
          <td class="align-middle px-1">
            <div class="flex flex-col md:flex-row items-center gap-1 md:gap-3">
              <div class="w-8 h-8 md:w-[60px] md:h-[60px] flex items-center justify-center">
                <SkeletonLoader
                  :loading="loading"
                  variant="circle"
                  width="100%"
                  height="100%"
                  content-tag="div"
                  class="w-full h-full flex items-center justify-center"
                >
                  <WeatherIcon
                    :code="hour.weathercode"
                    class="w-full h-full"
                  />
                </SkeletonLoader>
              </div>
              <SkeletonLoader
                :loading="loading"
                class="text-xs md:text-base text-center md:text-left"
                :placeholder-text="hour.weatherDescription"
              >
                {{ hour.weatherDescription }}
              </SkeletonLoader>
            </div>
          </td>
          <td class="align-middle px-1">
            <div class="flex items-center justify-center text-center text-xs md:text-base">
              <SkeletonLoader
                :loading="loading"
                :placeholder-text="hour.windText"
              >
                {{ hour.windText }}
              </SkeletonLoader>
            </div>
          </td>
          <td class="align-middle px-1 text-center text-xs md:text-base">
            <div class="flex items-center justify-center">
              <SkeletonLoader
                :loading="loading"
                :placeholder-text="hour.humidityText"
              >
                {{ hour.humidityText }}
              </SkeletonLoader>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { getWeatherDescription, getTimeOfDay } from '@/utils/weatherCodes'
  import WeatherIcon from './ui/WeatherIcon.vue'
  import SkeletonLoader from './ui/SkeletonLoader.vue'
  import type { HourlyItem } from '@/types'

  interface Props {
    hourlyData?: HourlyItem[]
    loading?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    hourlyData: () => [],
    loading: false,
  })

  function formatHour(dateTime: string): string {
    const date = new Date(dateTime)
    return date.getHours().toString().padStart(2, '0') + ':00'
  }

  const tableData = computed(() => {
    // Show skeleton placeholders when loading and no data
    if (props.loading && props.hourlyData.length === 0) {
      const mockHours = [
        { hour: '00:00', timeOfDay: 'Ночь' },
        { hour: '03:00', timeOfDay: 'Ночь' },
        { hour: '06:00', timeOfDay: 'Утро' },
        { hour: '09:00', timeOfDay: 'Утро' },
        { hour: '12:00', timeOfDay: 'День' },
        { hour: '15:00', timeOfDay: 'День' },
        { hour: '18:00', timeOfDay: 'Вечер' },
        { hour: '21:00', timeOfDay: 'Вечер' },
      ]
      return mockHours.map((mock, i) => ({
        time: `mock-${i}`,
        hourText: mock.hour,
        timeOfDayText: mock.timeOfDay,
        temperatureText: '25°',
        weathercode: 0,
        weatherDescription: 'Солнечно',
        windText: '12 м/с',
        humidityText: '65%',
      }))
    }

    // Transform actual hourly data
    return props.hourlyData.map(hour => {
      const hourNum = new Date(hour.time).getHours()
      return {
        time: hour.time,
        hourText: formatHour(hour.time),
        timeOfDayText: getTimeOfDay(hourNum),
        temperatureText: `${Math.round(hour.temperature)}°`,
        weathercode: hour.weathercode,
        weatherDescription: getWeatherDescription(hour.weathercode),
        windText: `${Math.round(hour.windspeed)} м/с`,
        humidityText: `${hour.humidity}%`,
      }
    })
  })
</script>
