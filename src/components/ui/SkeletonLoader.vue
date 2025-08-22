<template>
  <div :class="['skeleton', variant]" :style="{ width, height }">
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
  height?: string
  variant?: 'text' | 'circle' | 'rect'
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '20px',
  variant: 'rect'
})
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.skeleton.circle {
  border-radius: 50%;
}

.skeleton.text {
  border-radius: 4px;
  height: 16px;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>