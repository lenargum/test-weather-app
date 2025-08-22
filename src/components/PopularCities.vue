<template>
  <Transition name="cities" mode="out-in">
    <div v-if="loading" key="loading" class="cities-grid">
      <div v-for="i in 5" :key="i" class="city-card">
        <div class="city-info">
          <SkeletonLoader variant="text" width="100px" height="32px" style="border-radius: 10px;" />
          <SkeletonLoader variant="text" width="80px" height="22px" />
        </div>
        <div class="city-icon">
          <SkeletonLoader variant="circle" width="50px" height="50px" />
        </div>
        <SkeletonLoader variant="text" width="72px" height="62px" style="border-radius: 12px;" />
        <SkeletonLoader variant="text" width="140px" height="22px" />
      </div>
    </div>
    <div v-else-if="cities.length > 0" key="content" class="cities-grid">
      <div v-for="cityData in cities" :key="cityData.city" class="city-card" @click="$emit('selectCity', cityData.city)">
        <div class="city-info">
          <div class="p2_med">{{ cityData.city }}</div>
          <span>{{ getWeatherDescription(cityData.weathercode) }}</span>
        </div>
        <div class="city-icon">
          <WeatherIcon :code="cityData.weathercode" />
        </div>
        <div class="h3">{{ Math.round(cityData.temperature) }}°</div>
        <span>Влажность: {{ cityData.humidity }}%</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { getWeatherDescription } from '@/utils/weatherCodes'
import WeatherIcon from './ui/WeatherIcon.vue'
import SkeletonLoader from './ui/SkeletonLoader.vue'

interface CityWeatherData {
  city: string
  temperature: number
  weathercode: number
  humidity: number
}

defineProps<{
  loading: boolean
  cities: CityWeatherData[]
}>()

defineEmits<{
  selectCity: [cityName: string]
}>()
</script>

<style scoped>
.cities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 32px;
}

@media (max-width: 768px) {
  .cities-grid {
    gap: 16px;
  }
}

.city-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 26px;
  gap: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Gradient border using pseudo-element */
  background: var(--gradient-surface-background);

  text-align: center;
}

.city-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  padding: 1px;
  /* This creates the border width */
  background: linear-gradient(144.45deg, rgba(255, 255, 255, 0.4) -14.51%, rgba(255, 255, 255, 0) 117.67%);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  z-index: -1;

  pointer-events: none;
}

.city-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.city-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.city-icon {
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.city-humidity {
  font-size: 11px;
  color: white;
}

.cities-enter-active,
.cities-leave-active {
  transition: opacity 0.2s ease;
}

.cities-enter-from,
.cities-leave-to {
  opacity: 0;
}
</style>