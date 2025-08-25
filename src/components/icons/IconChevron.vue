<template>
  <svg
    class="transition-transform duration-300"
    :class="{
      'rotate-180': direction === 'up',
      'rotate-90': direction === 'left',
      '-rotate-90': direction === 'right',
    }"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.3353 8.64508C19.5632 8.41981 19.6875 8.14557 19.6875 7.83215C19.6875 7.17593 19.1489 6.66663 18.4653 6.66663C18.1235 6.66663 17.8127 6.79395 17.5745 7.01922L10.4896 13.8752L3.42552 7.01922C3.18729 6.79395 2.86619 6.66662 2.53474 6.66662C1.85111 6.66662 1.3125 7.17593 1.3125 7.83215C1.3125 8.14557 1.4368 8.41981 1.66467 8.63528L9.53671 16.2553C9.80602 16.5295 10.1375 16.6666 10.5 16.6666C10.8625 16.6666 11.1733 16.5295 11.4529 16.2651L19.3353 8.64508Z"
      fill="#E9E9F3"
    />
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps<{
    direction: 'up' | 'down' | 'left' | 'right'
  }>()
</script>
