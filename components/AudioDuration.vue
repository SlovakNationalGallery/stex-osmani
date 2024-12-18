<template>
  <div>
    <div class="h-2 w-full overflow-hidden rounded-full bg-white/20" />
    <!-- Progress Bar Overlay -->
    <div
      class="pointer-events-none absolute left-0 top-0 h-2 rounded-full bg-white"
      :style="{
        width: `calc(${((props.currentTime - (min - 2)) / (max + 2 - min)) * 100}%)`,
      }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  currentTime: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
});
</script>
