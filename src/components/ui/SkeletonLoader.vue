<template>
  <Transition
    name="cities"
    mode="out-in"
  >
    <template v-if="loading">
      <div
        v-if="placeholderText"
        :key="placeholderText"
        class="skeleton-loader relative overflow-hidden bg-white/10 rounded-md select-none"
        :style="customStyles"
      >
        <span
          class="invisible text-transparent"
          style="
            font-family: inherit;
            font-size: inherit;
            font-weight: inherit;
            line-height: inherit;
            letter-spacing: inherit;
          "
        >
          {{ placeholderText }}
        </span>
        <div class="skeleton-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <div
        v-else
        :key="variant"
        class="skeleton-loader relative overflow-hidden bg-white/10"
        :class="{
          'rounded-full': variant === 'circle',
          rounded: variant === 'text' || variant === 'rect',
        }"
        :style="customStyles"
      >
        <div class="skeleton-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </template>
    <component
      :is="contentTag"
      v-else
      :class="$attrs.class"
    >
      <slot />
    </component>
  </Transition>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    loading?: boolean
    width?: string
    height?: string
    variant?: 'text' | 'circle' | 'rect'
    // Placeholder text for size simulation - if provided, uses text-based skeleton
    placeholderText?: string
    // Content tag - defaults to span for inline content
    contentTag?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '20px',
    variant: 'rect',
    placeholderText: '',
    loading: false,
    contentTag: 'span',
  })

  const customStyles = computed(() => {
    const styles: Record<string, string> = {
      textOverflow: 'clip',
    }

    // Only apply manual sizing if not using text-based skeleton
    if (!props.placeholderText) {
      if (props.width) styles.width = props.width
      if (props.height) styles.height = props.height
      else if (props.variant === 'text') styles.height = '16px'
    }

    return styles
  })
</script>

<style scoped>
  .skeleton-shimmer {
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
