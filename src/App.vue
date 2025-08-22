<template>
  <main class="wrap">
    <div class="header-row">
      <Tabs
        v-model="activeTab"
        :tabs="[
          { value: 'current', label: 'Главная' },
          { value: 'weekly', label: 'Погода за неделю' }
        ]"
      />
      <Select 
        v-model="city" 
        :values="CITIES"
      />
    </div>

    <div class="weather-header">
      <h4>Погода в городе {{ city }}</h4>
      <p class="date p1_med">{{ formatDate(new Date()) }}</p>
    </div>

    <section v-if="error" class="state err">Ошибка: {{ error }}</section>

    <section v-else class="content">
      <Transition name="tab-content" mode="out-in">
        <div v-if="activeTab === 'current'" key="current" class="weather-dashboard">
          <CurrentWeather 
            :loading="loading"
            :temperature="data?.current?.temperature" 
            :weather-code="data?.current?.weathercode"
            :description="data ? getWeatherDescription(data.current.weathercode) : ''"
            :humidity="data?.currentHumidity || 0"
            :wind-speed="data?.current?.windspeed" 
          />
          <HourlyForecast :loading="loading" :hourly-data="data?.hourly" />
        </div>
        <div v-else-if="activeTab === 'weekly'" key="weekly">
          <WeeklyForecast 
            :weekly-data="data?.weekly" 
            :loading="loading"
          />
        </div>
      </Transition>
    </section>

    <section class="popular-cities">
      <h4>Погода в популярных городах</h4>
      <PopularCities :loading="citiesLoading" :cities="citiesWeather.filter(c => c.city !== city)"
        @select-city="selectCity" />
    </section>

    <footer class="foot">Данные: Open-Meteo</footer>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useWeather } from './composables/useWeather'
import { CITIES } from './constants'
import { getWeatherDescription } from './utils/weatherCodes'
import CurrentWeather from './components/CurrentWeather.vue'
import HourlyForecast from './components/HourlyForecast.vue'
import PopularCities from './components/PopularCities.vue'
import Select from './components/ui/Select.vue'
import WeeklyForecast from './components/WeeklyForecast.vue'
import Tabs from './components/ui/Tabs.vue'

// Load saved city from localStorage or default to first city
const getSavedCity = (): string => {
  const saved = localStorage.getItem('weather-app-selected-city')
  return (saved && CITIES.includes(saved as any)) ? saved : CITIES[0]
}

const city = ref<string>(getSavedCity())

// Load saved tab from localStorage or default to 'current'
const getSavedTab = (): 'current' | 'weekly' => {
  const saved = localStorage.getItem('weather-app-active-tab')
  return (saved === 'current' || saved === 'weekly') ? saved : 'current'
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
watch(city, (newCity) => {
  localStorage.setItem('weather-app-selected-city', newCity)
  handleCityChange()
})

// Save active tab to localStorage when it changes
watch(activeTab, (newTab) => {
  localStorage.setItem('weather-app-active-tab', newTab)
})

// Update page title based on current city and weather
watch([city], ([newCity]) => {
  document.title = `Погода | ${newCity}`
}, { immediate: true })


function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).toLowerCase()
}


onMounted(async () => {
  await search(city.value)
  fetchAllCities()
})
</script>

<style scoped>
.wrap {
  --page-padding: 40px;

  max-width: 1440px;
  margin: 0 auto;
  padding: var(--page-padding);
}

@media (max-width: 1440px) {
  .wrap {
    --page-padding: 24px;
  }
}

@media (max-width: 768px) {
  .wrap {
    --page-padding: 16px;
  }
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .header-row {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 24px;
  }
}


.weather-header {
  margin-top: 56px;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .weather-header {
    margin-top: 32px;
    margin-bottom: 32px;
  }
}

.content {
  transition: all 0.3s ease;
}

.tab-content-enter-active,
.tab-content-leave-active {
  transition: opacity 0.2s ease, max-height 0.2s ease;
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

.state {
  padding: 12px;
  opacity: .85;
  color: white;
}

.err {
  color: #ff6b6b;
}

.date {
  margin-top: 12px;
  color: var(--color-primary-darker);
}

/* Weather Dashboard Grid Layout */
.weather-dashboard {
  display: flex;
  gap: 88px;
}

@media (max-width: 1440px) {
  .weather-dashboard {
    flex-direction: column;
    gap: 32px;
  }
}

.popular-cities {
  display: flex;
  flex-direction: column;
  gap: 32px;
}


.foot {
  margin-top: 20px;
  opacity: .6;
  font-size: 12px;
}

@media (max-width: 768px) {
  .current-day {
    grid-template-columns: 1fr;
  }

  .day-summary {
    border-right: none;
    border-bottom: 1px solid #8884;
    padding-right: 0;
    padding-bottom: 16px;
  }
}
</style>
