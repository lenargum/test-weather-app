<template>
  <div>
    <div
      v-if="(!weeklyData || weeklyData.length === 0) && !loading"
      class="p-4 text-center text-text-tertiary"
    >
      Нет данных о погоде
    </div>
    <div
      v-else
      class="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-[repeat(auto-fit,126px)] gap-2 sm:gap-3 md:gap-5 md:justify-start"
    >
      <div
        v-for="(day, i) in daysData"
        :key="day.date || i"
        class="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 md:p-0 bg-surface md:bg-transparent rounded-lg md:rounded-none"
      >
        <SkeletonLoader
          :loading="loading"
          class="capitalize text-center text-sm md:text-p4 truncate md:truncate-none w-full"
          :placeholder-text="day.weekdayText"
          content-tag="div"
        >
          <span class="md:hidden">{{ day.weekdayShortText }}</span>
          <span class="hidden md:block">{{ day.weekdayText }}</span>
        </SkeletonLoader>
        <div class="w-8 h-8 md:w-10 md:h-10">
          <SkeletonLoader
            :loading="loading"
            variant="circle"
            width="100%"
            height="100%"
            content-tag="div"
            class="w-full h-full flex items-center justify-center"
          >
            <WeatherIcon
              :code="day.weathercode"
              class="w-full h-full"
            />
          </SkeletonLoader>
        </div>
        <SkeletonLoader
          :loading="loading"
          class="text-lg md:text-xl md:font-medium"
          :placeholder-text="day.temperatureText"
        >
          {{ day.temperatureText }}
        </SkeletonLoader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { DayForecast } from '@/types'
  import WeatherIcon from './ui/WeatherIcon.vue'
  import SkeletonLoader from './ui/SkeletonLoader.vue'

  const props = defineProps<{
    weeklyData?: DayForecast[]
    loading?: boolean
  }>()

  const daysData = computed(() => {
    // Show skeleton placeholders when loading and no data
    if (props.loading && (!props.weeklyData || props.weeklyData.length === 0)) {
      const mockDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      return mockDays.map((day, i) => ({
        date: `mock-${i}`,
        weekdayText: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][i],
        weekdayShortText: day,
        temperatureText: '25°',
        weathercode: 0,
      }))
    }

    // Transform actual weekly data
    return (props.weeklyData || []).map(day => ({
      ...day,
      weekdayText: day.weekday,
      weekdayShortText: day.weekdayShort,
      temperatureText: `${Math.round(day.temperature)}°`,
    }))
  })
</script>

