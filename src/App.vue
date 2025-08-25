<template>
  <main class="max-w-[1440px] mx-auto p-4 md:p-6 xl:p-10 flex flex-col gap-6 md:gap-14">
    <div
      class="flex flex-col-reverse md:flex-row justify-start md:justify-between items-start md:items-center gap-4 md:gap-0"
    >
      <UITabs
        v-model="activeTab"
        :tabs="[
          { value: 'current', label: 'Главная' },
          { value: 'weekly', label: 'Погода за неделю' },
        ]"
      />
      <UISelect
        v-model="city"
        :values="[...CITIES].sort((a, b) => a.localeCompare(b))"
      />
    </div>

    <section class="transition-all duration-300 ease-in-out flex flex-col gap-6 md:gap-12">
      <div class="flex flex-col gap-2 md:gap-3">
        <h4>Погода в городе {{ city }}</h4>
        <p class="text-2xl font-medium text-primary-darker">
          {{ new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }).toLowerCase() }}
        </p>
      </div>

      <div
        v-if="error"
        class="py-3 opacity-85 text-lg font-medium"
      >
        {{ error }}
      </div>

      <template v-else>
        <Transition
          name="tab-content"
          mode="out-in"
        >
          <div
            v-if="activeTab === 'current'"
            key="current"
            class="flex flex-col xl:flex-row gap-8 xl:gap-[88px]"
          >
            <CurrentWeather
              :loading="loading"
              :temperature="data?.current?.temperature"
              :weather-code="data?.current?.weathercode"
              :description="data ? getWeatherDescription(data.current.weathercode) : ''"
              :humidity="data?.currentHumidity || 0"
              :wind-speed="data?.current?.windspeed"
            />
            <HourlyForecast
              :loading="loading"
              :hourly-data="data?.hourly"
            />
          </div>
          <div
            v-else-if="activeTab === 'weekly'"
            key="weekly"
          >
            <WeeklyForecast
              :weekly-data="data?.weekly"
              :loading="loading"
            />
          </div>
        </Transition>
      </template>
    </section>

    <section
      v-if="!error"
      class="flex flex-col gap-8"
    >
      <h4>Погода в популярных городах</h4>
      <PopularCities
        :loading="citiesLoading"
        :cities="citiesWeather.filter((c: CitySummary) => c.city !== city)"
        @select-city="selectCity"
      />
    </section>

    <footer class="opacity-60 text-xs">Данные: Open-Meteo</footer>
  </main>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useWeather } from './composables/useWeather'
  import { CITIES } from './constants'
  import { getWeatherDescription, getWeatherIconPath } from './utils/weatherCodes'
  import CurrentWeather from './components/CurrentWeather.vue'
  import HourlyForecast from './components/HourlyForecast.vue'
  import PopularCities from './components/PopularCities.vue'
  import UISelect from './components/ui/UISelect.vue'
  import UITabs from './components/ui/UITabs.vue'
  import WeeklyForecast from './components/WeeklyForecast.vue'
  import type { CitySummary } from './types'

  // Load saved city from localStorage or default to first city
  const getSavedCity = (): string => {
    const saved = localStorage.getItem('weather-app-selected-city')
    return saved && CITIES.includes(saved as any) ? saved : CITIES[0]
  }

  const city = ref<string>(getSavedCity())

  // Load saved tab from localStorage or default to 'current'
  const getSavedTab = (): 'current' | 'weekly' => {
    const saved = localStorage.getItem('weather-app-active-tab')
    return saved === 'current' || saved === 'weekly' ? saved : 'current'
  }

  const activeTab = ref<'current' | 'weekly'>(getSavedTab())
  const { data, loading, error, search, citiesWeather, citiesLoading, fetchAllCities } = useWeather()

  async function handleCityChange() {
    await search(city.value)
  }

  function selectCity(cityName: string) {
    city.value = cityName
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Save city to localStorage and fetch new data when it changes
  watch(city, newCity => {
    localStorage.setItem('weather-app-selected-city', newCity)
    handleCityChange()
  })

  // Save active tab to localStorage when it changes
  watch(activeTab, newTab => {
    localStorage.setItem('weather-app-active-tab', newTab)
  })

  // Update page title and favicon based on current city and weather
  watch(
    [city, data],
    ([newCity, newData]) => {
      document.title = `Погода | ${newCity}`

      if (newData?.current?.weathercode !== undefined) {
        updateFavicon(newData.current.weathercode)
      }
    },
    { immediate: true }
  )

  function updateFavicon(weatherCode: number) {
    const svgPath = getWeatherIconPath(weatherCode)

    // Remove existing favicon
    const existingLink = document.querySelector('link[rel="icon"]')
    if (existingLink) {
      existingLink.remove()
    }

    // Add new SVG favicon
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = svgPath
    document.head.appendChild(link)
  }

  onMounted(async () => {
    await search(city.value)
    fetchAllCities()
  })
</script>

<style scoped>
  /* Vue transition animations */
  .tab-content-enter-active,
  .tab-content-leave-active {
    transition:
      opacity 0.2s ease,
      max-height 0.2s ease;
    overflow: hidden;
  }

  .tab-content-enter-from,
  .tab-content-leave-to {
    opacity: 0;
    max-height: 120px;
  }

  .tab-content-enter-to,
  .tab-content-leave-from {
    max-height: 1000px;
  }
</style>
